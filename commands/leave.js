const Discord = require("discord.js");

async function run(bot, message, args, ops) {
  if(!message.member.voiceChannel) return message.channel.send("Please connect to a voice channel.");
  if(!message.guild.me.voiceChannel) return message.channel.send("Sorry, the bot isnt connected to the guild.");
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Sorry, you do not have permission to run this command.");

  let data = ops.active.get(message.guild.id) || {};
  message.guild.me.voiceChannel.leave();
  data.dispatcher = NaN;
  data.connection = NaN;
  data.queue = NaN;
  ops.active.delete(message.guild.id);

  /*
  ops.active.delete(dispatcher.guildID);
  let vc = bot.guilds.get(dispatcher.guildID).me.voiceChannel;
  if(vc) vc.leave();
  */

  return message.channel.send("Leaving voice...");
}

module.exports.run = run;
