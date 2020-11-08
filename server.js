// up time script
const express = require("express");
const app = express();
const request = require('request');
const fetch = require("node-fetch");
app.use(express.static("public"));
app.get("/", (request, response) => {
  response.send('Hello World');
});
const listener = app.listen(process.env.PORT);
setInterval(()  =>  {
  fetch(`https://${process.env.PROJECT_DOMAIN}.glitch.me`);
}, 45000);
/*********************************************************
*****                                                *****
*****  You will need to create a file named (.env)   *****
*****  and add values (TOKEN - sniperChannel)        *****
*****                                                *****
**********************************************************/
// export modules
const Discord = require('discord.js');
const fs = require("fs");
const client = new Discord.Client();
client.login(process.env.TOKEN);
// start bot
client.on('message', message => {
  if  (message.content.toLowerCase().includes("discord.gift/")) {
     if (message.author.id == client.user.id) return;
    let Sniper = client.channels.get(process.env.sniperChannel);
    let code = message.content.split('.gift/').slice(1).join(" ");
    code = code.split(' ')[0];
    request.post({
        url: 'https://discordapp.com/api/v6/entitlements/gift-codes/' + code + '/redeem',
        headers: {
            'Authorization': process.env.TOKEN
        },
        time: true
    }, function (error, response, body) {
        var result = JSON.parse(body);
        console.log(result.message)
        Sniper.send(`Server:${message.guild.name}\nSend by:${message.author.tag}\n${result.message}`);
    });
  };
  if  (message.content.toLowerCase().includes("discordapp.com/gifts/")) {
    if (message.author.id == client.user.id) return;
    let Sniper = client.channels.get(process.env.sniperChannel);
    //Sniper.send(`Server:${message.guild.name}\nSend by:${message.author.tag}\n${message.content}`);
    let code = message.content.split('.com/gifts/').slice(1).join(" ");
    code = code.split(' ')[0];
    request.post({
        url: 'https://discordapp.com/api/v6/entitlements/gift-codes/' + code + '/redeem',
        headers: {
            'Authorization': process.env.TOKEN
        },
        time: true
    }, function (error, response, body) {
        var result = JSON.parse(body);
        console.log(result.message)
        Sniper.send(`Server:${message.guild.name}\nSend by:${message.author.tag}\n${result.message}`);
    });
  };
  if  (message.content.toLowerCase().includes("giveaway") && message.author.bot)  { 
      message.react("🎉");
  };
});
// ready log
client.on("ready", async ()  =>  {
  console.log(`Online ${client.user.username} | ${new Date()}`);

});