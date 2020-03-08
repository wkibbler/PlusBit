import '../shim'
var lib = require('plusbit-js')
var bigi = require('bigi')

export default function(hash){
    var d = bigi.fromBuffer(hash + 'bylibtech')
    var l = bigi.fromBuffer(hash + 'libbyib')
    var BitcoinKeyPair = new lib.ECPair(d, null, {network: lib.networks.bitcoin});
    var LICcoinKeyPair = new lib.ECPair(l, null, {network: lib.networks.bitcoin})
    var ZcashKeyPair = new lib.ECPair(d, null, {network: lib.networks.zcash})
    var safeKeyPair = new lib.ECPair(d, null, {network: lib.networks.SAFE})
    return {
        BTCaddress: BitcoinKeyPair.getAddress(),
        BTCprivatekey: BitcoinKeyPair.toWIF(),
        ILCaddress: LICcoinKeyPair.getAddress(),
        ILCprivatekey: LICcoinKeyPair.toWIF(),
        ZELaddress: ZcashKeyPair.getAddress(),
        ZELprivatekey: ZcashKeyPair.toWIF(),
        SAFEaddress: safeKeyPair.getAddress(),
        SAFEprivatekey: safeKeyPair.toWIF()
    }
}