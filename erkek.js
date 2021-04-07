const { MessageEmbed } = require('discord.js')
-const ayarlar = require('../ayarlar.json');
const { rolVer, renk, rolAl } = require("../functions.js");
exports.run = async(client, message, args) => {
    const guild = message.member.guild

    const shxozpa = new MessageEmbed().setAuthor(guild.name, guild.iconURL({ dynamic: true })).setFooter("Shinoa 💛 Ozzy").setTimestamp()

    if (!message.member.hasPermission("ADMINISTRATOR") && !message.member.roles.cache.has(ayarlar.guildRoles.registerH)) return message.react("❌")

    let victim = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!victim) {
        message.channel.send(shxozpa.setColor(renk(2)).setDescription(`Lütfen rol vermek istediğin kişiyi etiketle veya idsini gir.\nÖrnek: \`.erkek @Ozzy Ozzy\``))
            .then(x => x.delete({ timeout: 3500 }));
        return message.react("❌")
    }
    let isim = args.slice(1).join(" | ")
    if (isim) {
        isim = ayarlar.guildSettings.isimOncesiTag + " " + isim
        setTimeout(async() => {
            await victim.setNickname(isim).catch(err => console.log(`İsim değiştirme hatası!: ${err}`))
        }, 100)
    }
    rolVer(victim.id, ayarlar.guildRoles.erkekRoles);
    setTimeout(() => {
        rolAl(victim.id, ayarlar.guildRoles.autoRole)
    }, ayarlar.guildRoles.erkekRoles.length * 3001)

    if (!isim) isim = "Belirtilmemiş"
    message.channel.send(shxozpa.setColor(renk(0)).setDescription(`${victim} sunucumuza başarıyla <@&${ayarlar.guildRoles.erkekRoles[0]}> rolüyle, \`${isim}\` ismiyle kaydedildi.`))
    message.react("✅")
}


exports.commandSettings = {
    name: "erkek",
    aliases: ["e"],
    guildOnly: true, // Sunucuda Çalışması için True dm de çalışması için False
    coolDown: 3000, //  1000 Salise 1 Saniye
    description: "Sunucuya erkek olarak kaydeder"
}
