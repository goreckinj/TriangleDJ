const Discord = require("discord.js");

async function run(bot, message, args, ops) {
  let bicon = bot.user.displayAvatarURL;
  let botembed = new Discord.RichEmbed()
    .setTitle("Bot Information")
    .setColor("#C08081")
    .setThumbnail(bicon)
    .addField("Bot Name", bot.user.username)
    .addField("Created On", bot.user.createdAt);

  return message.channel.send(botembed);
}

module.exports.run = run;
