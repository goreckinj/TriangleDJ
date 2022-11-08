const botconfig = require("./dependencies/botconfig.json");
const fs = require('fs');
const Discord = require("discord.js");
const active = new Map();
const defaults = [];
const defaults_queue = [];
const bot = new Discord.Client({disableEveryone: true});

preInit(init);

start();

//METHODS BELOW
//-------------------------------------------------------------

//Loads default playlist data into defaults array
async function preInit(callback) {
  fs.readFile('./dependencies/defaults.txt', (err, data) => {
    data.toString().split('\n').forEach(line => {
      if(line.match('^(https?://www.youtu\.?be.com)')) {
        defaults.push(line);
      }
    });
    callback();
  });
}

//Initializes the bot
function init() {
  //Makes sure the defaults_queue is full before starting
  refillDefaults();

  //ON MESSAGE LISTENER
  bot.on("message", async message => {
    //Get bot prefix
    let prefix = botconfig.prefix;

    //Don't respond to self or dms or messages that aren't commands
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;
    if(!message.content.startsWith(prefix)) return;

    //Command Breakdown
    let messages = message.content.split(" ");
    let cmd = messages[0];
    let args = messages.slice(1);

    try {
      let ops = {
        ownerID: "501826669645004800",
        active: active,
        default: {
          queue: defaults_queue,
          refill: refillDefaults
        }
      };

      let commandFile = require("./commands/" + cmd.replace(prefix, "") + ".js");
      commandFile.run(bot, message, args, ops);
    } catch(e) {
      console.log(e);
    }
  });

  //AFTER LOGIN LISTENER
  bot.on("ready", async () => {
    console.log(bot.user.username + " is online!");
    bot.user.setActivity("in development", {type: "PLAYING"});
  });
}

//Starts the bot
function start() {
  //LOGIN BOT
  bot.login(botconfig.token);
}

//EXtraneous Methods
//-------------------------------------------------------------

//Refills the defaults queue
function refillDefaults() {
  for(var i = 0; i < defaults.length; i++) {
    defaults_queue.push(defaults[i]);
  }
  shuffle();
}

//Shuffles the defaults_queue array
function shuffle() {
  //TODO: Shuffle array
  let counter = defaults_queue.length

  while(counter > 0) {
    let index = Math.floor(Math.random() * counter);

    counter--;

    let temp =defaults_queue[counter];
    defaults_queue[counter] = defaults_queue[index]
    defaults_queue[index] = temp;
  }
}
