const { Collection, MessageAttachment, MessageEmbed, Message, ReactionEmoji } = require("discord.js")
const settings = require("./ayarlar.json");

/**
 * Bir minimum ve maximum değer arası sayı seçin (Min, Max dahil).
 * @param {number} Minimum Minimum Değer
 * @param {number} Maximum Maximum Değer
 * @returns {number} Girilen sayılar arası rastgele bir değer döndürür.
 */
function randomSayi(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


/**
 * Güzel bir renk için fonksiyon. 0 rastgele renk döndürür. Yeşil için 1, Kırmızı için 2.
 * @param {number} Renk 0 ila 10 arası bir sayı.
 * @returns {string} Bir hex renk kodu döndürür.
 */
function renk(color = 0) {
    let ozzydex = 0;
    if (color > 0) ozzydex = color - 1;
    if (color < 0) ozzydex = randomSayi(0, 9);
    if (color == 0) ozzydex = randomSayi(0, 9);
    if (color > 10) ozzydex = randomSayi(0, 9);
    const renkler = ["#88B04B", "#FF6F61", "#6B5B95", "##88B04B", "#B565A7", "#009B77", "#939597", "#FFA500", "#B89B72", "#6A2E2A"];
    return renkler[ozzydex];
}

async function rolVer(memberID, rolID) {
    if (Array.isArray(rolID) == false) rolID = [rolID];
    const guild = client.guilds.cache.get(settings.guildSettings.guildID) || client.guilds.cache.first();
    if (!guild) return console.log(`Guild ID bulunamadı! Lütfen ayarlar dosyanızı düzgün doldurun.`);
    let member = await guild.members.cache.get(memberID);
    rolID.forEach(async(ozzy, index) => {
        setTimeout(async() => {
            await member.roles.add(ozzy).catch(shinoa => console.log(`Rol Verme Hatası: ${shinoa}`))
        }, 3000 * index)
    });
};

async function rolAl(memberID, rolID) {
    if (Array.isArray(rolID) == false) rolID = [rolID];
    const guild = client.guilds.cache.get(settings.guildSettings.guildID) || client.guilds.cache.first();
    if (!guild) return console.log(`Guild ID bulunamadı! Lütfen ayarlar dosyanızı düzgün doldurun.`);
    let member = await guild.members.cache.get(memberID);
    rolID.forEach(async(ozzy, index) => {
        setTimeout(async() => {
            await member.roles.remove(ozzy).catch(shinoa => console.log(`Rol Vermelma Hatası: ${shinoa}`))
        }, 3000 * index)
    });
};



module.exports.randomSayi = randomSayi;
module.exports.renk = renk;
module.exports.rolVer = rolVer;
module.exports.rolAl = rolAl;
