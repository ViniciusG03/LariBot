module.exports = (interaction, commandObj) => {
    if (commandObj.devOnly) {
      if (interaction.member.find.cache.has() !== "905475185560399893") {
        interaction.reply('This command is for the developer only');
        return true; 
      }
      return true; 
    }
  };