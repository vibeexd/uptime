const Discord = require('discord.js')
const db = require('quick.db') 
const client = new Discord.Client({ disableEveryone: true })
const fetch = require('node-fetch')
const fs = require('fs')
require('express')().listen(1343)

const prefix = 'lg!'

setInterval(() => {
const Linkler = db.get('Linkler')
if(!Linkler) return;;
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

client.on('ready', () => {
client.user.setActivity(`${prefix}yardım | ${prefix}ekle`, { type: 'WATCHING' })
client.user.setStatus('dnd')
})

client.on('message', message => {
if(message.author.bot) return;
const args = message.content.split(' ')
if(args[0] == 'up!ekle') {
const link = args[1]
fetch(link).then(() => {
let yardım = new Discord.RichEmbed()
.setAuthor(client.user.username)
.setColor(0x6A3DB8)
.setDescription('**✅ Başarılı! Projeniz artık 7/24!**')
.setFooter(`© ${client.user.username}`)
.setTimestamp()
message.channel.send(yardım).then(msg => msg.delete(60000)) 
db.push('Linkler', { url: link, owner: message.author.id})
}).catch(e => {
let yardım = new Discord.RichEmbed()
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
const link = args[1]
 message.channel.send(`**${db.get('Linkler').length} / 1000**`)
}})

client.on('message', message => {
if(message.author.bot) return;
const args = message.content.split(' ')
if(args[0] == 'up!yardım') {
let embed = new Discord.RichEmbed()
.setColor('#070706')
.addField(`Botu Davet Etmek için Tıkla! = botun davet linkini yaz`, `Botu Sunucunuza Eklerseniz Büyük Destek Olursunuz!`)
.setDescription(`**Uptime komudunu kullandıktan sonra sisteme eklenmesi için 3-5 dk bekleyin.**

 🌙 **up!yardım** : Botun yardım menüsünü açar.

 🔋 **up!ekle <link>** : Eklediğiniz proje linkini 7/24 açık yapar.

 ⚡ **up!botsay** : Bot'umuzla uptime olan proje sayısını gösterir.

`)
.setAuthor(`UptimeBOT | Yardım Menüsü`, client.user.avatarURL)
.setFooter(`UptimeBOT | Botun Kodlayıcıları = Darwinkle`)
.setImage(`https://cdn.discordapp.com/attachments/741014134576906332/741980222101913600/unknown.png`)
message.channel.send(embed)
}

})
const log = message => {
console.log(`${message}`)
}
client.login('Njk5NjE2NTM2MjkzNTM5OTYx.XpW-rA.MlZE3IFfrdBHTmMOOagStUy80Cg')