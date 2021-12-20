/**
 * @name DiscordPGPChat
 * @author Justin Doan
 * @description Enables the ability to send messages encrypted with PGP.
 * @version 0.0.1
 * @website https://www.benmarlatt.com
 * @source https://github.com/JustinDoan/DiscordEncryptedChat
 */

 module.exports = class DiscordPGPChat {


  load() {

  } 

  start() {
      BdApi.Patcher.before(
          "patchersIdentifier", 
          BdApi.findModuleByProps("sendMessage"), 
          "sendMessage", 
          (_, data)=>{
            console.log(data)
            let message = data[1].content;

            data[1].content = message.replace("ben", "The Big Gay")
            // text.content = text.content.replace("ben", "the big gay")
          }
        )
  } 

  stop() {

  } 

  

}