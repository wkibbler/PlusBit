import '../shim'
var lib = require('genesis-js')
var bigi = require('bigi')

export default function(hash){
    var d = bigi.fromBuffer(hash + 'bylibtech')
    var BitcoinKeyPair = new lib.ECPair(d, null, {network: lib.networks.bitcoin});
    return {
        BTCaddress: BitcoinKeyPair.getAddress(),
        BTCprivatekey: BitcoinKeyPair.toWIF(),
        ILCaddress: BitcoinKeyPair.getAddress(),
        ILCprivatekey: BitcoinKeyPair.toWIF()
    }
}