const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("pomoc")
    .setDescription("Wyświetla listę dostępnych komend."),
  async execute(interaction) {
    await interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setColor(0xf1c40f)
          .setTitle("Pomoc")
          .addFields(
            {
              name: ":computer: Komendy",
              value:
                "</pomoc:1333432523128307732> - Wyświetla listę dostępnych komend.",
            }
          ),
      ],
      flags: MessageFlags.Ephemeral,
    });
  },
};
