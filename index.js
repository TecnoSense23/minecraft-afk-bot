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

// ... ऊपर का UptimeRobot वाला कोड वैसा ही रहेगा ...

function startBot() {
  const bot = mineflayer.createBot({
    host: 'Tecnosense.aternos.me',   // तुम्हारी मेन IP
    port: 25565,                     // यहाँ वापस 25565 ही डालना है! (यही असली ताला खोलेगा)
    username: 'Jarvis_AFK',          // साफ नाम
    version: '1.20.4'                // तुम्हारा 1.20.4 वर्ज़न
  });

  bot.on('spawn', () => {
    console.log('Jarvis has spawned successfully!');
  });

  // ... नीचे का बाकी कोड वैसा ही रहने दो ...

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
