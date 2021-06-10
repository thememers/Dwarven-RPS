exports.run = (bot, Discord, message, args) => {
    let ID = message.author.id.toString();
    let name = args[0];

    //Then we'll add them to the database here
    if (!bot.Records.has(ID) && name.toLowerCase() != "overall"){
        try{
            let Add = {
                [name]:{
                    "wins": 0,//How many time the user holding this object has won
                    "loses": 0,//How many time the user holding this object has lost
                    "draws": 0//How many time the user holding this object has drawn
                }
            };

            let Keys = Array.from(bot.Records.keys());

            bot.Records.set(`${ID}`, {"Name" : name, "Overall" : {
                    "wins": 0,
                    "loses": 0,
                    "draws": 0
                }
            });
            
            for (key in Keys) {
                bot.Records.update(Keys[key], Add);
                let newName = bot.Records.get(Keys[key], "Name");
                let newAdd = {
                    [newName]:{
                        "wins": 0,
                        "loses": 0,
                        "draws": 0
                    }
                };
                bot.Records.update(ID, newAdd);
            };
            console.log(bot.Records);

            message.author.send({embed: {
                color: bot.EmbedColor,
                author: {
                    name: bot.user.username,
                    icon_url: bot.user.avatarURL
                },
                title: "Help Menu",
                fields: [
                    {
                        name: 'Setup',
                        value: `Type !play and an option to play a game and have someone !execute the game once two players have selected an option \n
                        Or type !help for more info`
                    }
                ],
                image: {
                    url: 'https://i.imgur.com/IdXb75C.png',
                },
            },
            });

            message.author.send(`Welcome to Hell World ${name}!`);

        }
        catch (err) 
        {
            console.error(err);
        }
    }
    else if (name.toLowerCase() == "overall"){
        message.channel.send(`Why are you like this`);
    }
    else{
        let Callout = bot.Records.get(ID, "Name")
        message.channel.send(`You already have a user ${Callout}`);
    };
}