const ayarlar = require('../ayarlar.json');
const moment = require("moment")
const { rolVer, renk } = require("../functions.js");
const { MessageEmbed } = require('discord.js');
module.exports = async(member) => {
        //Guild init
        const guild = member.guild;
        moment.locale("tr");
        //Channel init
        const welcome = guild.channels.cache.get(ayarlar.logChannels.welcome);
        const otoRolLog = guild.channels.cache.get(ayarlar.logChannels.autoRoleLog);
        const suspLog = guild.channels.cache.get(ayarlar.logChannels.supheliLog);

        //Roles init
        const supheliRol = ayarlar.guildRoles.supheliRole;
        const autoRole = ayarlar.guildRoles.autoRole;
        //Embed Init
        let pdxemb = new MessageEmbed()
            .setFooter(`Aramıza hoş geldin ${member.user.tag}`, member.user.displayAvatarURL({ dynamic: true }))
            .setAuthor(guild.name, guild.iconURL({ dynamic: true }))

        let suphelilik = true;
        if ((Date.now() - member.user.createdAt) > (1000 * 60 * 60 * 24 * 7)) suphelilik = false; // 7 Gün! Değiştirebilirsniz

        let guildSize = guild.members.cache.size;

        if (suphelilik) {
            rolVer(member.id, supheliRol);
            if (suspLog) suspLog.send(pdxemb.setColor(renk(2)).setDescription(`**Sunucumuza ${member} katıldı. Hesabı \`7\` günden yeni olduğu için ona <@&${supheliRol}> verdim.**`))
        } else {
            rolVer(member.id, autoRole);
            if (otoRolLog) otoRolLog.send(pdxemb.setColor(renk(0)).setDescription(`**Sunucumuza ${member} katıldı. Ona rolünü verdim. Onunla beraber \`${guildSize}\` kişi olduk.**`))
        }
        setTimeout(async() => {
            let dort = "";
            if (!suphelilik) dort = `✅ Hesap Durumu: \`Güvenli\``;
            else dort = `❌ Hesap Durumu: \`Tehlikeli\``;
            let emoji = "●" //İsterseniz bir emojiyle değişin
            welcome.send(`**${emoji} ${guild.name}'a hoş geldin. ${member}, seninle beraber ${member.guild.members.cache.size} kişi olduk.\n\n${emoji} Kayıt odalarına giriş yaparak kaydını yaptırabilirsin.\n\n${emoji} Yetkili arkadaşlar sizinle ilgilenecektir.\n\n${emoji} Hesap Kuruluş Tarihi: \`${moment(member.user.createdAt).format("lll")}\`\n\n${dort}**`)
        }, 15)

    },

    module.exports.reqEv = {
        event: "guildMemberAdd",
        isim: "Otorol ve Hoş Geldin Mesaj Sistemi"
    };