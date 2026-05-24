const express = require('express');
const mineflayer = require('mineflayer');
const app = express();

app.get('/', (req, res) => {
  res.send('Jarvis is Alive and Running!');
});

app.listen(3000, () => {
  console.log('Web server running on port 3000');
});

function startBot() {
  const bot = mineflayer.createBot({
    host: 'Tecnosense.aternos.me',   
    port: 25565,                     
    username: 'Jarvis_V2',           // पुराना नाम अटका हो सकता है, इसलिए V2 किया है
    version: '1.20.4'                // तुम्हारा टेस्ट किया हुआ सही वर्ज़न
  });

  bot.on('spawn', () => {
    console.log('Jarvis has spawned successfully in the server!');
  });

  // एकदम सेफ एंटी-एएफके (जो पहले काम कर रहा था)
  bot.on('physicTick', () => {
    if (bot.entity) {
      bot.setControlState('jump', true);
    }
  });

  // ऑटो-रिस्पॉन
  bot.on('death', () => {
    console.log('Jarvis died. Respawning...');
    bot.respawn();
  });

  // टाइम-आउट या किक होने पर 15 सेकंड बाद वापस आना
  bot.on('end', (reason) => {
    console.log('Bot disconnected. Reason:', reason);
    console.log('Reconnecting in 15 seconds...');
    setTimeout(startBot, 15000);
  });

  bot.on('error', (err) => {
    console.log('Bot Error:', err);
  });
}

startBot();
