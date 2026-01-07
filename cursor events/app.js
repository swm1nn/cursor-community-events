// Global variables
let map;
let markers;
let allMarkers = [];
let filteredEvents = [];
let countryEventMap = {};
let eventsData = []; // Will be loaded dynamically

// Load events from API or fallback to static
async function loadEvents() {
    try {
        // Try to load from API first (includes Slack updates)
        const response = await fetch('/api/events');
        if (response.ok) {
            const apiEvents = await response.json();
            if (apiEvents && apiEvents.length > 0) {
                eventsData = apiEvents;
            } else {
                // Fallback to static data
                eventsData = window.eventsData || [];
            }
        } else {
            // Fallback to static data
            eventsData = window.eventsData || [];
        }
    } catch (error) {
        console.warn('Could not load from API, using static data:', error);
        // Fallback to static data
        eventsData = window.eventsData || [];
    }
    
    // Initialize with loaded events
    initializeCountryMap();
    updateStats();
    addMarkersToMap(eventsData);
    renderEventsList(eventsData);
    renderCountriesList();
    highlightCountries();
    
    // Auto-refresh every 5 minutes to get new events from Slack
    setInterval(async () => {
        try {
            const response = await fetch('/api/events');
            if (response.ok) {
                const apiEvents = await response.json();
                if (apiEvents && apiEvents.length !== eventsData.length) {
                    eventsData = apiEvents;
                    initializeCountryMap();
                    updateStats();
                    addMarkersToMap(eventsData);
                    renderEventsList(eventsData);
                    renderCountriesList();
                    highlightCountries();
                }
            }
        } catch (error) {
            console.warn('Auto-refresh failed:', error);
        }
    }, 5 * 60 * 1000); // 5 minutes
}

// Initialize country event map
function initializeCountryMap() {
    eventsData.forEach(event => {
        const country = event.country;
        if (!countryEventMap[country]) {
            countryEventMap[country] = {
                upcoming: 0,
                past: 0,
                total: 0
            };
        }
        countryEventMap[country][event.status]++;
        countryEventMap[country].total++;
    });
}

// Create custom markers
function createMarker(event) {
    const isUpcoming = event.status === 'upcoming';
    const iconColor = isUpcoming ? '#4caf50' : '#9e9e9e';
    
    const customIcon = L.divIcon({
        className: 'custom-marker',
        html: `<div style="
            background-color: ${iconColor};
            width: 20px;
            height: 20px;
            border-radius: 50%;
            border: 3px solid white;
            box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        "></div>`,
        iconSize: [20, 20],
        iconAnchor: [10, 10]
    });

    const marker = L.marker([event.lat, event.lng], { icon: customIcon });
    
    const popupContent = `
        <div class="popup-content">
            <div class="popup-title">${event.title}</div>
            <div class="popup-location">${event.city}, ${event.country}</div>
            <div class="popup-date">${formatDate(event.date)} - ${event.status === 'upcoming' ? 'Upcoming' : 'Past'}</div>
            ${event.attendees ? `<div style="margin-top: 5px; color: #666;">${event.attendees} attendees</div>` : ''}
        </div>
    `;
    
    marker.bindPopup(popupContent);
    marker.eventData = event;
    
    marker.on('click', function() {
        highlightEventInList(event.id);
    });
    
    return marker;
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
}

// Add markers to map
function addMarkersToMap(events) {
    markers.clearLayers();
    allMarkers = [];
    
    events.forEach(event => {
        const marker = createMarker(event);
        markers.addLayer(marker);
        allMarkers.push(marker);
    });
    
    map.addLayer(markers);
    
    if (events.length > 0) {
        const group = new L.featureGroup(allMarkers);
        map.fitBounds(group.getBounds().pad(0.1));
    }
}

