exports.run = (bot, Discord, message, args) => {
    message.channel.send({embed: {
            color: bot.EmbedColor,
            author: {
                name: bot.user.username,
                icon_url: bot.user.avatarURL
            },
            title: "Help Menu",
            fields: [
                {
                    name: 'Setup',
                    value: `type !ready and a name to get a dm from the bot and be added to the score tracking system \n 
                    Then type !play and an option to play a game and have someone !execute the game once two players have selected an option`
                },
                {
                    name: 'Misc',
                    value: `You can change name with !edit and a new name\n
                    Display a leader board with !leader\n
                    Show your record with any player with !record and their name or with all to see all records`
                }
            ],
            image: {
                url: 'https://i.imgur.com/IdXb75C.png',
            },
        },
    });
}