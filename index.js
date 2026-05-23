const express = require('express');
const mineflayer = require('mineflayer');
const app = express();

// UptimeRobot के लिए वेब सर्वर (404 एरर को रोकने के लिए)
app.get('/', (req, res) => {
  res.send('Tecno Bot is Alive and Running 24/7!');
});

app.listen(3000, () => {
  console.log('Web server running on port 3000');
});

// Minecraft बॉट का असली फंक्शन
function startBot() {
  const bot = mineflayer.createBot({
    host: 'flatfish.aternos.host',   // सिर्फ .host तक, यहाँ कोई कोलन या नंबर नहीं है
    port: 62972,                     // तुम्हारा डायनामिक पोर्ट यहाँ अलग से है
    username: 'Jarvis_AFK',          // बिना स्पेस वाला एकदम साफ़ नाम
    version: false                   // ऑटो-डिटेक्ट वर्ज़न
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

// बॉट को पहली बार स्टार्ट करें
startBot();
