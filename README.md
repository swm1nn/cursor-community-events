# Cursor Community Events Map

An interactive landing page showcasing Cursor Community events around the world with an interactive map, search functionality, and country highlighting.

## Features

- 🗺️ **Interactive Map**: Explore events on a world map with clustering for better visualization
- 🔍 **Search Functionality**: Search events by city, country, event name, or organizer
- 📊 **Event Filtering**: Filter by all events, upcoming events, or past events
- 🌍 **Country Highlighting**: Countries with events are highlighted in color:
  - **Green**: Countries with upcoming events
  - **Gray**: Countries with only past events
  - **Light Gray**: Countries with no events
- 📈 **Statistics Dashboard**: View total events, upcoming events, past events, and countries count
- 📱 **Responsive Design**: Works beautifully on desktop, tablet, and mobile devices

## Getting Started

1. Open `index.html` in a web browser
2. The map will automatically load with all events displayed
3. Use the search bar to find specific events
4. Use the filter buttons to show only upcoming or past events
5. Click on markers or event cards to see details

## File Structure

- `index.html` - Main HTML structure
- `styles.css` - Styling and responsive design
- `app.js` - Map functionality, search, and filtering logic
- `events-data.js` - Event data (can be updated with real data from Luma API)

## Customization

### Adding New Events

Edit `events-data.js` and add new event objects following this structure:

```javascript
{
    id: 21,
    title: "Event Name",
    city: "City Name",
    country: "Country Name",
    lat: 40.7128,  // Latitude
    lng: -74.0060, // Longitude
    status: "upcoming", // or "past"
    date: "2024-04-25",
    organizers: ["Organizer Name"],
    attendees: 50 // optional
}
```

### Updating Event Data

To fetch real-time data from the Luma API, you would need to:
1. Make API calls to fetch events from `https://luma.com/cursorcommunity`
2. Parse the response and update the `eventsData` array
3. Ensure coordinates (lat/lng) are included for each event

## Technologies Used

- **Leaflet.js** - Interactive maps
- **Leaflet.markercluster** - Marker clustering for better performance
- **OpenStreetMap** - Map tiles
- **Vanilla JavaScript** - No framework dependencies

## Browser Support

Works in all modern browsers that support ES6+ JavaScript.

## License

This project is open source and available for use.

