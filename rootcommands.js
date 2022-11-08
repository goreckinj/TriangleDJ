const Discord = require("discord.js");
const ytdl = require('ytdl-core');

//HELLO FUNCTION
async function hello(bot, message) {
  return message.channel.send("Hello child of infestation!");
}

//BOTINFO FUNCTION
async function bot_info(bot, message) {
  let bicon = bot.user.displayAvatarURL;
  let botembed = new Discord.RichEmbed()
    .setDescription("Bot Information")
    .setColor("#C08081")
    .setThumbnail(bicon)
    .addField("Bot Name", bot.user.username)
    .addField("Created On", bot.user.createdAt);

  return message.channel.send(botembed);
}

//SERVERINFO FUNCTION
async function server_info(bot, message) {
  let sicon = message.guild.iconURL;
  let serverembed = new Discord.RichEmbed()
    .setDescription("Server Information")
    .setColor("#C08081")
    .setThumbnail(sicon)
    .addField("Server Name", message.guild.name)
    .addField("Created On", message.guild.createdAt)
    .addField("You Joined", message.member.joinedAt)
    .addField("Total Members", message.guild.memberCount);

  return message.channel.send(serverembed);
}

//REPORT FUNCTION
async function report(bot, message, args) {
  let r_user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!r_user) return message.channel.send("Sorry, I couldn't find that user.");
  let reason = args.join(" ").slice(22);

  let report_embed = new Discord.RichEmbed()
    .setDescription("Reports")
    .setColor("#C08081")
    .addField("Reported User", r_user + "with ID: " + r_user.id)
    .addField("Reported By", message.author + "with ID: " + message.author.id)
    .addField("Channel", message.channel)
    .addField("Timestamp", message.createdAt)
    .addField("Reason", reason);

  let report_channel = message.guild.channels.find("name", "reports");
  if(!report_channel) return message.channel.send("Couldn't find reports channel.");

  message.delete().catch(report => {});
  report_channel.send(report_embed);

  return;
}

//HELP FUNCTION
async function help(bot, message, args) {
  let helpembed = new Discord.RichEmbed()
    .setDescription("Commands")
    .addField("botinfo:", "Shows general info for the bot")
    .addField("serverinfo:", "Shows general info for the server")
    .addField("play:", "Plays a specified Youtube URL (audio only)")
    .addField("leave:", "Leaves the current discord voice channel");

  //TODO: Continue basic UI for help

  return message.channel.send(helpembed);
}

//KICK FUNCTION
async function kick(bot, message, args) {
  let k_user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!k_user) return message.channel.send("Cannot find user");
  let k_reason = args.join(" ").slice(22);
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You do not have permissions to kick said member");
  if(k_user.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Cant kick an administrative role");

  let incident_channel = message.guild.channels.find("name", "incidents");
  if(!incident_channel) return message.channel.send("Couldn't find incidents channel.");

  let kick_embed = new Discord.RichEmbed()
  .setDescription("Kick")
  .setColor("#C08081")
  .addField("Kicked User", k_user + "with ID: " + k_user.id)
  .addField("Kicked By", message.author + "with ID: " + message.author.id)
  .addField("Channel", message.channel)
  .addField("Timestamp", message.createdAt)
  .addField("Reason", k_reason);

  message.guild.member(k_user).kick(k_reason);

  message.delete().catch(kick => {});
  incident_channel.send(kick_embed);

  return;
}

//PLAY FUNCTION
async function play(bot, message, args) {
  if(!message.member.voiceChannel) return message.channel.send("Please connect to a voice channel.");
  if(message.guild.me.voiceChannel) return message.channel.send("Sorry, the bot is already connected to the guild.");
  if(!args[0]) return message.channel.send("Sorry, please input a url following the command.");

  let validate = await ytdl.validateURL(args[0]);

  if(!validate) return message.channel.send("Sorry, please input a valid url following the command.");

  let info = await ytdl.getInfo(args[0]);

  let connection = await message.member.voiceChannel.join();

  let dispatcher = await connection.playStream(ytdl(args[0], { filter: 'audioonly' }));

  message.channel.send("Now playing: " + info.title);
}

async function leave(bot, message) {
  if(!message.member.voiceChannel) return message.channel.send("Please connect to a voice channel.");
  if(!message.guild.me.voiceChannel) return message.channel.send("Sorry, the bot isnt connected to the guild.");
  if(message.guild.me.voiceChannelID !== message.member.voiceChannelID) return mesage.channel.send("Sorry, you're not connected to the same voice channel as me.");

  message.guild.me.voiceChannel.leave();

  return message.channel.send("Leaving voice...");
}


module.exports.play = play;
module.exports.hello = hello;
module.exports.bot_info = bot_info;
module.exports.server_info = server_info;
module.exports.report = report;
module.exports.kick = kick;
module.exports.help = help;
module.exports.leave = leave;
