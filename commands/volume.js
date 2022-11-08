const Discord = require("discord.js");

async function run(bot, message, args, ops) {
  let fetched = ops.active.get(message.guild.id);
  if(!fetched) return message.channel.send("There isn't a song playing.");

  if(message.member.voiceChannel !== message.guild.me.voiceChannel)
    return message.channel.send("Sorry, you are not connected to the same channel as me.");

  var prior = fetched.dispatcher.volume * 100;
  var current = args[0];

  if(isNaN(args[0])) {
    let response = new Discord.RichEmbed()
    .setTitle("Volume Status")
    .setThumbnail(fetched.queue[0].thumbnail)
    .setColor("#C08081")
    .addField("Volume", prior);

    return message.channel.send(response);
  }

  if(args[0] > 200 || args[0] < 0) return message.channel.send("Input a number within the following range [0, 200]");

  fetched.dispatcher.setVolume(current/100);

  let response = new Discord.RichEmbed()
  .setTitle("Volume Changed")
  .setThumbnail(fetched.queue[0].thumbnail)
  .setColor("#C08081")
  .addField("To", current)
  .addField("From", prior)
  .addField("By", message.author.tag);

  message.channel.send(response);
}

module.exports.run = run;
