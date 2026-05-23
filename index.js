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
    host: 'Tecnosense.aternos.me', // तुम्हारी एकदम सही IP
    port: 6297,                    // तुम्हारा लाइव पोर्ट
    username: 'bot afk',              
    version: false                 // <--- यहाँ बस false कर दो
  });

  bot.on('spawn', () => {
    console.log('Tecno has spawned successfully!');
    // एंटी-एएफके ऑटो जंप चालू
    bot.setControlState('jump', true);
  });

  // अगर सर्वर रीस्टार्ट हो या बॉट किक हो, तो 10 सेकंड में अपने आप रीकनेक्ट होगा
  bot.on('end', () => {
    console.log('Bot disconnected. Reconnecting in 10 seconds...');
    setTimeout(startBot, 10000);
  });

  bot.on('error', (err) => console.log('Bot Error:', err));
}

startBot();
