import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// 1. Update the document title for browser tabs
document.title = "The Sringar House";

// 2. Update the mobile browser top bar color to match the dark luxury theme
let themeMeta = document.querySelector('meta[name="theme-color"]');
if (!themeMeta) {
  themeMeta = document.createElement('meta');
  themeMeta.name = "theme-color";
  document.head.appendChild(themeMeta);
}
themeMeta.content = "#0a0f0d"; // Deep black/green matching the site footer

// 3. Update the favicon to a sleek gold 'S' on a dark background
let favicon = document.querySelector('link[rel="icon"]');
if (!favicon) {
  favicon = document.createElement('link');
  favicon.rel = "icon";
  document.head.appendChild(favicon);
}
favicon.href = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' rx='20' fill='%230a0f0d'/%3E%3Ctext x='50' y='72' font-family='Georgia, serif' font-size='70' font-weight='bold' fill='%23D4AF37' text-anchor='middle'%3ES%3C/text%3E%3C/svg%3E";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
