require("express")().listen(1343);//Darwinkle

const db = require("quick.db"); 
const discord = require("discord.js");//Darwinkle
const client = new discord.Client({ disableEveryone: true });//Darwinkle
client.login("TOKEN");
const fetch = require("node-fetch");
const fs = require('fs')//Darwinkle

setInterval(() => {
  var links = db.get("linkler");//Darwinkle
  if(!links) return 
  var linkA = links.map(c => c.url)//Darwinkle
  linkA.forEach(link => {
    try {
      fetch(link)
    } catch(e) { console.log("" + e) };
  })
  console.log("Başarıyla Pinglendi.")//Darwinkle
}, 60000)

client.on("ready", () => {
if(!Array.isArray(db.get("linkler"))) {//Darwinkle
db.set("linkler", [])
}//ukqzn
})

client.on("ready", () => {
  client.user.setActivity(`up!ekle | DM'den kullan!`)//ukqzn
  console.log(`Logined`)//Darwinkle
})


client.on("message", message => {
  if(message.author.bot) return;
  var spl = message.content.split(" ");//Darwinkle
  if(spl[0] == "up!ekle") {
  var link = spl[1]//ukqzn
  fetch(link).then(() => {//ukqzn
    let yardım = new Discord.RichEmbed()//Darwinkle
        .setAuthor(client.user.username)
        .setColor(0x6A3DB8)
        .setDescription("**✅ Başarılı! Projeniz artık 7/24!**")//Darwinkle
        .setFooter(`© ${client.user.username}`)
        .setTimestamp()
     message.channel.send(yardım).then(msg => msg.delete(60000)); //Darwinkle
    db.push("linkler", { url: link, owner: message.author.id})
  }).catch(e => {
    let yardım = new Discord.RichEmbed()//ukqzn
        .setAuthor(client.user.username)
        .setColor(0x6A3DB8)
        .setDescription("⛔ **Hata! Sadece düzgün url'ler ekleyebilirsiniz.**")//Darwinkle
        .setFooter(`© ${client.user.username}`)
        .setTimestamp()
   return message.channel.send(yardım).then(msg => msg.delete(60000)); //Darwinkle
  })//ukqzn
  }
})


client.on("message", message => {//Darwinkle
  if(message.author.bot) return;
  var spl = message.content.split(" ");//Darwinkle
  if(spl[0] == "up!botsay") {//Darwinkle
  var link = spl[1]
 message.channel.send(`**${db.get("linkler").length} / 1000**`)//Darwinkle
}})



const Discord = require('discord.js');

client.on("message", message => {
  if(message.author.bot) return;
    var spl = message.content.split(" ");//Darwinkle
  if(spl[0] == "up!yardım") {
let embed = new Discord.RichEmbed()//Darwinkle
.setColor('#070706')
.addField(`Botu Davet Etmek için Tıkla! = botun davet linkini yaz`, `Botu Sunucunuza Eklerseniz Büyük Destek Olursunuz!`)
.setDescription(`**Uptime komudunu kullandıktan sonra sisteme eklenmesi için 3-5 dk bekleyin.**

 🌙 **up!yardım** : Botun yardım menüsünü açar.

 🔋 **up!ekle <link>** : Eklediğiniz proje linkini 7/24 açık yapar.

 ⚡ **up!botsay** : Bot'umuzla uptime olan proje sayısını gösterir.

`)
.setAuthor(`UptimeBOT | Yardım Menüsü`, client.user.avatarURL)
.setFooter(`UptimeBOT | Botun Kodlayıcıları = Darwinkle`)//Darwinkle
.setImage(`https://cdn.discordapp.com/attachments/741014134576906332/741980222101913600/unknown.png`)
return message.channel.send(embed);//Darwinkle
    }
  
  })
  const log = message => {//Darwinkle
  console.log(`${message}`);
}
//coded by Darwinkle
  

  