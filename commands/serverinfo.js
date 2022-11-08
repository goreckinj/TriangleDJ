const Discord = require("discord.js");

async function run(bot, message, args, ops) {
  let sicon = message.guild.iconURL;
  let serverembed = new Discord.RichEmbed()
    .setTitle("Server Information")
    .setColor("#C08081")
    .setThumbnail(sicon)
    .addField("Server Name", message.guild.name)
    .addField("Created On", message.guild.createdAt)
    .addField("You Joined", message.member.joinedAt)
    .addField("Total Members", message.guild.memberCount);

  return message.channel.send(serverembed);
}

module.exports.run = run;
