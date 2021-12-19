import * as openpgp from 'openpgp';

module.exports = class DiscordPGPChat {
    async load() {
        BdApi.showConfirmationModal(
            "Testing",
            "This is a Test",
        )
        console.log('load')
        const { privateKey, publicKey, revocationCertificate } = await openpgp.generateKey({
            type: 'ecc', // Type of the key, defaults to ECC
            curve: 'curve25519', // ECC curve name, defaults to curve25519
            userIDs: [{ name: 'Jon Smith', email: 'jon@example.com' }], // you can pass multiple user IDs
            passphrase: 'super long and hard to guess secret', // protects the private key
            format: 'armored' // output key format, defaults to 'armored' (other options: 'binary' or 'object')
        });
        console.log(privateKey, publicKey)
    } 
    start() {
    } 
    stop() {
        console.log('stop')
    } 
}