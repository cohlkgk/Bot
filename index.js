const mineflayer = require('mineflayer');
const express = require('express');
const app = express();

const bot = mineflayer.createBot({
  host: 'schoolsmpfun.aternos.me',
  port: 62533,
  username: 'JumpBot',
  version: false,
});

function jumpLoop() {
  if (bot && bot.entity) {
    bot.setControlState('jump', true);
    setTimeout(() => {
      bot.setControlState('jump', false);
    }, 200);
  }
  setTimeout(jumpLoop, 1000);
}

bot.on('spawn', () => {
  console.log('Bot spawned');
  jumpLoop();
});

bot.on('end', () => {
  console.log('Bot disconnected, reconnecting...');
  setTimeout(() => {
    process.exit();
  }, 1000);
});

app.get('/', (req, res) => {
  res.send('Bot is running!');
});

app.listen(process.env.PORT || 3000);
