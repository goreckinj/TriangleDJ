const Discord = require("discord.js");
const Search = require('yt-search');

async function run(bot, message, args, ops) {
  Search(args.join(' '), function(err, res) {
    if(err) return message.channel.send("Sorry, something went wrong");
    let videos = res.videos.slice(0, 7);

    let response = new Discord.RichEmbed()
    .setTitle("Pick A Song")
    //.setThumbnail()
    .setColor("#C08081");

    let resp = "";
    for(var i = 1; i < videos.length+1; i++) {
      if(i !== 1) resp += "----\n";
      let yt = "";
      if(!videos[i - 1].url.match('^(https?://www.youtu\.?be.com)')) {
        yt += "https://www.youtube.com";
      }
      resp += "**" + i + "** - [" + videos[i - 1].title + "](" + yt + videos[i - 1].url + ")\n";
    }
    if(resp === "") {
      return message.channel.send("No results were found. Sorry!");
    }
    response.addField("Songs", resp)

    message.channel.send(response);

    const filter = m => !isNaN(m.content) && (m.content < videos.length+1) && (0 < m.content) && (m.member.id === message.member.id);

    let collector = message.channel.createMessageCollector(filter, { time: 10000});

    collector.videos = videos;

    collector.once('collect', function(m) {
      let commandFile = require('../play.js')
      commandFile.run(bot, message, [collector.videos[parseInt(m.content) - 1].url], ops);
    });

  });
}

module.exports.run = run;
