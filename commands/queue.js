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
  .setTitle("Music Currently Queued")
  .setThumbnail(playing.thumbnail)
  .setColor("#C08081")
  .addField("Currently Playing", ("[" + playing.songTitle + "](" + yt + playing.url + ")"
    + "\nBy: " + playing.requester));
  let items = "";

  for(var i = 1; i < queue.length; i++) {
    if(!(i === 1)) items += "----\n";
    let yt_q = "";
    if(!queue[i].url.match('^(https?://www.youtu\.?be.com)')) {
      yt_q += "https://www.youtube.com";
    }
    items += "**" + i + "** - " + "[" + queue[i].songTitle + "](" + yt_q + queue[i].url + ")\nBy: " + queue[i].requester + "\n";
  }

  if(items === "") items = "Empty Set";

  response.addField("Queue", items);
  message.channel.send(response);
}

module.exports.run = run;
