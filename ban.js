const { MessageEmbed } = require('discord.js')
const ayarlar = require('../ayarlar.json');
const moment = require("moment")
const { rolVer, renk, rolAl } = require("../functions.js");
exports.run = async(client, message, args) => {
        const guild = message.member.guild
        const exec = message.member;
        moment.locale("tr");
        const shxozpa = new MessageEmbed().setAuthor(guild.name, guild.iconURL({ dynamic: true })).setFooter("Shinoa 💛 Ozzy").setTimestamp()

        if (!message.member.hasPermission("ADMINISTRATOR") && !message.member.roles.cache.has(ayarlar.guildRoles.banH)) return message.react("❌")
        let victim = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!victim) {
            message.channel.send(shxozpa.setColor(renk(2)).setDescription(`❌ Lütfen yasaklamak istediğin kişiyi etiketle veya idsini gir.`))
                .then(x => x.delete({ timeout: 3500 }));
            return message.react("❌")
        }
        if (exec.roles.highest.position <= victim.roles.highest.position) return message.channel.send(shxozpa.setColor(renk(2)).setDescription(`**❌ Kendinizden üst veya kendinizle aynı rütbede birini yasaklayamazsınız.**`)).then(x => x.delete({ timeout: 7000 }));
        if (!victim.bannable) return message.channel.send(`❌ **Botun üstünde olan biriyi yasaklayamam!**`).then(x => x.delete({ timeout: 6000 }));
        let neden = args.splice(1, 2).join(" ");
        if (!neden) {
            message.channel.send(shxozpa.setColor(renk(2)).setDescription(`Lütfen bir yasaklama sebebi gir.`))
                .then(x => x.delete({ timeout: 3500 }));
            return message.react("❌")
        }
        victim.send(shxozpa.setColor("RED").setDescription(`**${exec} tarafından \`${neden}\` sebebiyle ${guild.name} sunucusundan banlandın.**`)).catch(console.error);
        let banlog = guild.channels.cache.get(ayarlar.logChannels.banLog);
        let cezatarih = moment(message.createdAt).format("lll")
        message.channel.send(shxozpa.setColor("RED").setDescription(`**${victim}, ${exec} tarafından \`${neden}\` sebebiyle sunucumuzun sınırlarından kovuldu.**`)).then(x => x.react("✅")).catch(console.error)
        if (banlog) banlog.send(shxozpa.setColor("RED").setDescription(`**${victim} sunucumuz sınırlarından kovuldu!\n\n● Yasaklayan Yetkili: ${exec}\n● Yasaklama Nedeni: \`${neden}\`\n● Ceza Tarihi: \`${cezatarih}\`**`))
        guild.members.ban(victim.user, { reason: neden }).catch(x => console.log(`Yasaklama Hatası: ${x}`))
    } //1 sn


exports.commandSettings = {
    name: "ban",
    aliases: ["yasakla", "uçur"],
    guildOnly: true, // Sunucuda Çalışması için True dm de çalışması için False
    coolDown: 10000, //  1000 Salise 1 Saniye
    description: "Sunucudan Birini Banlar"
}
