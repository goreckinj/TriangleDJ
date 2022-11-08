const Discord = require("discord.js");

async function run(bot, message, args, ops) {
  let help_embed = new Discord.RichEmbed()
    .setTitle("Bot Commands")
    .addField("$botinfo", "Shows general info for the bot")
    .addField("$serverinfo", "Shows general info for the server")
    .addField("$play", "Plays a specified Youtube URL (audio only)")
    .addField("$leave", "Leaves the current discord voice channel")
    .addField("$queue", "Shows songs currently queued")
    .addField("$current", "Shows the song currently playing")
    .addField("$skip", "Skips the song currently playing")
    .addField("$pause", "Pauses the song currently playing")
    .addField("$resume", "Resumes the song currently paused")
    .addField("$volume", "Changes the volume to a specified amount");

  //TODO: Continue basic UI for help

  return message.channel.send(help_embed);
}

module.exports.run = run;
