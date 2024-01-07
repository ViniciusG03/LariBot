const { OpenAI } = require('openai');

const IGNORE_PREFIX = "!";
const CHANNELS = ['1193270507752144927'];

const openai = new OpenAI ({
    apiKey: process.env.OPENAI_KEY,
})

module.exports = async (message, client) => {
    if (message.author.bot) return;
    if (message.content.startsWith(IGNORE_PREFIX)) return;
    if (!CHANNELS.includes(message.channelId) && !message.mentions.users.has(client.user.id)) 
        return;

    await message.channel.sendTyping();

    const sendTypingInterval = setInterval (() => {
        message.channel.sendTyping();
    }, 5000);

    let conversation = [];
    conversation.push({
        role: 'system',
        content: 'Lari is a friendly chatbot.'
    });

    let prevMessages = await message.channel.messages.fetch({ limit: 10});
    prevMessages.reverse();

    prevMessages.forEach((msg) => {
        if (msg.author.bot && msg.author.id !== client.user.id) return;
        if (msg.content.startsWith(IGNORE_PREFIX)) return;

        const username = msg.author.username.replace(/\s+/g, '_').replace(/[^\w\s]/gi, '');

        if (msg.author.id === client.user.id) {
            conversation.push({
                role: 'assistant',
                name: username,
                content: msg.content,
            });

            return;
        }

        conversation.push({
            role: 'user',
            name: 'username',
            content: msg.content,
        });
    })

    const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: conversation,
    }).catch( (err) => {
        console.error('OpenAI Error:\n', err);
        return null;
    })

    clearInterval(sendTypingInterval);

    if (!response) {
        message.reply("Estou tendo problemas com a API da OpenAI. Tente novamente em instantes.")
    }

    message.reply(response.choices[0].message.content);
}