import { Alert } from 'react-native'
import coinSelect from 'coinselect'
import lib from 'plusbit-js'
import axios from 'axios'

function getCoinData(sym, bls){
    if (sym == 'BTC'){
        return {
            balance: Number(bls.BTC.balance),
            explorer: 'https://insight.bitpay.com',
            network: lib.networks.bitcoin
        }
    } else if (sym == 'ILC'){
        return {
            balance: Number(bls.ILC.balance),
            explorer: 'https://ilcoinexplorer.com',
            network: lib.networks.bitcoin
        }
    } else if (sym == 'ZEL'){
        return {
            balance: Number(bls.ZEL.balance),
            explorer: 'https://explorer.zel.cash',
            network: lib.networks.zcash
        }
    } else if (sym == 'SAFE'){
      return {
          balance: Number(bls.SAFE.balance),
          explorer: 'https://explorer.safecoin.org',
          network: lib.networks.SAFE
      }
  }
}

export default function(to, amount, fee, from, priv, bls, coin, cb){
    if (to == '' || amount <= fee) { setTimeout(function(){ Alert.alert('Enter an address and amount greater than transaction fee'); }, 200); cb() } else {
      var coinData = getCoinData(coin, bls)
        if (coinData.balance <= amount + fee) { setTimeout(function(){ Alert.alert('Not enough funds'); }, 200); cb() } else {
            let totalSats = (amount * 100000000) + (fee * 100000000)
            let round = Math.ceil(totalSats)
            return fetch(`${coinData.explorer}/api/addr/${from}/utxo`).then((response) => response.json()).then((responseJson) => {

              //creating trasaction after receiving utxo data
              var targets = [{ address: 'moKyssgHDXPfgW7AmUgQADrhtYnJLWuTGu', satoshis: round }]
              var feeRate = 0;
              let { inputs, outputs, fee } = coinSelect(responseJson, targets, feeRate);
              var builder = new lib.TransactionBuilder(coinData.network);
              //zcash sapling support
              if (coin == "ZEL" || coin == 'SAFE'){
                builder.setVersion(lib.Transaction.ZCASH_SAPLING_VERSION);
                builder.setVersionGroupId(parseInt('0x892F2085', 16));
                console.log('test')
                axios.get(`${coinData.explorer}/api/status`).then(function (status) {
                  builder.setExpiryHeight(status.info.blocks + 100);
                }).catch(function (error) {
                  console.log(error);
                })
              }
              //getting signing key
              var key = lib.ECPair.fromWIF(priv, coinData.network);
              //adding inputs
              let values = new Array
              inputs.forEach(input => values.push(input.satoshis));
              const add = (a, b) => a + b;
              const sum = values.reduce(add)
              var changeAm = sum - round;
              inputs.forEach(input => builder.addInput(input.txid, input.vout));
              //adding outputs
              builder.addOutput(to, Math.ceil(amount * 100000000));
              builder.addOutput(from, changeAm);
              //Siging transaction
              if (coin == "ZEL" || coin == 'SAFE'){
                inputs.forEach((v,i) => {builder.sign(i, key, '', lib.Transaction.SIGHASH_SINGLE, sum)})
              } else {
                inputs.forEach((v,i) => {builder.sign(i, key)})
              }
              var txhex = builder.build().toHex();
              //broadcast transaction
              axios.post(`${coinData.explorer}/api/tx/send`, {rawtx: txhex})
              .then(function (response) {
                cb('sent')
                setTimeout(function(){
                    Alert.alert('Success')
                }, 200)
              })
              .catch(function (error) {
                console.log(error)
                cb()
                //Could be utxo issue
                setTimeout(function(){ Alert.alert('Error sending transaction', 'If you have just made a transaction that is currently unconfirmed please try again in a few minutes') }, 200)
              });

            }).catch((error) => {
              //this.setState({spinner: false, status: false})
              cb()
              setTimeout(() => {
               Alert.alert('Connection error')
             }, 200);
            })
        }
    }
}