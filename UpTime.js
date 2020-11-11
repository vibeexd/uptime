const Discord = require('discord.js')
const db = require('quick.db') 
const client = new Discord.Client({ disableEveryone: true })
const fetch = require('node-fetch')
const fs = require('fs')
require('express')().listen(1343)
const moment = require('moment')
require('moment-duration-format')
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
console.log(`${client.user.username} | ${db.get('Proje') || 1} Proje Hostandı`)
}, 60000)

client.on('ready', () => {
console.log(`${client.user.username} Aktif!`)
if(!Array.isArray(db.get('Linkler'))) {
db.set('Linkler', [])
}
})
client.on('message', async message => {
  if(message.author.bot) return;
  var Split = message.content.split(' ')


  if(Split[0] == prefix+'ekle') {
  var Link = Split[1]
  fetch(Link).then(() => {
    const Revenge = new Discord.RichEmbed()
    .setColor('RED')
    .setDescription(`
    **==================================**
    **Link Sistemde Zaten Bulunuyor. ❌** 
    ==================================
    `)
    .setTimestamp()
    .setThumbnail(message.author.avatarURL)
    if(db.get('Linkler').map(Revenge => Revenge.url).includes(Link)) return message.channel.send(Revenge)
    const Emrecan = new Discord.RichEmbed()
    .setColor('GREEN')
    .setThumbnail(message.author.avatarURL)
    .setDescription(`
    **==================================**
    **Yazdığınız URL Başarıyla Eklendi. ✅**
    `)
    .addField(prefix+'linkler','Komutunu Kullanarak Ekledigin Linklere Erisebilirsin')
    .setTimestamp()
    .setImage('https://cdn.glitch.com/0c2108ed-d2bd-4fdd-809c-8941e12c7c68%2Fstandard.gif?v=1601056779085')
    message.channel.send(Emrecan)
    db.push('Linkler', { url: Link, owner: message.author.id})
    db.add(`Sahiplik_${message.author.id}`,1)
    db.add(`Proje`,1)


  }).catch(Hata => {
  const UpTime = new Discord.RichEmbed()
  .setColor('RED')
  .setDescription(`
  **==================================**
  **Hata: ${Hata} ❌**

  **Lutfen Bir URL Girin**
  ==================================
  `)
  .setImage('https://media.discordapp.net/attachments/748517679119335424/748562753253408920/IMG_20200827_192051.jpg?width=436&height=269')
  .setTimestamp()
  .setThumbnail(message.author.avatarURL)
  message.channel.send(UpTime)
  })
  }

  if(Split[0] == prefix+'davet') {
  const Revo = new Discord.RichEmbed()
  .setColor('#20aaba')
  .setDescription(`
  **==================================
Beni Sunucuna Eklemek Istemen Beni Sevindiriyor Hemen Altta Linkimi Bula Bilirsin Sen Olmassan 1 kisi eksik

[Ekleme Linkim](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot)

[Destek Sunucum](https://discord.gg/RgUhejb)

[Oy Vermeyi Unutma](https://top.gg/bot/${client.user.id}/vote)
==================================
**`)
  .setThumbnail(message.author.avatarURL)
  .setImage('https://cdn.glitch.com/0c2108ed-d2bd-4fdd-809c-8941e12c7c68%2Fstandard.gif?v=1601056779085')
  message.channel.send(Revo)
  }

  if(Split[0] == prefix+'i') {
  const Istatistik = new Discord.RichEmbed()
  .setColor('#20aaba')
  .setThumbnail(message.author.avatarURL)
  .setTimestamp()
  .setDescription(`
**==================================**
**✅ » Isim -** __${client.user.username}__
**✅ » Kanal Sayısı -** __${client.channels.size}__
**✅ » Sunucu Sayısı -** __${client.guilds.size}__
**✅ » Kullanıcı Sayısı -** __${client.guilds.reduce((a,b) => a + b.memberCount,0).toLocaleString()}__
**✅ » Link Sayısı (\`Sıfırlandı\`)-** __${await db.fetch('Proje') || 1}__
**✅ » Premium Link Sayısı -** __31__
**✅ » Aktiflik Suresi -** __${moment.duration(client.uptime).format(" D [gün], H [saat], m [dakika], s [saniye]")}__
**==================================**`)
message.channel.send(Istatistik)
  }
  if(Split[0] == prefix+'istatistik') {
  const Istatistik = new Discord.RichEmbed()
  .setColor('#20aaba')
  .setThumbnail(message.author.avatarURL)
  .setTimestamp()
  .setDescription(`
**==================================**
**✅ » Isim -** __${client.user.username}__
**✅ » Kanal Sayısı -** __${client.channels.size}__
**✅ » Sunucu Sayısı -** __${client.guilds.size}__
**✅ » Kullanıcı Sayısı -** __${client.guilds.reduce((a,b) => a + b.memberCount,0).toLocaleString()}__
**✅ » Link Sayısı (\`Sıfırlandı\`)-** __${await db.fetch('Proje') || 1}__
**✅ » Premium Link Sayısı -** __31__
**✅ » Aktiflik Suresi -** __${moment.duration(client.uptime).format(" D [gün], H [saat], m [dakika], s [saniye]")}__
**==================================**`)
message.channel.send(Istatistik)
  }

  if(Split[0] == prefix+'s') {
  const Revoş = new Discord.RichEmbed()
  .setColor('#20aaba')
  .setThumbnail(message.author.avatarURL)
  .setTimestamp()
  .setDescription(`
  ==================================
**» Şuanda Toplam \`${db.get('Proje')}\` URL Uptime Ediliyor ✅ (Sıfırlandı)**

**» Bunlardan Sadece \`${db.fetch(`Sahiplik_${message.author.id}`) || null}\` Tanesi Senin ✅ (Sıfırlandı)**
==================================`)
  message.channel.send(Revoş)
  }
  if(Split[0] == prefix+'say') {
  const Revoş = new Discord.RichEmbed()
  .setColor('#20aaba')
  .setThumbnail(message.author.avatarURL)
  .setTimestamp()
  .setDescription(`
  ==================================
**» Şuanda Toplam \`${db.get('Proje')}\` URL Uptime Ediliyor ✅ (Sıfırlandı)**

**» Bunlardan Sadece \`${db.fetch(`Sahiplik_${message.author.id}`) || null}\` Tanesi Senin ✅ (Sıfırlandı)**
==================================`)
  message.channel.send(Revoş)
  }

  if(Split[0] == prefix+'yardım') {
  const RevengeNYKS = new Discord.RichEmbed()
  .setColor('#20aaba')
  .setThumbnail(message.author.avatarURL)
  .setTimestamp()
  .setAuthor(client.user.username,client.user.avatarURL)
  .setDescription(`
**Botumuz Uptime Ile Alakalı Bir Botdur**

» Prefixim: **${prefix}**
» Dil: **TR**
`)
  message.channel.send(RevengeNYKS)
  }
})

client.on('ready', () => {
client.user.setActivity(`${prefix}yardım | ${prefix}ekle`, { type: 'WATCHING' })
//client.user.setStatus('dnd')
})


const Log = message => {
console.log(`${message}`)
}
client.login('Njk5NjE2NTM2MjkzNTM5OTYx.XpW-rA.p4t6tXADxXX-gttRfhb8sKigfVY')