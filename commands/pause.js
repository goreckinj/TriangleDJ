const Discord = require("discord.js");

async function run(bot, message, args, ops) {
  let fetched = ops.active.get(message.guild.id);
  if(!fetched) return message.channel.send("There isn't a song playing.");

  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Sorry, you do not have permission to run this command.");

  if(fetched.dispatcher.paused) return message.channel.send("Music already paused.");

  fetched.dispatcher.pause();

  let yt = "";
  if(!fetched.queue[0].url.match('^(https?://www.youtu\.?be.com)')) {
    yt += "https://www.youtube.com";
  }
  let response = new Discord.RichEmbed()
  .setTitle("Song Paused")
  .setThumbnail(fetched.queue[0].thumbnail)
  .setColor("#C08081")
  .addField("Song", "[" + fetched.queue[0].songTitle + "](" + yt + fetched.queue[0].url + ")")
  .addField("By", fetched.queue[0].requester)
  .addField("Paused By", message.author.tag);

  message.channel.send(response);
}

module.exports.run = run;
