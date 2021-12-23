/**
 * @name DiscordPGP
 * @author BennyBenBen
 * @version 1.0.0
 * @description Adds a PGP encryption layer to discord chat
 */

 module.exports = (() => {
  const config = {info:{name:"DiscordPGP",authors:[{name:"benmarlatt",github_username:"benmarlatt",}],version:"1.0.0",description:"Adds a PGP encryption layer to discord chat",github:"https://github.com/JustinDoan/DiscordEncryptedChat/blob/master/DiscordPGPChat.plugin.js",github_raw:"https://raw.githubusercontent.com/JustinDoan/DiscordEncryptedChat/master/DiscordPGPChat.plugin.js"},changelog:[],main:"index.js"};

  return !global.ZeresPluginLibrary ? class {
      constructor() {this._config = config;}
      getName() {return config.info.name;}
      getAuthor() {return config.info.authors.map(a => a.name).join(", ");}
      getDescription() {return config.info.description;}
      getVersion() {return config.info.version;}
      load() {
          BdApi.showConfirmationModal("Library Missing", `The library plugin needed for ${config.info.name} is missing. Please click Download Now to install it.`, {
              confirmText: "Download Now",
              cancelText: "Cancel",
              onConfirm: () => {
                  require("request").get("https://rauenzi.github.io/BDPluginLibrary/release/0PluginLibrary.plugin.js", async (error, response, body) => {
                      if (error) return require("electron").shell.openExternal("https://betterdiscord.net/ghdl?url=https://raw.githubusercontent.com/rauenzi/BDPluginLibrary/master/release/0PluginLibrary.plugin.js");
                      await new Promise(r => require("fs").writeFile(require("path").join(BdApi.Plugins.folder, "0PluginLibrary.plugin.js"), body, r));
                  });
              }
          });
      }
      start() {}
      stop() {}
  } : (([Plugin, Api]) => {
      let encryptMessages = false
      const plugin = (Plugin, Api) => {
  const buttonHTML = `<div class="buttonContainer-28fw2U da-buttonContainer send-button">
                  <button aria-label="Send Message" tabindex="0" type="button" class="buttonWrapper-1ZmCpA da-buttonWrapper button-38aScr da-button lookBlank-3eh9lL colorBrand-3pXr91 grow-q77ONN da-grow noFocus-2C7BQj da-noFocus">
                    <div class="contents-18-Yxp da-contents button-3AYNKb da-button button-318s1X da-button">
                                          <svg id="lockedHTMLbutton" width="24" height="24" class="icon-1DeIlz" viewBox="0 0 24 24"><path class="path-1DeIlz" d="M17 11V7C17 4.243 14.756 2 12 2C9.242 2 7 4.243 7 7V11C5.897 11 5 11.896 5 13V20C5 21.103 5.897 22 7 22H17C18.103 22 19 21.103 19 20V13C19 11.896 18.103 11 17 11ZM12 18C11.172 18 10.5 17.328 10.5 16.5C10.5 15.672 11.172 15 12 15C12.828 15 13.5 15.672 13.5 16.5C13.5 17.328 12.828 18 12 18ZM15 11H9V7C9 5.346 10.346 4 12 4C13.654 4 15 5.346 15 7V11Z" aria-hidden="true"></path></svg>
                    </div>
                  </button>
                </div>`;

  const press = new KeyboardEvent("keydown", {key: "Enter", code: "Enter", which: 13, keyCode: 13, bubbles: true});
  Object.defineProperties(press, {keyCode: {value: 13}, which: {value: 13}});

  const {DiscordSelectors, PluginUtilities, DOMTools, Logger, ContextMenu} = Api;
  return class SendButton extends Plugin {
      
      onStart() {
          const form = document.querySelector("form");
          this.updateLockButton(encryptMessages)
          if (form) this.addLockButton(form);
      }
      
      onStop() {
          const button = document.querySelector(".send-button");
          if (button) button.remove();
          PluginUtilities.removeStyle(this.getName());
      }

  toggleEncryption() {
          encryptMessages = !encryptMessages
          if (encryptMessages) {
              this.enableEncryptionPatch()
          } else {
              this.disableEncryptionPatch()
          }
          this.updateLockButton(encryptMessages)
  }

      enableEncryptionPatch() {
          Logger.info("Enabling encryption patcher")
          BdApi.Patcher.before(
              "encryptionPatcher", 
              BdApi.findModuleByProps("sendMessage"), 
              "sendMessage", 
              (_, data)=>{
                let message = data[1].content
                data[1].content = message.replace("ben", "The Big Gay")
              }
            )
      }

      disableEncryptionPatch() {
          Logger.info("Disabling encryption patcher")
          BdApi.Patcher.unpatchAll("encryptionPatcher")
      }

      updateLockButton(locked) {
          if (locked) {
              BdApi.clearCSS("UnlockSVGColor")
              BdApi.injectCSS("LockSVGColor",`
                  path.path-1DeIlz {
                      fill: #3BA55C;
                  }
              `)
          } else {
              BdApi.clearCSS("LockSVGColor")
              BdApi.injectCSS("UnlockSVGColor",`
                  path.path-1DeIlz {
                      fill: #72767d;
                  }
              `)
          }
      }

      showContextMenu() {
          Logger.info("Opening context menu")

      }

      addLockButton(form) {
          if (form.querySelector(".send-button")) return;
          const button = DOMTools.createElement(buttonHTML);
          form.querySelector(DiscordSelectors.Textarea.buttons).append(button);
          button.addEventListener("click", () => {this.toggleEncryption()});
          button.addEventListener("contextmenu", () => {this.showContextMenu()});
      }

      observer(e) {
          if (!e.addedNodes.length || !e.addedNodes[0] || !e.addedNodes[0].querySelector) return;
          const form = e.addedNodes[0].querySelector(DiscordSelectors.Textarea.inner);
          if (form) this.addButton(form);
      }

  };
};
      return plugin(Plugin, Api);
  })(global.ZeresPluginLibrary.buildPlugin(config));
})();