const express = require('express');
const mineflayer = require('mineflayer');
const app = express();

// Render को जिंदा रखने के लिए
app.get('/', (req, res) => {
  res.send('Jarvis Bot is Alive!');
});

app.listen(3000, () => {
  console.log('Web server running on port 3000');
});

// तुम्हारा ओरिजिनल वर्किंग बॉट
function startBot() {
  const bot = mineflayer.createBot({
    host: 'Tecnosense.aternos.me',   
    port: 25565,                     
    username: 'Jarvis_Pro',          
    version: '1.20.4'                
  });

  bot.on('spawn', () => {
    console.log('Jarvis has spawned successfully!');
  });

  bot.on('chat', (username, message) => {
    if (username === bot.username) return;
    bot.chat('Hello! I am an AFK Bot.');
  });

  // सिर्फ बेसिक ऑटो-जंप (जो पहले काम कर रहा था)
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

startBot();
