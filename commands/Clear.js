exports.run = (bot, Discord, message, args) => {
    //mod only clears leaderboard incase we change how data gets stored
    if (!bot.config.adminID.includes(message.author.id.toString())) return;
    
    if (!args.length){// full emptying
        bot.Records.clear();
        message.channel.send(`The database has been cleared out!`);
    }
    else if (args[0].toLowerCase() == "reset"){//just reset scores
        let Keys = Array.from(bot.Records.keys());
        for (key in Keys) {
            let UserRecords = bot.Records.get(Keys[key]);
            for (MatchRecords in UserRecords){
                bot.Records.set(Keys[key], 0, `${MatchRecords}.wins`);
                bot.Records.set(Keys[key], 0, `${MatchRecords}.loses`);
                bot.Records.set(Keys[key], 0, `${MatchRecords}.draws`);
            };
        };
        message.channel.send(`The scoreboard has been reset!`);
    };
}