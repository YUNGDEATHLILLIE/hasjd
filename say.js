const Discord = require('discord.js');
const ayarlar = require("../ayarlar.json");
const { renk } = require("../functions.js")
exports.run = async(client, message, args) => {
    const guild = message.guild;


    const tag = ayarlar.guildSettings.guildTag;
    const disc = ayarlar.guildSettings.guildDiscriminator;

    let members = guild.members.cache.size;
    let tagMembers = guild.members.cache.filter(x => x.user.username.toLowerCase().includes(tag)).size;
    let discMembers = guild.members.cache.filter(x => x.user.discriminator == disc).size;

    let onlineMembers = guild.members.cache.filter(member => member.presence.status != "offline").size;
    let voiceMembers = guild.members.cache.filter(m => m.voice.channel).size




    const tagBall = "●"

    let finalSent = "";
    disc != "0000" ? finalSent = `${tagBall} **Etiketimizde **\`${discMembers}\` **kullanıcı bulunmaktadır.**` : finalSent = "";


    const oziemb = new Discord.MessageEmbed()
        .setColor(renk(0))
        .setFooter(`${message.member.user.username} tarafından istendi.`, message.member.user.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        .setDescription(`
**${guild.name.toLocaleUpperCase("tr")} Sunucu Say!**\n
${tagBall} **Sunucumuzda **\`${members}\` **kullanıcı bulunmaktadır.**
${tagBall} **Bu üyelerden **\`${onlineMembers}\` **kullanıcı aktiftir.**
${tagBall} **Sesli kanallarımızda** \`${voiceMembers}\` **kullanıcı aktiftir**
${tagBall} **Tagımızda **\`${tagMembers}\` **kullanıcı bulunmaktadır.**
${finalSent}`)

    message.channel.send(oziemb)






}
exports.commandSettings = {
    name: "say",
    aliases: ["ekipsay"],
    guildOnly: true, // Sunucuda Çalışması için True dm de çalışması için False
    coolDown: 15000, //  1000 Salise 1 Saniye
    description: "Say komutu! Sunucu bilgilerini listeler"
}