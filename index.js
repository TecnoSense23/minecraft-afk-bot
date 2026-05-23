const express = require('express');
const mineflayer = require('mineflayer');
const app = express();

// UptimeRobot वेब सर्वर
app.get('/', (req, res) => {
  res.send('Tecno Bot is Alive and Running 24/7!');
});

app.listen(3000, () => {
  console.log('Web server running on port 3000');
});

// Minecraft बॉट का असली फंक्शन
function startBot() {
  const bot = mineflayer.createBot({
    host: 'Tecnosense.aternos.me',   // तुम्हारी मेन IP
    port: 62972,                     // तुम्हारा असली लाइव पोर्ट (जो स्क्रीनशॉट में दिखा)
    username: 'Jarvis_AFK_Bot',      // बिना स्पेस वाला साफ़ नाम
    version: false                   // इसे false ही रखना है ताकि ये नए पेपर वर्ज़न को खुद हैंडल कर सके
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

// बॉट स्टार्ट करें
startBot();
