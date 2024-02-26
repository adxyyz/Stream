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
 .setAssetsLargeImage('https://cdn.discordapp.com/attachments/721737755666808874/1211723149796966400/65e9d7d87cf76681ddfd56cdcab83c59.jpg?ex=65ef3c1f&is=65dcc71f&hm=616fcc06b81ba088d6f10e1e5847f09aaa5f8b8c6534589c8ef20861ce02f5b9&') //You can put links in tenor or discord and etc.
    .setAssetsLargeText('彼女はここにいない...') //Text when you hover the Large image
    .setAssetsSmallImage('https://cdn.discordapp.com/attachments/721737755666808874/1211723150249824296/a9d43ef7244fbc8654a2011f9226720f.jpg?ex=65ef3c1f&is=65dcc71f&hm=0683f5bc1cb6bf673fbd8557441d16125245a07833a24b846e9e06477d97a585&') //You can put links in tenor or discord and etc.
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
