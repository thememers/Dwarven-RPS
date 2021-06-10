exports.run = (bot, Discord, message, args) => {
    //For editing names
    let NewName = args[0];
    let ID = message.author.id.toString();
    let UserNameToChange = bot.Records.get(ID, "Name");

    if (NewName === UserNameToChange){
        message.channel.send(`That is your name bozo`);
        return;
    }

    let Keys = Array.from(bot.Records.keys());

    for (key in Keys) {
        //Not super happy with how this works but whatever
        let StoredObject = bot.Records.get(Keys[key], UserNameToChange)
        if (StoredObject){//Don't update current player
            let NewAdd = {
                [NewName] : StoredObject
            }
            bot.Records.update(Keys[key],NewAdd);//Add new key pair
            bot.Records.delete(Keys[key],UserNameToChange);//Remove old key pair
        }
    };

    bot.Records.set(ID, NewName, "Name");

    message.channel.send(`Name has changed too ${NewName}`);
    console.log(bot.Records);

}