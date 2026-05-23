const express = require('express');
const mineflayer = require('mineflayer');
const app = express();

app.get('/', (req, res) => {
  res.send('Tecno Bot is Alive and Running 24/7!');
});

app.listen(3000, () => {
  console.log('Web server running on port 3000');
});

function startBot() {
  const bot = mineflayer.createBot({
    host: 'Tecnosense.aternos.me', 
    port: 62972,                    // तुम्हारा असली पोर्ट
    username: 'Jarvis_AFK_Bot',    
    version: '1.20.4'               // <--- यहाँ हमने वर्ज़न एकदम फिक्स कर दिया है!
  });

  bot.on('spawn', () => {
    console.log('Bot has spawned successfully!');
  });

  bot.on('chat', (username, message) => {
    if (username === bot.username) return;
    bot.chat('Hello! I am an AFK Bot.');
  });

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
