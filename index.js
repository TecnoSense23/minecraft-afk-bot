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
    host: 'Tecnosense.aternos.me',   
    port: 25565,                     
    username: 'Jarvis_AFK',          
    version: '1.20.4'                // 🔥 तुमने बिल्कुल सही कहा, इसे 1.20.4 ही रखेंगे!
  });

  bot.on('spawn', () => {
    console.log('Jarvis has spawned successfully!');
  });

  bot.on('chat', (username, message) => {
    if (username === bot.username) return;
    bot.chat('Hello! I am an AFK Bot.');
  });

  // ऑटो-रिस्पॉन
  bot.on('death', () => {
    console.log('Jarvis mar gaya! Auto-respawning...');
    bot.respawn();
  });

  // अटरनोस को चकमा देने के लिए प्रो AFK मूवमेंट
  setInterval(() => {
    if (bot.entity) {
      bot.swingArm('right'); 
      bot.setControlState('sneak', true); 
      setTimeout(() => {
        if (bot.entity) bot.setControlState('sneak', false); 
      }, 500); 
      bot.look(Math.random() * Math.PI * 2, 0); 
    }
  }, 10000); 

  // 🔥 सबसे ज़रूरी बदलाव: 'disconnect' की जगह 'end'
  bot.on('end', (reason) => {
    console.log('Bot disconnected or timed out! Reconnecting in 10 seconds...');
    setTimeout(startBot, 10000);
  });

  bot.on('error', (err) => {
    console.log('Bot Error:', err);
  });
}

// बॉट स्टार्ट करें
startBot();
