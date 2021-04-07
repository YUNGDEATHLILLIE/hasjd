// Bu Altyapı Ozzy#1883 ve Shinoa#0854 Tarafından Discord.js Topluluğu için geliştirilmiştir.
// ISC lisansı Paradox © 2020 altında olan bu altyapının her tür paylaşımı, satımı, ve istediğiniz şekilde düzenlenimi serbesttir.

/*******************************************************
 * Üst kalite, Ses botları için Shinoa#0854'e Public Botları için Ozzy#1883'e ulaşabilirsiniz.
 ********************************************************/

//Module Init
const { MessageEmbed, MessageAttachment, Client, Collection } = require('discord.js');
const fs = require('fs');
const ms = require('ms');
const moment = require('moment');

//Ayar Init
const settings = require('./ayarlar.json');
const client = new Client({ fetchAllMembers: true }); // Bütün Üyeleri Çekmesi İçin Members Intenti açmayı unutmayın.
global.client = client;
//Command Handler
client.commands = new Collection();
client.aliases = new Collection();
fs.readdir("./Commands/", (err, Ozzy) => {
    if (err) return console.error(err);
    Ozzy = Ozzy.filter(shinoa => shinoa.endsWith('.js'));
    if (Ozzy.length == 0) return;
    console.log(`----------------${Ozzy.length} Komut Yüklemeye Geçiliyor ----------------`)
    Ozzy.forEach(shinoa => {
        let page = require(`./Commands/${shinoa}`);
        if (!page.commandSettings) return console.log(`Bir komutun commandSettings'i doğru ayarlanmadığı için yüklenemedi.`);
        client.commands.set(page.commandSettings.name, page);
        console.log(`====> ${page.commandSettings.name} isimli komut yüklendi.`);
        if (page.commandSettings.aliases.length > 0) {
            page.commandSettings.aliases.forEach(prx => {
                client.aliases.set(prx, page.commandSettings.name);
            });
        };
    });
});
//Event Handler
fs.readdir("./Events/", (err, Shinoa) => {
    if (err) return console.error(err);
    Shinoa = Shinoa.filter(ozzy => ozzy.endsWith(".js"));
    if (Shinoa.length == 0) return;
    console.log(`-----------------${Shinoa.length} Eventlere Yüklemeye Geçiliyor ----------------`)

    Shinoa.forEach(ozzy => {
        let page = require(`./Events/${ozzy}`);
        if (!page.reqEv) return console.log(`Bir event'in reqEv kısmı doğru bir şekilde ayarlanmadığı için yüklenemedi.`);
        if (page.reqEv.isim) console.log(`====> ${page.reqEv.isim} isimli event yüklendi.`);
        client.on(page.reqEv.event, page);
    });
});




client.login(settings.botSettings.botToken).then(x => console.log(`Bot başarıyla giriş yaptı!`)).catch(err => console.log(`Bot giriş hatası! Yanlış token olabilir: ${err}`));
