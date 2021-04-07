const { MessageEmbed } = require('discord.js');
const ayarlar = require("../ayarlar.json");
const { rolVer, renk } = require('../functions');
exports.run = async(client, message, args) => {
    const guild = message.guild;
    const tik = "✅"
    const red = "❌"

    // Ozi Emb
    const oziemb = new MessageEmbed().setAuthor(guild.name, guild.iconURL({ dynamic: true })).setFooter("Shinoa 💛 Ozzy").setTimestamp()


    let kullanıcı = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    let vip = ayarlar.guildRoles.vipRole;
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`${red} Bu komutu kullanabilmek için \`Yönetici\` yetkisine sahip olmasınız.`);
    if (!kullanıcı) return message.channel.send(oziemb.setColor("RED").setDescription(`**${red} Lütfen VIP vermek istediğin kullanıcıyı etiketle veya ID'sini gir.**`)).then(x => x.delete({ timeout: 4000 }))
    rolVer(kullanıcı.id, vip);
    message.channel.send(oziemb.setColor(renk(0)).setDescription(`${tik} ${kullanıcı} **adlı kullanıcıya** <@&${vip}> **rolünü başarı ile verdim!**`))


};

exports.commandSettings = {
    name: "vip",
    aliases: ["elite"],
    guildOnly: true, // Sunucuda Çalışması için True dm de çalışması için False
    coolDown: 3000, //  1000 Salise 1 Saniye
    description: "Bir kullanıcıya VIP rolü verir."
}