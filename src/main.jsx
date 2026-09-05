import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// 1. Update the document title for browser tabs
document.title = "MS Retail";

// 2. Update the mobile browser top bar color to match the dark luxury theme
let themeMeta = document.querySelector('meta[name="theme-color"]');
if (!themeMeta) {
  themeMeta = document.createElement('meta');
  themeMeta.name = "theme-color";
  document.head.appendChild(themeMeta);
}
themeMeta.content = "#0a0f0d"; // Deep black/green matching the site footer

// 3. Update the favicon to the luxury royal 'M' favicon
let favicon = document.querySelector('link[rel="icon"]');
if (!favicon) {
  favicon = document.createElement('link');
  favicon.rel = "icon";
  document.head.appendChild(favicon);
}
favicon.href = "/favicon.svg";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
