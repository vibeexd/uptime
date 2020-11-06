const Discord = require('discord.js')
const db = require('quick.db') 
const client = new Discord.Client({ disableEveryone: true })
const fetch = require('node-fetch')
const fs = require('fs')
require('express')().listen(1343)

const prefix = 'lg!'

setInterval(() => {
const Linkler = db.get('Linkler')
if(!Linkler) return;
const Aventadoria = Linkler.map(Revenge => Revenge.url)
Aventadoria.forEach(Link => {
try {
fetch(Link)
} catch(e) {
console.error(e)
}
})
console.log('Başarıyla Pinglendi.')
}, 60000)

client.on('ready', () => {
if(!Array.isArray(db.get('Linkler'))) {
db.set('Linkler', [])
}
})
client.on("message", async message => {
  if(message.author.bot) return;
  var Split = message.content.split(" ")
  if(Split[0] == prefix+'ekle') {
  var Link = Split[1]
  fetch(Link).then(() => {
    if(db.get("Linkler").map(Revenge => Revenge.url).includes(Link)) return message.channel.send("Such a Link is Already on My System")
    message.channel.send("The post was successfully added.")
    db.push("Linkler", { url: Link, owner: message.author.id})
    db.add(`Sahiplik_${message.author.id}`,1)
    db.add(`Proje`,1)
  }).catch(e => { message.channel.send("Error: " + e) })
  }
  if(Split[0] == "ur!say") {
  message.channel.send(new Discord.RichEmbed().setColor('BLUE').setDescription(`${db.get(`Proje`)} Proje İçinden ${db.fetch(`Sahiplik_${message.author.id}`) || '0'} Tanesi Senin!`).setThumbnail(message.author.avatarURL))
  }
})

client.on('ready', () => {
client.user.setActivity(`${prefix}yardım | ${prefix}ekle`, { type: 'WATCHING' })
//client.user.setStatus('dnd')
})

client.on('message', message => {
if(message.author.bot) return;
const args = message.content.split(' ')
if(args[0] == prefix+'ekle') {
const Link = args[1]
fetch(Link).then(() => {
const Ekledik = new Discord.RichEmbed()
.setColor(0x6A3DB8)
.setDescription(`
==================================
**Yazdığınız URL Başarıyla Eklendi.** ✅
==================================
`)
.setFooter(`© ${client.user.username}`)
.setTimestamp()
.setImage('https://cdn.glitch.com/0c2108ed-d2bd-4fdd-809c-8941e12c7c68%2Fstandard.gif?v=1601056779085')
message.channel.send(Ekledik).then(msg => msg.delete(60000)) 
db.push('Linkler', { url: Link, Owner: message.author.id})
}).catch(Error => {
const yardım = new Discord.RichEmbed()
.setAuthor(client.user.username)
.setColor(0x6A3DB8)
.setDescription('⛔ **Hata! Sadece düzgün urller ekleyebilirsiniz.**')
.setFooter(`© ${client.user.username}`)
.setTimestamp()
 return; message.channel.send(yardım).then(msg => msg.delete(60000)) 
})
}
})


client.on('message', message => {
if(message.author.bot) return;
const args = message.content.split(' ')
if(args[0] == 'up!botsay') {
const Link = args[1]
 message.channel.send(`**${db.get('Linkler').length} / 1000**`)
}})

client.on('message', message => {
if(message.author.bot) return;
const args = message.content.split(' ')
if(args[0] == 'up!yardım') {
const embed = new Discord.RichEmbed()
.setColor('#070706')
.addField(`Botu Davet Etmek için Tıkla! = botun davet Linkini yaz`, `Botu Sunucunuza Eklerseniz Büyük Destek Olursunuz!`)
.setDescription(`**Uptime komudunu kullandıktan sonra sisteme eklenmesi için 3-5 dk bekleyin.**

 🌙 **up!yardım** : Botun yardım menüsünü açar.

 🔋 **up!ekle <Link>** : Eklediğiniz proje Linkini 7/24 açık yapar.

 ⚡ **up!botsay** : Bot'umuzla uptime olan proje sayısını gösterir.

`)
.setAuthor(`UptimeBOT | Yardım Menüsü`, client.user.avatarURL)
.setFooter(`UptimeBOT | Botun Kodlayıcıları = Darwinkle`)
.setImage(`https://cdn.discordapp.com/attachments/741014134576906332/741980222101913600/unknown.png`)
message.channel.send(embed)
}

})
client.on("message", async message => {

  if(!message.content.startsWith("!eval")) return;
  if(!["675593025468235806","sahipıd"].includes(message.author.id)) return;
  var args = message.content.split("!eval")[1]
  if(!args) return message.channel.send(":warning: | Kod?")

const code = args

function clean(text) {
if (typeof text !== 'string')
text = require('util').inspect(text, { depth: 3 })
text = text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203))
return text;
};

var evalEmbed = ""
try {
var evaled = await clean(await eval(await code));
if (evaled.constructor.name === 'Promise') evalEmbed = `\`\`\`\n${evaled}\n\`\`\``
else evalEmbed = `\`\`\`js\n${evaled}\n\`\`\``

if(evaled.length < 1900) { 
message.channel.send(`\`\`\`js\n${evaled}\`\`\``);
} else {
var hast = await require("hastebin-gen")(evaled, { url: "https://hasteb.in" } )
message.channel.send(hast)
}
} catch (err) {
message.channel.send(`\`\`\`js\n${err}\n\`\`\``);
}})

const Log = message => {
console.log(`${message}`)
}
client.login('Njk5NjE2NTM2MjkzNTM5OTYx.XpW-rA.MlZE3IFfrdBHTmMOOagStUy80Cg')