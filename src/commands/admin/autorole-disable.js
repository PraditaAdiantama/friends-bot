const {InteractionCollector, PermissionFlagsBits, SlashCommandBuilder} = require('discord.js');
const AutoRole = require('../../models/AutoRole');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('autorole-disable')
        .setDescription('Disable auto role in this server.'),
    devOnly: true,
    /**
     * @param {Interaction} interaction 
     */
    run: async ({interaction}) => {
        try {
            await interaction.deferReply();

            if(!(await AutoRole.exists({guildId: interaction.guild.id}))){
                interaction.editReply("Auto role has not been configured for this server. Use `/autorole-configure` to set up");
                return;
            }

            await AutoRole.findOneAndDelete({guildId: interaction.guild.id});
            interaction.editReply('Auto role has been disabled for this server. Use `/autorole-configure` to set up again');
        } catch (error) {
            console.log(error);
        }
    }
}