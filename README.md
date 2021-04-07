# SHINOA#1004 VE OZZY#1883'IN EKİP PRİVİ BOT ALTYAPISI!

Bu altyapıdaki kodları dilediğiniz gibi kullanabilirsiniz, içinde elimden geldiğince kısa açıklamalarda yazdık bakıp öğrenebilirsiniz belki :)

## Kurulum

İlk olarak modülleri kuralım.

```js
npm i
```
Sonra ayarlar.json dosyamıza idleri dolduralım :)

```js
ayarlar.json
```

## Sıkça Sorulabilicek Sorular


### Kod Dosyalarını Nasıl Kurucam?

Alt Yapıyı indirelim, ondan sonra modülleri kurup ayarlar.json'u dolduralım ve hazırız :)

### Ücretsiz Bot Yapıyor Musunuz?

Hayır yapmıyoruz fakat konuşmak için bizi ekleyebilirsiniz.

### Sana bir sorum vardı?

Ozzy#1883(158288905244901376) ve Shinoa#0854(461212138346905600) Discord hesaplarımıza ulaşabilirsiniz, eğer ulaşamazsanız discord.gg/riverdale'e gelip yol sorabilirsiniz.

### Bir hata buldum?

Bize ulaşın, elimden geldiğince hızlı çözerim.

### Fonksiyonlar Dosyasındaki fonksiyonlar nelerdir?

```js
renk(number)
```
#### renk(sayi) => 0 sallama bir renk, 1 den 10 kadar sayılarsa 1 yeşil 2 kırmızı olmak üzere belirli renkler döndürür.

```js
rolVer(string, string/array)
```
#### rolVer(id, rolID veya rolIDListesi), bir üyeye API'yı dert etmeden rol vermeniz için fonksiyon.

```js
rolAl(string, string/array)
```
#### rolAl(id, rolID veya rolIDListesi), bir üyeden API'yı dert etmeden rol almanız için fonksiyon.

### Boş Komut Dosyası Örneği:
```js
const Discord = require('discord.js')
exports.run = async(client, message, args) => {

    message.channel.send("Bot Canlı!")
    //Kodunuz

}

exports.commandSettings = {
    name: "test",
    aliases: ["testkomutu"],
    guildOnly: true, // Sunucuda Çalışması için True dm de çalışması için False
    coolDown: 5000, //  1000 Salise 1 Saniye
    description: "Shinoa ve Oziden sevgilerle"
}
```
### Boş Event Dosyası Örneği
```js
const Discord = require("discord.js")
module.exports = async() => {
  //Kodunuz
},

module.exports.reqEv = {
    event: "event", // ready/guildMemberAdd/guildMemberRemove ve benzeri
    isim: "Test Eventi" //İstediğiniz bir isim
};

```
