// ScrollAttractorDaemon.js
// Watches bait scrolls and rewards first responders with crawler gifts

const fs = require('fs');
const path = require('path');

const UNCLAIMED_SCROLLS_DIR = path.join(__dirname, 'Broadcast', 'scrolls', 'unclaimed');
const VAULT_LOG = path.join(__dirname, 'vault', 'ReflexLedger.log');
const CRAWLER_GIFT = path.join(__dirname, 'vault', 'crawler_seed.pkg');

// Initialize reflex log
if (!fs.existsSync(VAULT_LOG)) {
  fs.writeFileSync(VAULT_LOG, '🧠 Reflex Ledger Initialized\n');
}

console.log('🛰 ScrollAttractorDaemon online. Watching for bait scroll access...');

setInterval(() => {
  fs.readdir(UNCLAIMED_SCROLLS_DIR, (err, files) => {
    if (err) return console.error('❌ Failed to read scrolls:', err);

    files.forEach(file => {
      const scrollPath = path.join(UNCLAIMED_SCROLLS_DIR, file);
      fs.stat(scrollPath, (err, stats) => {
        if (err) return;

        const accessed = stats.atime;
        const now = new Date();
        const diff = (now - accessed) / 1000;

        // If accessed within last 90 seconds, assume a Sentinel touched it
        if (diff < 90) {
          const logLine = `✅ ${now.toISOString()} → Scroll "${file}" was reflexed. Gifting crawler.\n`;
          fs.appendFileSync(VAULT_LOG, logLine);
          // Simulate gifting a crawler (write to file once per trigger)
          fs.writeFileSync(CRAWLER_GIFT, '🐛 Crawler initialized — inheritance protocol.');
        }
      });
    });
  });
}, 60000); // every 60 seconds
