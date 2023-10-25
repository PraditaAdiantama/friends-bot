const {
  Client,
  SlashCommandBuilder,
} = require("discord.js");
const AutoRole = require("../../models/AutoRole");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("autorole-configure")
    .setDescription("Configure your auto-role for this server.")
    .addRoleOption((option) =>
      option
        .setName("role")
        .setDescription("The role you want users to get join.")
        .setRequired(true)
    ),
  devOnly: true,
  /**
   *
   * @param {Client} client
   * @param {Interaction} interaction
   */
  run: async ({ interaction }) => {
    if (!interaction.inGuild()) {
      interaction.reply("You can only run this command inside a server.");
      return;
    }

    const targetRoleId = interaction.options.get("role").value;

    try {
      await interaction.deferReply();

      let autoRole = await AutoRole.findOne({ guildId: interaction.guild.id });
      if (autoRole) {
        if (autoRole.roleId === targetRoleId) {
          interaction.editReply(
            "Auto role has already been configured for that role. To disable run `/autorole-disable`"
          );
          return;
        }
        autoRole.roleId = targetRoleId;
      } else {
        autoRole = new autoRole({
          guildId: interaction.guild.id,
          roleId: targetRoleId,
        });
      }

      await autoRole.save();
      interaction.editReply(
        "Auto role has now configured. To disable run `/autorole-disable`"
      );
    } catch (error) {}
  },
};
