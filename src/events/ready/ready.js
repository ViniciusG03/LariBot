const { ActivityType } = require('discord.js');

module.exports = async (client) => {
    let ativy = [`How can I assist you today?`, `I'm using GPT-4 API`, `Love Contempt❤`];
    at = 0;
  setInterval(
    () =>
      client.user.setPresence({
        activities: [
          {
            name: `${ativy[at++ % ativy.length]}`,
            type: ActivityType.Playing,
          },
        ],
        status: "idle",
      }),
    1000 * 5
  );
    console.log(`✅ ${client.user.tag} is ready.`);
}