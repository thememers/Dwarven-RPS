const ArrayTable = {//Index for type checks
    'rock': 0,
    'paper': 1,
    'scissors': 2,
    'pickaxe': 3,
    'dynamite': 4,
    'gold': 5,
    'lava': 6,
    'ale': 7,
    'forge': 8,
    'hammer': 9,
    'platinum': 10,
    'electrum': 11,
    'silver': 12,
    'copper': 13,
}

exports.run = (bot, Discord, message, args) => {
    let ID = message.author.id.toString();
    //Just to grab inputs
    //This should also check if the players in the system

    if(!(args[0].toLowerCase() in ArrayTable)){
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