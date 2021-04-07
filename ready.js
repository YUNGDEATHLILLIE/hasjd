const ayarlar = require('../ayarlar.json');
const moment = require("moment")

module.exports = async() => {
        console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] V12 Priv Altyapı!: Aktif, Komutlar ve Eventler Yüklendi!`);
        client.user.setPresence({ activity: { name: ayarlar.botSettings.botUser.botPresence, type: ayarlar.botSettings.botUser.botPresenceType }, status: ayarlar.botSettings.botUser.botStatus })
            .catch(console.error);
        if (ayarlar.botSettings.botSes && client.channels.cache.has(ayarlar.botSettings.botSes)) client.channels.cache.get(ayarlar.botSettings.botSes).join().catch(x => console.log(`Hata: ${x}`));

    },

    module.exports.reqEv = {
        event: "ready",
        isim: "Presence Ayari"
    };