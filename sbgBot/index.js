/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />
export default "Nothing is here";
import commandQueue from 'soopyAddons/sbgBot/command.js';

new Thread(() => {
    let res = JSON.parse(FileLib.getUrlContent("http://soopymc.my.to/api/sbgBot/getIsBotUser.json?key=lkRFxoMYwrkgovPRn2zt&uuid=" + Player.getUUID().toString()))
    if (res.success) {
        ChatLib.chat("Hosting guild chat bot...")

        register("chat", (player, message) => {
            if (message.substr(0, 1) !== "-" && message.substr(0, 1) !== "/") { return }
            player = player.replace(/(\[[MVIP&0123456789ABCDEFLMNOabcdeflmnor\+]+\])+? /g, "").replace(/\[[A-z]*\]/g, "").replace(/(&[0123456789ABCDEFLMNOabcdeflmnor])|\[|\]| |\+/g, "")
            message = message.substr(1, message.length - 1)
            let args = message.split(" ")
            let command = args[0]

            ranCommand(player, command, args)

        }).setChatCriteria("&r&2Guild > ${player}&f: &r${message}&r")


        function ranCommand(player, command, args) {

            new Thread(() => {
                let res = JSON.parse(FileLib.getUrlContent("http://soopymc.my.to/api/sbgBot/shouldRunCommand.json?key=lkRFxoMYwrkgovPRn2zt&command=" + sha256(player + ": " + args.join(" "))))
                if (res.result) {
                    if (commandFunctions[command] == undefined) {
                        //commandQueue.push(spamBypass("/gc @" + player + ", " + command + " is not a valid command!"))
                    } else {
                        commandFunctions[command](player, command, args)
                        return;
                    }
                }
            }).start()
        }

        let commandFunctions = {}

        commandFunctions.stats = function (player, command, args) {
            commandQueue.push(spamBypass("/gc @" + player + ", the test worked!"))
        }
        commandFunctions.muteessasin = function (player, command, args) {
            commandQueue.push(spamBypass("/gc @" + player + ", you dont have permission to run this command!"))
        }
        commandFunctions.lbpos = function (player, command, args) {
            if (args[1] == undefined) {
                commandQueue.push(spamBypass("/gc @" + player + ", requires lb type!"))
            }

            let checkPerson = player
            let usesNumberPos = false

            let response = JSON.parse(FileLib.getUrlContent("http://soopymc.my.to/api/soopyAddons/guildData.json?key=lkRFxoMYwrkgovPRn2zt&guildName=" + "Skyblock gods".replace(/ /gi, "%20").toLowerCase()))

            if (args[2] !== undefined) {

                checkPerson = args[2]

                let validPlayer = false
                response.data.members.forEach((p) => {
                    if (!p.loaded) { return; }
                    if (p.name.toLowerCase() == checkPerson.toLowerCase()) {
                        validPlayer = true
                    }
                })

                if (!validPlayer) {
                    if (parseInt(checkPerson) < 126) {
                        usesNumberPos = true
                    } else {
                        commandQueue.push(spamBypass("/gc @" + player + ", the person " + checkPerson + " is not in the guild!"))
                        return;
                    }
                }

            }

            let unloadedMembs = 0;
            let totalMembs = 0;
            switch (args[1].toLowerCase()) {

                case "skill":
                    if (response.success) {
                        response.data.members.forEach((memb) => {
                            if (!memb.loaded) {
                                unloadedMembs++
                            }
                            totalMembs++
                        })
                        let membersSorted = response.data.members.sort((a, b) => { return a["skill-avg"] - b["skill-avg"] })

                        let pos = totalMembs
                        membersSorted.forEach((p) => {
                            if (!p.loaded) { return; }
                            if (usesNumberPos) {
                                if (pos == parseInt(checkPerson)) {
                                    commandQueue.push(spamBypass("/gc @" + player + ", " + (player.toLowerCase() == checkPerson.toLowerCase() ? "you are" : p.name + " is") + " #" + pos + " on the skill lb! (" + p["skill-avg"].toFixed(2) + ")"))
                                }
                            } else {
                                if (p.name.toLowerCase() == checkPerson.toLowerCase()) {
                                    commandQueue.push(spamBypass("/gc @" + player + ", " + (player.toLowerCase() == checkPerson.toLowerCase() ? "you are" : p.name + " is") + " #" + pos + " on the skill lb! (" + p["skill-avg"].toFixed(2) + ")"))
                                }
                            }
                            pos--
                        })
                    } else {
                        commandQueue.push(spamBypass("/gc @" + player + ", there was an error!"))
                    }
                    break;
                case "slayer":
                    if (response.success) {
                        response.data.members.forEach((memb) => {
                            if (!memb.loaded) {
                                unloadedMembs++
                            }
                            totalMembs++
                        })
                        let membersSorted = response.data.members.sort((a, b) => { return a["total-slayer"] - b["total-slayer"] })

                        let pos = totalMembs
                        membersSorted.forEach((p) => {
                            if (!p.loaded) { return; }
                            if (usesNumberPos) {
                                if (pos == parseInt(checkPerson)) {
                                    commandQueue.push(spamBypass("/gc @" + player + ", " + (player.toLowerCase() == checkPerson.toLowerCase() ? "you are" : p.name + " is") + " #" + pos + " on the slayer lb! (" + addNotation("oneLetters", p["total-slayer"]) + ")"))
                                }
                            } else {
                                if (p.name.toLowerCase() == checkPerson.toLowerCase()) {
                                    commandQueue.push(spamBypass("/gc @" + player + ", " + (player.toLowerCase() == checkPerson.toLowerCase() ? "you are" : p.name + " is") + " #" + pos + " on the slayer lb! (" + addNotation("oneLetters", p["total-slayer"]) + ")"))
                                }
                            }
                            pos--
                        })
                    } else {
                        commandQueue.push(spamBypass("/gc @" + player + ", there was an error!"))
                    }
                    break;
                case "dungeon":
                    if (response.success) {
                        response.data.members.forEach((memb) => {
                            if (!memb.loaded) {
                                unloadedMembs++
                            }
                            totalMembs++
                        })
                        let membersSorted = response.data.members.sort((a, b) => { return a["dungeon"] - b["dungeon"] })

                        let pos = totalMembs
                        membersSorted.forEach((p) => {
                            if (!p.loaded) { return; }
                            if (usesNumberPos) {
                                if (pos == parseInt(checkPerson)) {
                                    commandQueue.push(spamBypass("/gc @" + player + ", " + (player.toLowerCase() == checkPerson.toLowerCase() ? "you are" : p.name + " is") + " #" + pos + " on the catacombs lb! (" + p["dungeon"].toFixed(2) + ")"))
                                }
                            } else {
                                if (p.name.toLowerCase() == checkPerson.toLowerCase()) {
                                    commandQueue.push(spamBypass("/gc @" + player + ", " + (player.toLowerCase() == checkPerson.toLowerCase() ? "you are" : p.name + " is") + " #" + pos + " on the catacombs lb! (" + p["dungeon"].toFixed(2) + ")"))
                                }
                            }
                            pos--
                        })
                    } else {
                        commandQueue.push(spamBypass("/gc @" + player + ", there was an error!"))
                    }
                    break;
                case "catacombs":
                    if (response.success) {
                        response.data.members.forEach((memb) => {
                            if (!memb.loaded) {
                                unloadedMembs++
                            }
                            totalMembs++
                        })
                        let membersSorted = response.data.members.sort((a, b) => { return a["dungeon"] - b["dungeon"] })

                        let pos = totalMembs
                        membersSorted.forEach((p) => {
                            if (!p.loaded) { return; }
                            if (usesNumberPos) {
                                if (pos == parseInt(checkPerson)) {
                                    commandQueue.push(spamBypass("/gc @" + player + ", " + (player.toLowerCase() == checkPerson.toLowerCase() ? "you are" : p.name + " is") + " #" + pos + " on the catacombs lb! (" + p["dungeon"].toFixed(2) + ")"))
                                }
                            } else {
                                if (p.name.toLowerCase() == checkPerson.toLowerCase()) {
                                    commandQueue.push(spamBypass("/gc @" + player + ", " + (player.toLowerCase() == checkPerson.toLowerCase() ? "you are" : p.name + " is") + " #" + pos + " on the catacombs lb! (" + p["dungeon"].toFixed(2) + ")"))
                                }
                            }
                            pos--
                        })
                    } else {
                        commandQueue.push(spamBypass("/gc @" + player + ", there was an error!"))
                    }
                    break;
            }
        }




        const chars = [
            "⭍",
            "ࠀ"
        ]
        const spamBypass = message => {
            for (let i = 0; i < (256 - message.length); i++) {
                let char = chars[Math.floor(Math.random() * chars.length)];
                message += char;
            }
            return message
        }
        function addNotation(type, value) {
            let returnVal = value;
            let notList = [];
            if (type === "shortScale") {
                //notation type
                //do notation stuff here
                notList = [
                    " Thousand",
                    " Million",
                    " Billion",
                    " Trillion",
                    " Quadrillion",
                    " Quintillion"
                ];
            }

            if (type === "oneLetters") {
                notList = [" K", " M", " B", " T"];
            }

            let checkNum = 1000;

            if (type !== "none" && type !== "commas") {
                let notValue = notList[notList.length - 1];
                for (let u = notList.length; u >= 1; u--) {
                    notValue = notList.shift();
                    for (let o = 3; o >= 1; o--) {
                        if (value >= checkNum) {
                            returnVal = value / (checkNum / 100);
                            returnVal = Math.floor(returnVal);
                            returnVal = (returnVal / Math.pow(10, o)) * 10;
                            returnVal = +returnVal.toFixed(o - 1) + notValue;
                        }
                        checkNum *= 10;
                    }
                }
            } else {
                returnVal = numberWithCommas(value.toFixed(0));
            }

            return returnVal;
        }

        function numberWithCommas(x) {
            if (x === undefined) { return "" }
            var parts = x.toString().split(".");
            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            return parts.join(".");
        }

        var sha256 = function a(b) { function c(a, b) { return a >>> b | a << 32 - b } for (var d, e, f = Math.pow, g = f(2, 32), h = "length", i = "", j = [], k = 8 * b[h], l = a.h = a.h || [], m = a.k = a.k || [], n = m[h], o = {}, p = 2; 64 > n; p++)if (!o[p]) { for (d = 0; 313 > d; d += p)o[d] = p; l[n] = f(p, .5) * g | 0, m[n++] = f(p, 1 / 3) * g | 0 } for (b += "\x80"; b[h] % 64 - 56;)b += "\x00"; for (d = 0; d < b[h]; d++) { if (e = b.charCodeAt(d), e >> 8) return; j[d >> 2] |= e << (3 - d) % 4 * 8 } for (j[j[h]] = k / g | 0, j[j[h]] = k, e = 0; e < j[h];) { var q = j.slice(e, e += 16), r = l; for (l = l.slice(0, 8), d = 0; 64 > d; d++) { var s = q[d - 15], t = q[d - 2], u = l[0], v = l[4], w = l[7] + (c(v, 6) ^ c(v, 11) ^ c(v, 25)) + (v & l[5] ^ ~v & l[6]) + m[d] + (q[d] = 16 > d ? q[d] : q[d - 16] + (c(s, 7) ^ c(s, 18) ^ s >>> 3) + q[d - 7] + (c(t, 17) ^ c(t, 19) ^ t >>> 10) | 0), x = (c(u, 2) ^ c(u, 13) ^ c(u, 22)) + (u & l[1] ^ u & l[2] ^ l[1] & l[2]); l = [w + x | 0].concat(l), l[4] = l[4] + w | 0 } for (d = 0; 8 > d; d++)l[d] = l[d] + r[d] | 0 } for (d = 0; 8 > d; d++)for (e = 3; e + 1; e--) { var y = l[d] >> 8 * e & 255; i += (16 > y ? 0 : "") + y.toString(16) } return i };
    }
}).start()
