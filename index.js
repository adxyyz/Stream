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
    .setState('Gym 24/7')
    .setName('adxyy')
    .setDetails(`dead [${formatTime()}]`)
    .setStartTimestamp(Date.now())
 .setAssetsLargeImage('https://cdn.discordapp.com/attachments/705742852402970686/1203489898720399430/0c904f520b159d4e6ee89fa52d705079.jpg?ex=65d1484f&is=65bed34f&hm=bb9ebb01229aa94fb3fdb4aae84ce913cb96dd7a2eba0730b5fc7c4e5bc55889&') //You can put links in tenor or discord and etc.
    .setAssetsLargeText('Boring') //Text when you hover the Large image
    .setAssetsSmallImage('https://cdn.discordapp.com/attachments/705742852402970686/1203496216214642709/c131c5fee6b68f3ea06331381cd50fe6.jpg?ex=65d14e31&is=65bed931&hm=1b13ff3830c81f81e1726a8eac0132f9f7c6b689804f973670f34c81b167ae3e&') //You can put links in tenor or discord and etc.
    .setAssetsSmallText('Tomorrow...') //Text when you hover the Small image
    .addButton('Watch me', 'https://twitch.tv/adxyzz')
    .addButton('Pls follow me', 'https://twitch.tv/adxyzz');

  client.user.setActivity(r);
  client.user.setPresence({ status: "online" }); //dnd, online, idle, offline

  let prevTime = null;
  setInterval(() => {
    const newTime = formatTime();
    if (newTime !== prevTime) {
      const newDetails = `dead[${newTime}]`;
      r.setDetails(newDetails);
      client.user.setActivity(r);
      prevTime = newTime;
    }
  }, 1000); // Update every second
});

const mySecret = process.env['TOKEN'];
client.login(mySecret);
