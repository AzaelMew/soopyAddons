/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />
module.exports = {};

let commandQueue = []
let lastTime = 0

register("tick", () => {
    if (commandQueue.length > 0) {
        if (new Date().getTime() - lastTime > 500) {
            lastTime = new Date().getTime()

            ChatLib.say(commandQueue.pop())
        }
    }
})

export default commandQueue;