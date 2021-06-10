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

    let Keys = Array.from(bot.Records.keys());

    for (key in Keys){
        let StoreName = bot.Records.get(Keys[key], "Name");//Get name
        let NewData = bot.Records.get(Keys[key], "Overall");//Get the overall data
        if (NewData["wins"] >= WinCount){
            if (NewData["wins"] > WinCount) Winner = [];
            Winner.push(StoreName);
            WinCount = NewData["wins"];
        };
        if (NewData["loses"] >= LoseCount){
            if (NewData["loses"] > LoseCount) Loser = [];
            Loser.push(StoreName);
            LoseCount = NewData["loses"];
        };
        if (NewData["draws"] >= DrawCount){
            if (NewData["draws"] > DrawCount) Drawer = [];
            Drawer.push(StoreName);
            DrawCount = NewData["draws"];
        };
        if (NewData["draws"] + NewData["loses"] + NewData["wins"] >= MatchCount){
            if (NewData["draws"] + NewData["loses"] + NewData["wins"] > MatchCount) Matcher = [];
            Matcher.push(StoreName);
            MatchCount = NewData["draws"];
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