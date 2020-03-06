import '../shim'
var lib = require('genesis-js')
var bigi = require('bigi')

export default function(hash){
    var d = bigi.fromBuffer(hash + 'bylibtech')
    var BitcoinKeyPair = new lib.ECPair(d, null, {network: lib.networks.bitcoin});
    var ZcashKeyPair = new lib.ECPair(d, null, {network: lib.networks.zcash})
    var safeKeyPair = new lib.ECPair(d, null, {network: lib.networks.SAFE})
    console.log(safeKeyPair.getAddress())
    return {
        BTCaddress: BitcoinKeyPair.getAddress(),
        BTCprivatekey: BitcoinKeyPair.toWIF(),
        ILCaddress: BitcoinKeyPair.getAddress(),
        ILCprivatekey: BitcoinKeyPair.toWIF(),
        ZELaddress: ZcashKeyPair.getAddress(),
        ZELprivatekey: ZcashKeyPair.toWIF(),
        SAFEaddress: safeKeyPair.getAddress(),
        SAFEprivatekey: safeKeyPair.toWIF()
    }
}