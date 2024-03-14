const Discord = require('discord.js-selfbot-v13');
const client = new Discord.Client({
  readyStatus: false,
  checkUpdate: false
});

const keepAlive = require('./server.js');
keepAlive();

function formatTime() { //Credits to himika#0001 and never#0001
  const date = new Date();
  const options = {
    timeZone: 'Europe/Madrid', //https://www.zeitverschiebung.net/en/ and find your city and enter here
    hour12: true,
    hour: 'numeric',
    minute: 'numeric'
  };
  return new Intl.DateTimeFormat('en-US', options).format(date);
}

client.on('ready', async () => {
  console.clear();
  console.log(`${client.user.tag} - rich presence started!`);

  const r = new Discord.RichPresence()
    .setApplicationId('1125185075319951521')
    .setType('STREAMING')
    .setURL('https://twitch.tv/adxyzz') //Must be a youtube video link 
    .setState('DMs open!')
    .setName('adxyy')
    .setDetails(`Loyalty! [${formatTime()}]`)
    .setStartTimestamp(Date.now())
 .setAssetsLargeImage('https://cdn.discordapp.com/attachments/1216326102394339349/1217961423712420000/3e6bc14550d5dd192074b49257583911.jpg?ex=6605edf8&is=65f378f8&hm=828026740e5607c60d9fafd613e9a13d188632bb99dcff84830bd9fa34998c46&') //You can put links in tenor or discord and etc.
    .setAssetsLargeText('彼女はここにいない...') //Text when you hover the Large image
    .setAssetsSmallImage('https://cdn.discordapp.com/attachments/1216326102394339349/1217961423444115546/95224dec91a5b46301f4aae14dd87488.jpg?ex=6605edf7&is=65f378f7&hm=6bb85254cefb87d2b854c211378cdbf4bd937219ed55933fd1dff63c02e8a66c&') //You can put links in tenor or discord and etc.
    .setAssetsSmallText('Tomorrow...') //Text when you hover the Small image
    .addButton('Twitch!', 'https://twitch.tv/adxyzz')
    .addButton('Spotify!', 'https://open.spotify.com/user/qjjkf3wdib3agk1jv7nq5hgnr');

  client.user.setActivity(r);
  client.user.setPresence({ status: "online" }); //dnd, online, idle, offline

  let prevTime = null;
  setInterval(() => {
    const newTime = formatTime();
    if (newTime !== prevTime) {
      const newDetails = `Loyalty![${newTime}]`;
      r.setDetails(newDetails);
      client.user.setActivity(r);
      prevTime = newTime;
    }
  }, 1000); // Update every second
});

const mySecret = process.env['TOKEN'];
client.login(mySecret);
