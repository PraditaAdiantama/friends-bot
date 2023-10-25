module.exports = (interaction, commandObj) => {
  if (commandObj.devOnly) {
    if (interaction.member.id !== "793991682310799360") {
      interaction.reply("Command ini hanya bisa di gunakan developer");
      return true;
    } else if (interaction.member.id !== "1166584479897354251") {
      interaction.reply("Command ini hanya bisa di gunakan developer");
      return true;
    }
  }
};
