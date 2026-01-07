# Deployment Instructions

## Quick Deploy to Vercel

### Option 1: Using Vercel CLI (Recommended)

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm install -g vercel
   ```

2. **Navigate to project directory**:
   ```bash
   cd "/Users/nurdikbazylbekov/cursor events"
   ```

3. **Deploy**:
   ```bash
   vercel
   ```
   - Follow the prompts to log in
   - Choose default settings
   - Your site will be deployed!

4. **Deploy to production**:
   ```bash
   vercel --prod
   ```

### Option 2: Deploy via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New Project"
3. Import your Git repository or drag & drop the project folder
4. Vercel will auto-detect and deploy

### Option 3: Deploy via GitHub

1. **Create a GitHub repository**:
   - Go to [github.com](https://github.com) and create a new repository
   - Name it: `cursor-community-events`

2. **Push your code** (if git is already initialized):
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/cursor-community-events.git
   git branch -M main
   git push -u origin main
   ```

3. **Connect to Vercel**:
   - Go to Vercel dashboard
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel will auto-deploy and update on every push!

## Project Structure

- `index.html` - Main HTML file
- `styles.css` - Styling
- `app.js` - Map and interactivity logic
- `events-data.js` - Event data
- `vercel.json` - Vercel configuration
- `package.json` - Project metadata

## Notes

- The site is a static site, no build process needed
- All dependencies are loaded from CDN (Leaflet.js)
- The map uses OpenStreetMap tiles
- Event data can be updated in `events-data.js`

