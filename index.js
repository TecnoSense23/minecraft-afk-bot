const express = require('express');
const mineflayer = require('mineflayer');
const app = express();

app.get('/', (req, res) => {
  res.send('Jarvis is Alive!');
});

app.listen(3000, () => {
  console.log('Web server running on port 3000');
});

function startBot() {
  const bot = mineflayer.createBot({
    host: 'Tecnosense.aternos.me',   
    port: 25565,                     
    username: 'Jarvis_AFK',          
    version: '1.20.4'                
  });

  bot.on('spawn', () => {
    console.log('Jarvis has spawned successfully!');
  });

  bot.on('disconnect', (err) => {
    console.log('Bot disconnected. Reconnecting in 10 seconds...');
    setTimeout(startBot, 10000);
  });

  bot.on('error', (err) => {
    console.log('Bot Error:', err);
  });
}

startBot();
