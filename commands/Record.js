exports.run = (bot, Discord, message, args) => {
    //Show the records of player who entered command
    let ID = message.author.id.toString();
    let UserRecords = bot.Records.get(ID);
    let LookFor = args[0].toLowerCase();

    let FinalKey = Array.from(Object.keys(UserRecords)).filter(
        key => key.toLowerCase() === LookFor
    );

    if (!FinalKey && LookFor != "all"){
        message.channel.send(`${args[0]} was not found`);
        return;
    }
    //Setup Variables
    let VSName = (LookFor != "all") ? FinalKey : "everyone";
    let VSData = UserRecords[FinalKey];
    //Build Embed
    let RecordEmbed = new Discord.MessageEmbed()
    .setTitle(`Record against ${VSName}`)
    .setAuthor(bot.user.username, bot.user.avatarURL)
    .setColor(bot.EmbedColor);

    if (LookFor != "all"){
        AddEmbedBlock(RecordEmbed, VSData, "Record")
    }
    else{
        let AllKeys = Object.keys(UserRecords);
        AllKeys.shift();
        let i = 0
        for(Opponents in AllKeys){
            if (i <= 25){
                var Name = AllKeys[Opponents]
                AddEmbedBlock(RecordEmbed, UserRecords[Name], "VS: " + Name);
                i += 1;
            }
            else{
                break;
            }
        };
    };
    //Then send it finally
    message.channel.send(RecordEmbed);
}

function AddEmbedBlock(Embed, Data, Header){//Creates a block for each player
    let TextData = ``;
    for (Fields in Data){
        TextData += `*${Fields}*: ` + `${Data[Fields]}\n`
    };
    Embed.addField(Header, TextData.trimEnd(), true)
}