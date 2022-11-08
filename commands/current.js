const Discord = require("discord.js");

async function run(bot, message, args, ops) {
  let fetched = ops.active.get(message.guild.id);

  if(!fetched) return message.channel.send("There aren't any songs playing.");

  let queue = fetched.queue;
  let playing = queue[0];

  let yt = "";
  if(!playing.url.match('^(https?://www.youtu\.?be.com)')) {
    yt += "https://www.youtube.com";
  }
  let response = new Discord.RichEmbed()
  .setTitle("Currently Playing")
  .setThumbnail(playing.thumbnail)
  .setColor("#C08081")
  .addField("Song", "[" + playing.songTitle + "](" + yt + playing.url + ")")
  .addField("By", playing.requester);

  message.channel.send(response);
}

module.exports.run = run;
