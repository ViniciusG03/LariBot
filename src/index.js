require('dotenv').config();
const { Client, IntentsBitField } = require('discord.js');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
})

client.on('ready', (client) => {
    console.log(`✅ ${client.user.tag} is online.`);
});

client.on('ressageCreate', (message) => {
    if(message.content == "Lari") {
        message.reply(`Lari é o apelido de uma irmã do <@${"905475185560399893"}>, uma pessoa brilhante e especial!`);
    }

    if(message.content == "O que você é?") {
        message.reply("Eu sou uma Inteligência Artificial que está em processo de desenvolvimento.")
    }
})

client.login(process.env.TOKEN);