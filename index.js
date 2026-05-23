const express = require('express');
const mineflayer = require('mineflayer');
const app = express();

// UptimeRobot के लिए वेब सर्वर
app.get('/', (req, res) => {
  res.send('Tecno Bot is Alive and Running 24/7!');
});

app.listen(3000, () => {
  console.log('Web server running on port 3000');
});

// Minecraft बॉट का असली फंक्शन
function startBot() {
  const bot = mineflayer.createBot({
    host: 'Tecnosense.aternos.me',   // तुम्हारी असली मेन IP (बिना किसी नंबर या कोलन के)
    port: 25565,                     // अटरनोस का परमानेंट डिफ़ॉल्ट पोर्ट
    username: 'Jarvis_AFK_Bot',      // एकदम फ्रेश और नया नाम बिना स्पेस के
    version: false                   // ऑटो-डिटेक्ट वर्ज़न (ViaVersion के लिए बेस्ट)
  });

  bot.on('spawn', () => {
    console.log('Bot has spawned successfully!');
  });

  bot.on('chat', (username, message) => {
    if (username === bot.username) return;
    bot.chat('Hello! I am an AFK Bot.');
  });

  // एंटी-एएफके ऑटो जंप चालू
  bot.on('physicTick', () => {
    if (bot.entity) {
      bot.setControlState('jump', true);
    }
  });

  bot.on('disconnect', () => {
    console.log('Bot disconnected. Reconnecting in 10 seconds...');
    setTimeout(startBot, 10000);
  });

  bot.on('error', (err) => {
    console.log('Bot Error:', err);
  });
}

// बॉट को स्टार्ट करें
startBot();