// Render events list
function renderEventsList(events) {
    const container = document.getElementById('eventsContainer');
    container.innerHTML = '';
    
    if (events.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #999; padding: 20px;">No events found matching your criteria.</p>';
        return;
    }
    
    events.forEach(event => {
        const card = document.createElement('div');
        card.className = `event-card ${event.status}`;
        card.dataset.eventId = event.id;
        
        const statusClass = event.waitlist ? 'waitlist' : 
                           event.nearCapacity ? 'near-capacity' : 
                           event.status;
        
        card.innerHTML = `
            <div class="event-title">${event.title}</div>
            <div class="event-location">📍 ${event.city}, ${event.country}</div>
            <div class="event-date">📅 ${formatDate(event.date)}</div>
            ${event.attendees ? `<div style="margin-top: 8px; color: #666;">👥 ${event.attendees} attendees</div>` : ''}
            <div class="event-status ${statusClass}">
                ${event.waitlist ? 'Waitlist' : 
                  event.nearCapacity ? 'Near Capacity' : 
                  event.status === 'upcoming' ? 'Upcoming' : 'Past'}
            </div>
        `;
        
        card.addEventListener('click', () => {
            const marker = allMarkers.find(m => m.eventData.id === event.id);
            if (marker) {
                map.setView([event.lat, event.lng], 10);
                marker.openPopup();
            }
        });
        
        container.appendChild(card);
    });
}

// Update statistics
function updateStats() {
    const total = eventsData.length;
    const upcoming = eventsData.filter(e => e.status === 'upcoming').length;
    const past = eventsData.filter(e => e.status === 'past').length;
    const countries = new Set(eventsData.map(e => e.country)).size;
    
    document.getElementById('totalEvents').textContent = total;
    document.getElementById('upcomingEvents').textContent = upcoming;
    document.getElementById('pastEvents').textContent = past;
    document.getElementById('countriesCount').textContent = countries;
}

// Filter events
function filterEvents() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const filterValue = document.querySelector('input[name="eventFilter"]:checked').value;
    
    filteredEvents = eventsData.filter(event => {
        // Status filter
        if (filterValue !== 'all' && event.status !== filterValue) {
            return false;
        }
        
        // Search filter
        if (searchTerm) {
            const searchableText = `
                ${event.title} 
                ${event.city} 
                ${event.country} 
                ${event.state || ''} 
                ${event.organizers.join(' ')}
            `.toLowerCase();
            
            if (!searchableText.includes(searchTerm)) {
                return false;
            }
        }
        
        return true;
    });
    
    addMarkersToMap(filteredEvents);
    renderEventsList(filteredEvents);
}

// Highlight event in list
function highlightEventInList(eventId) {
    document.querySelectorAll('.event-card').forEach(card => {
        card.style.backgroundColor = '';
    });
    
    const card = document.querySelector(`.event-card[data-event-id="${eventId}"]`);
    if (card) {
        card.style.backgroundColor = '#f0f4ff';
        card.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        setTimeout(() => {
            card.style.backgroundColor = '';
        }, 2000);
    }
}

// Country highlighting layer
let countryLayer = null;

// Country name mapping (to match GeoJSON country names)
const countryNameMap = {
    'United States': 'United States of America',
    'United Kingdom': 'United Kingdom',
    'Taiwan': 'Taiwan',
    'Serbia': 'Serbia',
    'Saudi Arabia': 'Saudi Arabia',
    'Philippines': 'Philippines',
    'Kyrgyzstan': 'Kyrgyzstan',
    'Kenya': 'Kenya',
    'Japan': 'Japan',
    'India': 'India',
    'Germany': 'Germany',
    'Brazil': 'Brazil',
    'Armenia': 'Armenia',
    'Argentina': 'Argentina',
    'Uzbekistan': 'Uzbekistan',
    'Vietnam': 'Vietnam',
    'Thailand': 'Thailand',
    'Spain': 'Spain',
    'Sweden': 'Sweden'
};

// Reverse mapping for flexible matching
function findCountryInMap(countryName) {
    // Direct match
    if (countryEventMap[countryName]) {
        return countryName;
    }
    
    // Check mapped name
    const mappedName = countryNameMap[countryName];
    if (mappedName && countryEventMap[mappedName]) {
        return mappedName;
    }
    
    // Fuzzy match
    for (const key in countryEventMap) {
        if (key.toLowerCase() === countryName.toLowerCase() ||
            countryName.toLowerCase().includes(key.toLowerCase()) ||
            key.toLowerCase().includes(countryName.toLowerCase())) {
            return key;
        }
    }
    
    return null;
}

