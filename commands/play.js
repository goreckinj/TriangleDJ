const Discord = require("discord.js");
const ytdl = require('ytdl-core');
//const Shuffle = require("./helpers/shuffle.js");
//const Default = require("../dependencies/default_playlist.json");

async function run(bot, message, args, ops) {
  if(!message.guild.me.voiceChannel && !message.member.voiceChannel) return message.channel.send("Please connect to a voice channel.");
  if(!args[0]) return message.channel.send("Sorry, please input a url or search following the command.");
  let validate = await ytdl.validateURL(args[0]);

  if(!validate) {
    let commandFile = require('./helpers/search.js');
    return commandFile.run(bot, message, args, ops);
  }

  let info = await ytdl.getInfo(args[0]);

  //TODO: Remove This Later
  console.log("\n" + info.title + "\nhttps://www.youtube.com" + args[0] + "\n");

  let data = ops.active.get(message.guild.id) || {};

  if(!data.connection) data.connection = await message.member.voiceChannel.join();

  if(!data.queue) data.queue = [];

  data.guildID = message.guild.id;

  data.queue.push({
    songTitle: info.title,
    requester: message.author.tag,
    url: args[0],
    thumbnail: info.thumbnail_url,
    announceChannel: message.channel.id
  });

  if(!data.dispatcher) play(bot, message, ops, data);
  else {
    let yt = "";
    if(!args[0].match('^(https?://www.youtu\.?be.com)')) {
      yt += "https://www.youtube.com";
    }
    let queue_embed = new Discord.RichEmbed()
    .setTitle("Added To Queue")
    .setThumbnail(info.thumbnail_url)
    .setColor("#C08081")
    .addField("Song", "[" + info.title + "](" + yt + args[0] + ")")
    .addField("By", data.queue[0].requester);
    message.channel.send(queue_embed);
  }

  ops.active.set(message.guild.id, data);
}

async function play(bot, message, ops, data) {
  //Add something to return if leave command is envoked
  let yt = "";
  if(!data.queue[0].url.match('^(https?://www.youtu\.?be.com)')) {
    yt += "https://www.youtube.com";
  }
  let play_embed = new Discord.RichEmbed()
  .setTitle("Now Playing")
  .setThumbnail(data.queue[0].thumbnail)
  .setColor("#C08081")
  .addField("Song", "[" + data.queue[0].songTitle + "](" + yt + data.queue[0].url + ")")
  .addField("By", data.queue[0].requester);
  message.channel.send(play_embed);

  data.dispatcher = await data.connection.playStream(ytdl(data.queue[0].url, { filter: 'audioonly' }));
  data.dispatcher.guildID = data.guildID;

  data.dispatcher.on('end', () => {
    finish(bot, message, ops, data.dispatcher);
  });
}

async function finish(bot, message, ops, dispatcher) {
  if(!dispatcher) return;
  let fetched = ops.active.get(dispatcher.guildID);
  fetched.queue.shift();
  ops.active.set(dispatcher.guildID, fetched);
  if(fetched.queue.length > 0) {
    play(bot, message, ops, fetched);
  } else {
    if(ops.default.queue.length < 1) {
      ops.default.refill();
    }

    let info = await ytdl.getInfo(ops.default.queue[0]);

    fetched.queue.push({
      songTitle: info.title,
      requester: "TriangleDJ",
      url: ops.default.queue[0],
      thumbnail: info.thumbnail_url,
      announceChannel: message.channel.id
    });

    ops.default.queue.shift();

    play(bot, message, ops, fetched);
  }
}

module.exports.run = run;
module.exports.play = play;
