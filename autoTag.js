const ayarlar = require('../ayarlar.json');
const moment = require("moment")
const { rolVer, renk } = require("../functions.js");
const { MessageEmbed } = require('discord.js');
module.exports = async(oldUser, newUser) => {
    const guild = client.guilds.cache.get(ayarlar.guildSettings.guildID) || client.guilds.cache.first();
    const member = guild.members.cache.get(newUser.id)

    const taglog = guild.channels.cache.get(ayarlar.logChannels.tagLog);
    const ailerol = ayarlar.guildRoles.tagRol;

    const tag = ayarlar.guildSettings.guildTag;
    const etiket = ayarlar.guildSettings.guildDiscriminator;

    const tik = "✅"
    const red = "❌"

    let oziemb = new Discord.MessageEmbed()
        .setAuthor(guild.name, guild.iconURL({ dynamic: true }))
        .setFooter(`${newUser.tag}, nasılsın?`, member.user.displayAvatarURL({ dynamic: true }))
        .setTimestamp()

    if ((oldUser.discriminator != etiket && !oldUser.username.includes(tag)) && (newUser.username.includes(tag) || newUser.discriminator == etiket)) {
        if (taglog) taglog.send(oziemb.setDescription(`${tik} ${member}, tagımızı alarak ailemize katıldı. Ona <@&${ailerol}> rolünü verdim.`).setColor(renk(1)))
        rolVer(member.id, ailerol);
    };

    if ((oldUser.discriminator == etiket || oldUser.username.includes(tag)) && (!newUser.username.includes(tag) && newUser.discriminator != etiket)) {
        if (taglog) taglog.send(oziemb.setDescription(`${red} ${member}, tagımızı bırakarak ailemizden ayrıldı. Ondan <@&${ailerol}> rolünü aldım.`).setColor(renk(2)))
        if (member.roles.cache.has(ailerol)) await member.roles.remove(ailerol).catch(x => console.log(`Rol alma hatası: ${x}`));
    }

}
module.exports.reqEv = {
    event: "userUpdate",
    isim: "Ototag ve OtoEtiket Sistemi"
};
