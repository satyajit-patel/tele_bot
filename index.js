/*
    npm init -y
    npm i node-telegram-bot-api
    get api key from telegram => BotFather -> /newbot -> give [botName] and [userName]
    secure your api key => npm i dotenv
    make n/w calls => npm i axios
    start server => node index.js

    // deploy node app in render
    Build Command: npm install
    Start Command: npm start
*/

const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const axios = require('axios');

const telegramBot = require('node-telegram-bot-api');

// replace the value below with the Telegram token you receive from @BotFather
const token = process.env.apiKey;

// Create a bot that uses 'polling' to fetch new updates
const bot = new telegramBot(token, {polling: true});

bot.onText(/\/joke/, async (msg) => {
    const chatId = msg.chat.id;
    const response = await axios.get(process.env.apiCall);
    /*
                     _______________
        structure of |response.data|
                     _______________
        {
            "type": "programming",
            "setup": "I was gonna tell you a joke about UDP...",
            "punchline": "...but you might not get it.",
            "id": 71
        }
    */
    const setup = response.data.setup;
    const punchline = response.data.punchline;
  
    // console.log(response.data);
    bot.sendMessage(chatId, setup + ', ' + punchline);
});


// Listen for any kind of message. There are different kinds of
// messages.
// bot.on('message', (msg) => {
//     // 'msg' is the received Message from Telegram
//     const chatId = msg.chat.id;
//     const chatName = msg.chat.first_name;
  
//     // send a message to the chat acknowledging receipt of their message
//     bot.sendMessage(chatId, ` Hi ${chatName} please type the secret word to get specific replay. What was the WORD`);
// });

const PORT = process.env.PORT;
app.get('/', (req, res) => {
    res.send("Server is Up");
});
app.listen(PORT, () => {
    console.log(`Running at PORT ${PORT}`);
});
// console.log('app is running');