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
    host: 'Tecnosense.aternos.me',   // तुम्हारी मेन IP
    port: 25565,                     // असली ताला खोलने वाला पोर्ट
    username: 'Jarvis_AFK',          // साफ नाम
    version: '1.20.4'                // तुम्हारा 1.20.4 वर्ज़न (जो काम कर रहा है)
  });

  bot.on('spawn', () => {
    console.log('Jarvis has spawned successfully!');
  });

  bot.on('chat', (username, message) => {
    if (username === bot.username) return;
    bot.chat('Hello! I am an AFK Bot.');
  });

  // 🔥 1. ऑटो-रिस्पॉन: अगर बॉट किसी वजह से मर भी जाए, तो तुरंत ज़िंदा हो जाएगा
  bot.on('death', () => {
    console.log('Jarvis mar gaya! Auto-respawning...');
    bot.respawn();
  });

  // 🔥 2. अटरनोस को चकमा देने के लिए प्रो AFK मूवमेंट
  setInterval(() => {
    if (bot.entity) {
      bot.swingArm('right'); // हाथ घुमाएगा
      bot.setControlState('sneak', true); // क्राउच करेगा
      setTimeout(() => {
        if (bot.entity) bot.setControlState('sneak', false); // वापस खड़ा होगा
      }, 500); 
      bot.look(Math.random() * Math.PI * 2, 0); // मुंडी घुमाकर इधर-उधर देखेगा
    }
  }, 10000); // हर 10 सेकंड में ये हरकत करेगा

  // 🔥 3. एंटी-एएफके ऑटो जंप (तुम्हारी वर्किंग ट्रिक)
  bot.on('physicTick', () => {
    if (bot.entity) {
      bot.setControlState('jump', true);
    }
  });

  // 🔥 4. टाइम-आउट या किक होने पर 10 सेकंड में खुद वापस आना
  bot.on('end', () => {
    console.log('Bot disconnected or timed out! Reconnecting in 10 seconds...');
    setTimeout(startBot, 10000);
  });

  bot.on('error', (err) => {
    console.log('Bot Error:', err);
  });
}

// बॉट स्टार्ट करें
startBot();
