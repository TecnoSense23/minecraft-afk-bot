const express = require('express');
const mineflayer = require('mineflayer');
const app = express();

// Render को जिंदा रखने के लिए वेब सर्वर
app.get('/', (req, res) => {
  res.send('Jarvis Bot is Alive!');
});

app.listen(3000, () => {
  console.log('Web server running on port 3000');
});

// Minecraft बॉट का फंक्शन
function startBot() {
  const bot = mineflayer.createBot({
    host: 'lobster.aternos.host',   // तुम्हारी असली DynIP (बिना पोर्ट के)
    port: 62972,                     // तुम्हारा असली पोर्ट अलग से
    username: 'Jarvis_AFK_Bot',      // बिना स्पेस का साफ-सुथरा नाम
    version: '1.20.4'                // तुम्हारा पुराना वाला स्टेबल वर्ज़न
  });

  bot.on('spawn', () => {
    console.log('Jarvis has spawned successfully!');
  });

  bot.on('chat', (username, message) => {
    if (username === bot.username) return;
    bot.chat('Hello! I am an AFK Bot.');
  });

  // एंटी-एएफके ऑटो जंप
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
