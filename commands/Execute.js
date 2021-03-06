/*
    0 = Draw
    -1 = Loss for first player
    1 = win for first player
    2 = both win
    (there could be more convoluted rules later)
*/
// Table
//   R  Pa Sc Pi  D  G  L  A  F  H  Pl E  Si C                
//  [ 0, 1, 1,-1,-1, 0,-1, 1, 0, 0, 0, 0, 0, 0],//Rock
//  [-1, 0,-1, 1, 1,-1, 0, 0, 1, 1, 0, 0, 0, 0],//Paper
//  [-1, 1, 0, 0, 0, 0,-1, 1, 0,-1, 0, 0, 0, 0],//Scissors
//  [ 1,-1, 1, 0, 0, 0, 0, 1,-1,-1, 0, 0, 0, 0],//Pickaxe
//  [ 1,-1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0],//Dynamite
//  [ 0, 1, 0, 0, 0, 0,-1,-1, 2, 0,-1, 1, 1, 1],//Gold
//  [ 1, 0, 1, 0, 0, 1, 0, 1,-1, 1, 0, 0, 0, 0],//Lava
//  [-1, 1, 0,-1,-1, 1,-1, 0,-1, 1, 0, 0, 0, 0],//Ale
//  [ 0,-1, 0, 0,-1, 2, 1, 1, 0,-1, 0, 0, 0, 0],//Forge
//  [ 0,-1, 1, 1, 0, 0,-1,-1, 1, 0, 0, 0, 0, 0],//Hammer
//  [ 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1],//Platinum
//  [ 0, 0, 0, 0, 0,-1, 0, 0, 0, 0, 0, 0, 1, 1],//Electrum
//  [ 0, 0, 0, 0, 0,-1, 0, 0, 0, 0,-1,-1, 0, 1],//Silver
//  [ 0, 0, 0, 0, 0,-1, 0, 0, 0, 0,-1,-1,-1, 0] //Copper

exports.run = (bot, Discord, message, args) => {//This one actually runs the game and does lookup table stuff

    if (bot.CurrentInputs.length < 2){
        message.channel.send(`A game is not full`);
        return;
    }

    var Resuts = [bot.GameData.ArrayTable[bot.CurrentInputs[0]], bot.GameData.ArrayTable[bot.CurrentInputs[1]]];//Get the results

    var ZName = bot.Records.get(bot.StoredPlayers[0], "Name");
    var OName = bot.Records.get(bot.StoredPlayers[1], "Name");

    message.channel.send(`${ZName} Has chosen: ${bot.CurrentInputs[0]} \n ${OName} Has chosen: ${bot.CurrentInputs[1]}`);

    var ZTag = "draws";
    var OTag = "draws";

    switch(bot.GameData.Table[Resuts[0]][Resuts[1]]){//Then deal with the results

        case 0:
            message.channel.send(`The current game resulted in a tie`);
            break;

        case 1:
            message.channel.send(`The current game resulted in a win for ${ZName}`);
            ZTag = "wins";
            OTag = "loses";
            break;

        case -1:
            message.channel.send(`The current game resulted in a win for ${OName}`);
            ZTag = "loses";
            OTag = "wins";
            break;
        
        case 2:
            message.channel.send(`The current game resulted in a win for both players! A true victory for capitalism!`);
            ZTag = "wins";
            OTag = "wins";
            break;

    }
    //Increment individual records
    bot.Records.inc(bot.StoredPlayers[0], `${OName}.${ZTag}`);
    bot.Records.inc(bot.StoredPlayers[1], `${ZName}.${OTag}`);
    //Increment totals
    bot.Records.inc(bot.StoredPlayers[0], `Overall.${ZTag}`);
    bot.Records.inc(bot.StoredPlayers[1], `Overall.${OTag}`);

    console.log(bot.Records);

    bot.CurrentInputs = []; //Clear out the inputs
    bot.StoredPlayers = [];
}