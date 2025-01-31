require('dotenv').config()

const { Client, Collection, IntentsBitField } = require("discord.js");
const express = require('express');
const fs = require("node:fs");
const path = require("node:path");

const app = express();
const port = process.env.PORT || 3000;

const client = new Client({ intents: [IntentsBitField.Flags.Guilds, IntentsBitField.Flags.GuildMessages] });

client.commands = new Collection();
client.jobs = new Collection();

const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);

  if ("data" in command && "execute" in command) {
    client.commands.set(command.data.name, command);
  } else {
    console.log(
      `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
    );
  }
}

const eventsPath = path.join(__dirname, "events");
const eventFiles = fs
  .readdirSync(eventsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
  const event = require(filePath);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

client.login(process.env.DISCORD_BOT_TOKEN);

app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});