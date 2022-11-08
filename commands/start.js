async function run(bot, message, args, ops) {
  if(message.guild.me.voiceChannel) return message.channel.send("The bot is already started.");
  if(!message.member.voiceChannel) return message.channel.send("Please connect to a voice channel.");
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Sorry, you do not have permission to run this command.");

  const ytdl = require('ytdl-core');

  const commandFile = require('./play.js');

  let data = ops.active.get(message.guild.id) || {};

  if(!data.connection) data.connection = await message.member.voiceChannel.join();

  if(!data.queue) data.queue = [];

  data.guildID = message.guild.id;

  let info = await ytdl.getInfo(ops.default.queue[0]);

  data.queue.push({
    songTitle: info.title,
    requester: "TriangleDJ",
    url: ops.default.queue[0],
    thumbnail: info.thumbnail_url,
    announceChannel: message.channel.id
  });

  commandFile.play(bot, message, ops, data);
}

module.exports.run = run;
