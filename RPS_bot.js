//Imports
const Discord = require("discord.js");
const bot = new Discord.Client();
const fs = require('fs');
const Enmap = require('enmap');
//Variable Setup
bot.config = require("./config.json");//This is also an import but for easier access i guess??
bot.CurrentInputs = []
bot.StoredPlayers = []
bot.Records = new Enmap("Records");
bot.EmbedColor = '#FFD700';
//Login
bot.login(bot.config.token);

bot.on("ready", () =>
{
    console.log(`I'm ready!`);
});
//Setup commands
fs.readdir("./commands/", (err, files) => 
{
    if (err) return console.error(err);
    files.forEach(file => 
    {
        let eventFunction = require(`./commands/${file}`);
        let eventName = file.split(".")[0];
        bot.on(eventName, (...args) => eventFunction.run(bot, Discord, ...args));
    });
});
//On messages
bot.on("message", message => 
{
    if (message.author.bot) return;
    if(message.content.indexOf(bot.config.prefix) !== 0) return;
    const args = message.content.slice(bot.config.prefix.length).trim().split(/\s+/g);
    const command = args.shift().toLowerCase();
    try 
    {
        let commandFile = require(`./commands/${command}.js`);
        commandFile.run(bot, Discord, message, args);
    } catch (err) 
    {
        console.error(err);
        message.channel.send(`Something went wrong as the dumb coder.`)
    }
});
