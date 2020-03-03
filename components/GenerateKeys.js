import '../shim'
import Bitcoin from 'react-native-bitcoinjs-lib'

export default function(){
    const keypair = Bitcoin.ECPair.makeRandom()
console.log(keypair.getAddress())
}