// Render countries list
function renderCountriesList() {
    const container = document.getElementById('countriesContainer');
    container.innerHTML = '';
    
    const countries = Object.keys(countryEventMap).sort();
    
    countries.forEach(country => {
        const countryData = countryEventMap[country];
        const hasUpcoming = countryData.upcoming > 0;
        const hasPast = countryData.past > 0;
        
        const item = document.createElement('div');
        item.className = `country-item ${hasUpcoming ? 'has-upcoming' : hasPast ? 'has-past-only' : ''}`;
        
        item.innerHTML = `
            <div class="country-name">${country}</div>
            <div class="country-stats">
                <div class="country-stat">
                    <span>Total: ${countryData.total}</span>
                </div>
                ${hasUpcoming ? `<div class="country-stat" style="color: #4caf50;">Upcoming: ${countryData.upcoming}</div>` : ''}
                ${hasPast ? `<div class="country-stat" style="color: #9e9e9e;">Past: ${countryData.past}</div>` : ''}
            </div>
        `;
        
        item.addEventListener('click', () => {
            // Find events in this country and zoom to them
            const countryEvents = eventsData.filter(e => e.country === country);
            if (countryEvents.length > 0) {
                const markers = countryEvents.map(e => 
                    allMarkers.find(m => m.eventData.id === e.id)
                ).filter(m => m);
                
                if (markers.length > 0) {
                    const group = new L.featureGroup(markers);
                    map.fitBounds(group.getBounds().pad(0.2));
                }
            }
        });
        
        container.appendChild(item);
    });
}

// Add country highlighting using GeoJSON
async function highlightCountries() {
    try {
        // Load world countries GeoJSON from a CDN
        const response = await fetch('https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson');
        const worldData = await response.json();
        
        // Create a style function for countries
        function getCountryStyle(feature) {
            const countryName = feature.properties.name;
            const matchedCountry = findCountryInMap(countryName);
            
            if (matchedCountry) {
                const countryData = countryEventMap[matchedCountry];
                const hasUpcoming = countryData.upcoming > 0;
                const hasPast = countryData.past > 0;
                
                return {
                    fillColor: hasUpcoming ? '#4caf50' : '#9e9e9e',
                    weight: 2,
                    opacity: 0.8,
                    color: hasUpcoming ? '#2e7d32' : '#616161',
                    fillOpacity: hasUpcoming ? 0.4 : 0.2,
                    dashArray: hasPast && !hasUpcoming ? '5, 5' : null
                };
            } else {
                return {
                    fillColor: '#e0e0e0',
                    weight: 1,
                    opacity: 0.5,
                    color: '#bdbdbd',
                    fillOpacity: 0.1
                };
            }
        }
        
        // Add GeoJSON layer
        if (countryLayer) {
            map.removeLayer(countryLayer);
        }
        
        countryLayer = L.geoJSON(worldData, {
            style: getCountryStyle,
            onEachFeature: function(feature, layer) {
                const countryName = feature.properties.name;
                const matchedCountry = findCountryInMap(countryName);
                
                if (matchedCountry) {
                    const countryData = countryEventMap[matchedCountry];
                    const tooltip = `
                        <strong>${countryName}</strong><br>
                        Total Events: ${countryData.total}<br>
                        Upcoming: ${countryData.upcoming}<br>
                        Past: ${countryData.past}
                    `;
                    layer.bindTooltip(tooltip);
                }
            }
        }).addTo(map);
        
        // Move country layer behind markers
        countryLayer.bringToBack();
        
    } catch (error) {
        console.warn('Could not load country GeoJSON for highlighting:', error);
        // Fallback: show countries in console
        console.log('Countries with events:', Object.keys(countryEventMap).sort());
    }
}

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    // Initialize map
    map = L.map('map').setView([20, 0], 2);

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{s}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19
    }).addTo(map);

    // Marker cluster group
    markers = L.markerClusterGroup({
        chunkedLoading: true,
        maxClusterRadius: 50
    });

    // Load events from API (includes Slack updates) or fallback to static
    loadEvents();

    // Event listeners
    document.getElementById('searchInput').addEventListener('input', filterEvents);
    document.getElementById('clearSearch').addEventListener('click', () => {
        document.getElementById('searchInput').value = '';
        filterEvents();
    });

    document.querySelectorAll('input[name="eventFilter"]').forEach(radio => {
        radio.addEventListener('change', filterEvents);
    });

    // Events are loaded in loadEvents() function

    // Add keyboard shortcut for search
    document.getElementById('searchInput').addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.getElementById('searchInput').value = '';
            filterEvents();
        }
    });
});

