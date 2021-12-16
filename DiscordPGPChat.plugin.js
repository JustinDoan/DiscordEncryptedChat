/**
 * * @name DiscordPGPChat
 * @version 0.0.1
 * @description Enables the ability to send messages encrypted with PGP
 * @website www.benmarlatt.com
 * @author Justin Doan
 */
module.exports = class DiscordPGPChat {
    // Required Functions
    getName() {
        return "DiscordPGPChat";
    }
    getDescription() {
        return "Enables the ability to send messages encrypted with PGP";
    }
    getVersion() {
        return "0.0.1";
    }
    getAuthor() {
        return "Benjamin Marlatt & Justin Doan";
    }
    load() {
        BdApi.showConfirmationModal("Testing", "This is a Test");
    }
    start() {
        console.log('start');
    }
    stop() {
        console.log('stop');
    }
};
