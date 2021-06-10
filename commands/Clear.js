exports.run = (bot, Discord, message, args) => {
    //mod only clears leaderboard incase we change how data gets stored
    if (!bot.config.adminID.includes(message.author.id.toString())) return;
    
    bot.Records.clear();
    
    message.channel.send(`The database has been cleared out!`);
}