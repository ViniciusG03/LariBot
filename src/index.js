require('dotenv').config();
const { Client, IntentsBitField, ButtonBuilder, ButtonStyle, ActionRowBuilder, ComponentType } = require('discord.js');
const { CommandHandler } = require('djs-commander');
const path = require('path');
const config = require('../config.json');
const responses = require('./events/messageCreate/form_message');

const token = config.token;
const test_server = config.test_server;
const openai_key = config.openai_key;


const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
        IntentsBitField.Flags.GuildPresences,
    ],
})

new CommandHandler({
    client: client,
    commandsPath: path.join(__dirname, 'commands'),
    eventsPath: path.join(__dirname, 'events'),
    validationsPath: path.join(__dirname, 'validations'),
    testServer: test_server,
});

client.login(token);
