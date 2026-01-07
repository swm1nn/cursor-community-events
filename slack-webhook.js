// Slack Webhook Handler
// Receives events from Slack and updates the events database
// Vercel Serverless Function format

const fs = require('fs');
const path = require('path');

// Simple in-memory store (in production, use a database)
// For Vercel, we'll use a JSON file in the data directory

function ensureDataDirectory() {
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  return dataDir;
}

function loadEvents() {
  const eventsPath = path.join(ensureDataDirectory(), 'events.json');
  if (fs.existsSync(eventsPath)) {
    try {
      const content = fs.readFileSync(eventsPath, 'utf8');
      return JSON.parse(content);
    } catch (e) {
      return [];
    }
  }
  return [];
}

function saveEvents(events) {
  const eventsPath = path.join(ensureDataDirectory(), 'events.json');
  fs.writeFileSync(eventsPath, JSON.stringify(events, null, 2));
}

// Parse event from Slack message
function parseEventFromSlack(message) {
  // Example Slack message format:
  // "New Event: Cursor Meetup in San Francisco on 2024-03-15"
  // Or structured format with fields
  
  const text = message.text || message.message?.text || '';
  
  // Try to extract event information
  // This is a basic parser - you can customize based on your Slack message format
  const event = {
    id: Date.now(), // Simple ID generation
    title: '',
    city: '',
    country: '',
    lat: 0,
    lng: 0,
    status: 'upcoming',
    date: new Date().toISOString().split('T')[0],
    organizers: [],
    attendees: 0
  };
  
  // Parse common patterns
  // Example: "New Event: Cursor Meetup in San Francisco, USA on 2024-03-15"
  const titleMatch = text.match(/(?:New Event|Event):\s*(.+?)(?:\s+in|\s+on|$)/i);
  if (titleMatch) {
    event.title = titleMatch[1].trim();
  }
  
  const locationMatch = text.match(/in\s+([^,]+),\s*([^,\n]+)/i);
  if (locationMatch) {
    event.city = locationMatch[1].trim();
    event.country = locationMatch[2].trim();
  }
  
  const dateMatch = text.match(/(\d{4}-\d{2}-\d{2})/);
  if (dateMatch) {
    event.date = dateMatch[1];
  }
  
  // If message has structured blocks (Slack Block Kit)
  if (message.blocks) {
    message.blocks.forEach(block => {
      if (block.type === 'section' && block.fields) {
        block.fields.forEach(field => {
          const value = field.text || field.value || '';
          if (field.title === 'Title' || field.title === 'Event') {
            event.title = value;
          } else if (field.title === 'City') {
            event.city = value;
          } else if (field.title === 'Country') {
            event.country = value;
          } else if (field.title === 'Date') {
            event.date = value;
          }
        });
      }
    });
  }
  
  // Geocode the location (you'll need to add geocoding service)
  // For now, we'll need manual coordinates or use a geocoding API
  
  return event;
}

// Geocode location using a free service
async function geocodeLocation(city, country) {
  try {
    // Using Nominatim (OpenStreetMap geocoding) - free but rate-limited
    const query = encodeURIComponent(`${city}, ${country}`);
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${query}&format=json&limit=1`,
      {
        headers: {
          'User-Agent': 'Cursor-Community-Events/1.0'
        }
      }
    );
    
    const data = await response.json();
    if (data && data.length > 0) {
      return {
        lat: parseFloat(data[0].lat),
        lng: parseFloat(data[0].lon)
      };
    }
  } catch (error) {
    console.error('Geocoding error:', error);
  }
  
  return { lat: 0, lng: 0 };
}

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method === 'POST') {
    try {
      // Parse body - Vercel may send it as string or object
      let body = req.body;
      if (typeof body === 'string') {
        try {
          body = JSON.parse(body);
        } catch (e) {
          // If parsing fails, try to get raw body
          body = req.body;
        }
      }
      
      // Handle Slack challenge (for URL verification) - THIS IS CRITICAL!
      if (body && body.type === 'url_verification') {
        console.log('Slack URL verification challenge received');
        return res.status(200).json({ challenge: body.challenge });
      }
      
      // Handle event callback
      if (body.type === 'event_callback') {
        const event = body.event;
        
        // Only process messages in the specified channel
        const targetChannel = process.env.SLACK_CHANNEL_ID || '';
        if (targetChannel && event.channel !== targetChannel) {
          return res.status(200).json({ received: true });
        }
        
        // Parse event from Slack message
        const newEvent = parseEventFromSlack(event);
        
        // Geocode location
        if (newEvent.city && newEvent.country) {
          const coords = await geocodeLocation(newEvent.city, newEvent.country);
          newEvent.lat = coords.lat;
          newEvent.lng = coords.lng;
        }
        
        // Load existing events
        const events = loadEvents();
        
        // Add new event
        events.push(newEvent);
        
        // Save events
        saveEvents(events);
        
        return res.status(200).json({ 
          success: true, 
          message: 'Event added successfully',
          event: newEvent
        });
      }
      
      // Handle slash command
      if (body && body.command === '/add-event') {
        // Parse command parameters
        const newEvent = {
          id: Date.now(),
          title: body.text || 'New Event',
          city: '',
          country: '',
          lat: 0,
          lng: 0,
          status: 'upcoming',
          date: new Date().toISOString().split('T')[0],
          organizers: [],
          attendees: 0
        };
        
        // Parse command text (format: /add-event "Title" "City" "Country" "2024-03-15")
        const parts = body.text?.split('"') || [];
        if (parts.length >= 2) newEvent.title = parts[1];
        if (parts.length >= 4) newEvent.city = parts[3];
        if (parts.length >= 6) newEvent.country = parts[5];
        if (parts.length >= 8) newEvent.date = parts[7];
        
        // Geocode
        if (newEvent.city && newEvent.country) {
          const coords = await geocodeLocation(newEvent.city, newEvent.country);
          newEvent.lat = coords.lat;
          newEvent.lng = coords.lng;
        }
        
        // Save
        const events = loadEvents();
        events.push(newEvent);
        saveEvents(events);
        
        return res.status(200).json({
          response_type: 'in_channel',
          text: `✅ Event "${newEvent.title}" added to the map!`
        });
      }
      
      // Default response for any other POST request
      return res.status(200).json({ received: true });
    } catch (error) {
      console.error('Slack webhook error:', error);
      console.error('Error details:', error.message, error.stack);
      // Still return 200 for Slack, but log the error
      return res.status(200).json({ error: 'Internal server error', message: error.message });
    }
  } else {
    // Handle GET requests (for testing)
    if (req.method === 'GET') {
      return res.status(200).json({ 
        message: 'Slack webhook endpoint is active',
        timestamp: new Date().toISOString()
      });
    }
    res.setHeader('Allow', ['GET', 'POST', 'OPTIONS']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

