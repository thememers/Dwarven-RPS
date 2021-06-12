exports.run = (bot, Discord, message, args) => {
    let ID = message.author.id.toString();
    //Just to grab inputs
    //This should also check if the players in the system

    if(!(args[0].toLowerCase() in bot.GameData.ArrayTable)){
        message.channel.send(`Not a valid input`);
        return;
    }

    if (bot.CurrentInputs.length <= 2){
        let Name = bot.Records.get(ID, "Name");
        bot.CurrentInputs.push(args[0].toLowerCase());
        bot.StoredPlayers.push(message.author.id);
        console.log(`Recieved play from from ${Name}`);
    }

    else{
        message.channel.send(`A game is in progress`);
    };

}