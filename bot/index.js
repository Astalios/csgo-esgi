const discord = require('discord.js');
const bot = new discord.Client();
const curl = new (require( 'curl-request' ))();
var request = require('request');


bot.on('message', function (msg) {

    switch(msg.content) {
        case "!hugo":
            msg.reply("Hugo le plus beau et le plus fort");
          break;
        case "!esl":
            msg.reply("Lien du stream ESLCSGO(en): https://www.twitch.tv/esl_csgo");
            break;
        case "!eslfr":
            msg.reply("Lien du stream ESLCSGO(fr): https://www.twitch.tv/esl_csgo_fr");
            break;
        case "!dreamhack":
             msg.reply("Lien du stream DreamhackCSGO(en): https://www.twitch.tv/dreamhackcs");
            break;
        case "!dreamhackfr":
             msg.reply("Lien du stream DreamhackCSGO(fr): https://www.twitch.tv/dreamhackcsgo_fr");
            break;
        case "!srv":
             msg.reply("Lien du serveur ESGI CSGO (à copier/coller dans la console): ```connect 51.255.215.52:27130```");
            break;
        case "!srv2":
             msg.reply("Lien du serveur ESGI CSGO (à copier/coller dans la console): ```connect 5.135.100.71:27015;password esgi```");
            break;
        case "!retake":
             msg.reply("Lien du serveur retake (merci à Kelshyr) (à copier/coller dans la console): ```connect 54.37.198.38:27015;password 9713```");
            break;
        case "!HHKouille":
             msg.reply("Bot HHKouille à votre service : !srv, !srv2, !retake, !dreamhack, !dreamhackfr, !esl, !eslfr, !meteo nom_ville");
            break;
        default:
      }

      if (msg.content.indexOf("!meteo") == 0) {
        let ville = msg.content.split(" ")[1];
      request('https://api.openweathermap.org/data/2.5/weather?q='+ville+'&APPID=fb04da74a25be0449b77608bc29711b3', function (error, response, body) {
              console.log('error:', error); // Print the error if one occurred
              console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
              console.log(body); // Print the HTML for the Google homepage.
              let rep = body;
              let temp = rep.indexOf("temp");
              let result = parseInt(rep.charAt(temp+6) + rep.charAt(temp+7) + rep.charAt(temp+8), 10) - 273;
              result = Math.round(result*100)/100;
              if (isNaN(result)) msg.reply("Ville mal écrite ou inconnus :cry:");
              else msg.reply("Il fait : "+result+" °C à "+ville+" en ce moment");
            });
        }

        if (msg.content.indexOf("!player") == 0) {
          let playerName = msg.content.split(" ")[1];
          curl.setHeaders(["accept: application/json",
                            "Authorization: Bearer 67eb8a5c-0d59-4db9-80b8-7bf5f3e43d87"
                          ])
          .get("https://open.faceit.com/data/v4/players?nickname="+playerName+"&game=csgo")
          .then(({statusCode, body, headers}) => {
            player = JSON.parse(body);
            curl.setHeaders(["accept: application/json",
                              "Authorization: Bearer 67eb8a5c-0d59-4db9-80b8-7bf5f3e43d87"
                            ])
            .get("https://open.faceit.com/data/v4/players/"+player.player_id+"/stats/csgo")
            .then(({statusCode, body, headers}) => {
              stats = JSON.parse(body);

              let history = "";
              let historyArray = stats.lifetime["Recent Results"];
              for (var i = 4; i >= 0; i--) {
                if (historyArray[i] == "1") history = history+"Victoire";
                else history = history+"Defaite";

                if (i != 0) history = history+", ";
              }

                msg.reply(
                  "\n Lvl Faceit => "+player.games.csgo.skill_level
                  +"\n Elo => "+player.games.csgo.faceit_elo
                  +"\n Langue => "+player.settings.language
                  +"\n Nombres de parties => "+stats.lifetime["Matches"]
                  +"\n K/D ratio => "+stats.lifetime["Average K/D Ratio"]
                  +"\n % de HS => "+stats.lifetime["Average Headshots %"]+"%"
                  +"\n % de victoire => "+stats.lifetime["Win Rate %"]+"%"
                  +"\n Historique (+récente à -récente) => "+history
                  +"\n Lien du profil => "+player.faceit_url
                  +"\n"+player.avatar
                );
            })
            .catch((e) => {
                console.log(e);
            });
          })
          .catch((e) => {
              console.log(e);
          });
        }

        if (msg.content.indexOf("!game") == 0) {
          let playerName = msg.content.split(" ")[1];
          curl.setHeaders(["accept: application/json",
                            "Authorization: Bearer 67eb8a5c-0d59-4db9-80b8-7bf5f3e43d87"
                          ])
          .get("https://open.faceit.com/data/v4/players?nickname="+playerName+"&game=csgo")
          .then(({statusCode, body, headers}) => {
            player = JSON.parse(body);
            curl.setHeaders(["accept: application/json",
                              "Authorization: Bearer 67eb8a5c-0d59-4db9-80b8-7bf5f3e43d87"
                            ])
            .get("https://open.faceit.com/data/v4/players/"+player.player_id+"/history?game=csgo&offset=0&limit=1")
            .then(({statusCode, body, headers}) => {
              history = JSON.parse(body);
              history = history.items[0];
              if (history["status"] == "finisheddd") msg.reply("No game in progress")
              else {
                msg.reply(
                  "Equipe 1 :"
                  +"\n   "+history.teams.faction1.players[0].nickname+" => lvl "+history.teams.faction1.players[0].skill_level
                  +"\n   "+history.teams.faction1.players[1].nickname+" => lvl "+history.teams.faction1.players[1].skill_level
                  +"\n   "+history.teams.faction1.players[2].nickname+" => lvl "+history.teams.faction1.players[2].skill_level
                  +"\n   "+history.teams.faction1.players[3].nickname+" => lvl "+history.teams.faction1.players[3].skill_level
                  +"\n   "+history.teams.faction1.players[4].nickname+" => lvl "+history.teams.faction1.players[4].skill_level
                  +"\nEquipe 2 :"
                  +"\n   "+history.teams.faction2.players[0].nickname+" => lvl "+history.teams.faction2.players[0].skill_level
                  +"\n   "+history.teams.faction2.players[1].nickname+" => lvl "+history.teams.faction2.players[1].skill_level
                  +"\n   "+history.teams.faction2.players[2].nickname+" => lvl "+history.teams.faction2.players[2].skill_level
                  +"\n   "+history.teams.faction2.players[3].nickname+" => lvl "+history.teams.faction2.players[3].skill_level
                  +"\n   "+history.teams.faction2.players[4].nickname+" => lvl "+history.teams.faction2.players[4].skill_level
                );
              }
            })
            .catch((e) => {
                console.log(e);
            });
          })
          .catch((e) => {
              console.log(e);
          });
        }

})

bot.login('NTk1MzQyMTIxMDI5MDc0OTUw.XRplvw.GAZqaBPGNHFP7AhN3rmkayMbV94');
