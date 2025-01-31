const { EmbedBuilder } = require("discord.js");
const cron = require("node-cron");

module.exports = {
  name: "windowsInfoJob",
  setup(client) {
    const gifList = process.env.GIF_LIST.split(",");
    const randomGif = gifList[Math.floor(Math.random() * gifList.length)];

    // Schedule the info at 20:00 every Monday and Thursday
    cron.schedule(
      "0 20 * * 1,4",
      async () => {
        try {
          const channel = await client.channels.fetch(process.env.GENERAL_CHANNEL_ID);
          if (!channel) return console.error(`Channel not found: ${channel}`);

          const embed = new EmbedBuilder()
            .setColor(0xf1c40f)
            .setAuthor({
              name: "Kweikobot",
            })
            .setTitle(
              "Dni bez aktywacji Windowsa <:monkaHmm:1333513567776935936>"
            )
            .setDescription(
              `Data składania: 23.10.2024\nLiczba dni: ${getNumberOfDaysTillNow(
                "2024-10-23"
              )}`
            )
            .addFields({
              name: "Windowsowanie",
              value:
                "_Od miesięcy czekamy, aż cud się zdarzy,\nWindows aktywny ciągle nam się marzy.\nCała grupa widzów, czat wręcz wariuje,\n„Aktywuj system Windows!” – wciąż każdy skanduje.\nSymulator siłowni bawi nas do łez,\nAle ten baner to prawdziwy stres.\nNiech ten moment w końcu nastanie,\nBo nasze czekanie to wielkie wyzwanie!_\n\n⠀⠀~ jastka4 x ChatGPT",
              inline: false,
            })
            .setImage(randomGif)
            .setThumbnail(
              "https://e7.pngegg.com/pngimages/1016/89/png-clipart-microsoft-windows-logo-windows-98-windows-95-windows-xp-windows-2000-windows-logos-text-rectangle.png"
            )
            .setColor(0xf1c40f)
            .setFooter({
              text: "Kweikobot",
            })
            .setTimestamp();

          await channel.send({ embeds: [embed] });
        } catch (error) {
          console.error("Error scheduling Windows info: ", error);
        }
      },
      { timezone: "Europe/Warsaw" }
    );
  },
};

function getNumberOfDaysTillNow(start) {
  const date1 = new Date(start);
  const date2 = new Date();

  // One day in milliseconds
  const oneDay = 1000 * 60 * 60 * 24;

  // Calculating the time difference between two dates
  const diffInTime = date2.getTime() - date1.getTime();

  // Calculating the no. of days between two dates
  const diffInDays = Math.round(diffInTime / oneDay);

  return diffInDays;
}
