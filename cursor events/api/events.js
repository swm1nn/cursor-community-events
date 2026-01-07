// API endpoint to serve events
// This allows dynamic updates from Slack
// Vercel Serverless Function format

const fs = require('fs');
const path = require('path');

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    try {
      // Try to read from dynamic events file first
      const eventsPath = path.join(process.cwd(), 'data', 'events.json');
      let eventsData = [];
      
      // Load dynamic events from Slack
      let dynamicEvents = [];
      if (fs.existsSync(eventsPath)) {
        const fileContent = fs.readFileSync(eventsPath, 'utf8');
        dynamicEvents = JSON.parse(fileContent);
      }
      
      // Also load static events and merge
      const staticDataPath = path.join(process.cwd(), 'events-data.js');
      let staticEvents = [];
      if (fs.existsSync(staticDataPath)) {
        const staticContent = fs.readFileSync(staticDataPath, 'utf8');
        // Extract eventsData array using regex
        const match = staticContent.match(/const eventsData = (\[[\s\S]*?\]);/);
        if (match) {
          try {
            staticEvents = eval(match[1]);
          } catch (e) {
            console.error('Error parsing static events:', e);
          }
        }
      }
      
      // Merge: dynamic events override static ones with same ID, then add new ones
      const mergedEvents = [...staticEvents];
      dynamicEvents.forEach(dynamicEvent => {
        const existingIndex = mergedEvents.findIndex(e => e.id === dynamicEvent.id);
        if (existingIndex >= 0) {
          mergedEvents[existingIndex] = dynamicEvent; // Update existing
        } else {
          mergedEvents.push(dynamicEvent); // Add new
        }
      });
      
      eventsData = mergedEvents;
      
      res.status(200).json(eventsData);
    } catch (error) {
      console.error('Error loading events:', error);
      res.status(500).json({ error: 'Failed to load events' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

