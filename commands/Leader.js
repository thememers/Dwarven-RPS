exports.run = (bot, Discord, message, args) => {
//This is some hot garbage not even sure i want to do the leaderboard like this anyway
    //Show leaderboards for whole server
    //Most wins
    //Most draws
    //Most loses
    //Most Plays
    let Winner = [];
    let Loser = [];
    let Drawer = [];
    let Matcher = [];

    let WinCount = 0;
    let LoseCount = 0;
    let DrawCount = 0;
    let MatchCount = 0;

    const Seperator = `, `

    let AllData = bot.Records.array()
    //console.log(AllData)
    for (Player in AllData){
        let PlayerData = Object.values(AllData[Player]);
        let StoreName = PlayerData.shift();
        let StoreMatches = 0;
        let StoreWins = 0;
        let StoreLoses = 0;
        let StoreDraws = 0;
        for (Records in PlayerData){
            let Match = PlayerData[Records];
            StoreWins += Match['wins'];
            StoreLoses += Match['loses'];
            StoreDraws += Match['draws'];
            StoreMatches += (StoreWins + StoreLoses + StoreDraws);
        };
        //This could be a function but oh well
        //Wins
        if (StoreWins > WinCount){
            Winner = [StoreName];
            WinCount = StoreWins;
        }
        else if (StoreWins == WinCount){
            Winner.push(StoreName);
        };
        //Loss
        if (StoreLoses > LoseCount){
            Loser = [StoreName];
            LoseCount = StoreLoses;
        }
        else if (StoreLoses == LoseCount){
            Loser.push(StoreName);
        };
        //Draws
        if (StoreDraws > DrawCount){
            Drawer = [StoreName];
            DrawCount = StoreDraws;
        }
        else if (StoreDraws == DrawCount){
            Drawer.push(StoreName);
        };
        //Overall
        if (StoreMatches > MatchCount){
            Matcher = [StoreName];
            MatchCount = StoreMatches;
        }
        else if (StoreMatches == MatchCount){
            Matcher.push(StoreName);
        };
    }
    //Build embed
    let BoardEmbed = new Discord.MessageEmbed()
    .setTitle(`Overall Leaderboard`)
    .setAuthor(bot.user.username, bot.user.avatarURL)
    .setColor(bot.EmbedColor)
    .addField('Statistics', `
        *Most Wins*: ${Winner.join(Seperator)} *Total Wins*: ${WinCount}\n
        *Most Draws*: ${Drawer.join(Seperator)} *Total Draws*: ${DrawCount}\n
        *Most Matches*: ${Matcher.join(Seperator)} *Total Matches*: ${MatchCount}
    `);
    console.log(`Most loses is ${Loser.join(Seperator)} With ${LoseCount} loses`);
    
    message.channel.send(BoardEmbed);
}