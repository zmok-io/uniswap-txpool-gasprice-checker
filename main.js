var dotenv = require("dotenv").config({
  path: ".env"
})

var argv = require('minimist')(process.argv.slice(2));

var log = require('console-log-level')({
  level: "DEBUG"
})

var async = require("async");
const express = require('express');
const bodyParser = require('body-parser');
const jayson = require('jayson');

const BigNumber = require('bignumber.js');
const MapExpire = require("@anthonyalbertyn/map-expire");

var web3 = require("web3");

const {
  JsonRpc
} = require("node-jsonrpc-client");

const Font = require('ascii-art-font');
Font.fontPath = 'fonts/';


/*
const redisTxpoolClient = redis.createClient({
  host: constants.REDIS_HOST,
  port: constants.REDIS_PORT,
  password: constants.REDIS_PASS,
  db: constants.REDIS_TXPOOL_DB
});
redisTxpoolClient.on('error', function(err) {
  log.error(err)
});
*/

let filteredHosts = {}

let alreadyProcessHost = new Map()

let alreadyProcessBlock = new Map()
var latestProcessedBlockNumber = -1

var alreadyProcessing = false

const options = {
  // capacity: 100,
  // in millisecond, default expiration time
  duration: 1 * 60 * 60 * 1000 // 1h
}

const myOptionalCallback = (key, value) => {
  // do something with the key and value
  // after it has automatically expired
  // and removed from the Map
};

const txAll = new MapExpire(1 * 60 * 60 * 1000, myOptionalCallback)



function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function isEmpty(str) {
  return (!str || str.length === 0);
}


function callWithTimeout(callback, timeoutInMillis) {
  return Promise.race([
    callback,
    new Promise(function(resolve, reject) {
      setTimeout(function() {
        reject("Timed out.");
      }, timeoutInMillis);
    }).catch((error) => {
      log.error("error: " + error)
    })
  ]);
}

function getPriceInGwei(price) {
  return web3.utils.fromWei(price.toString(), 'gwei')
}

function getEarlierAccountNonce(client, txFrom, currentNonce) {
  return new Promise(function(resolve, reject) {
    var earlierNonce = currentNonce;

    // callWithTimeout(
    client.call("zmk_txpool_search", [{
      "from": txFrom
    }])
    .then((callResult) => {
      if (callResult) {
        let txItems = callResult.pending
        // let txItems = callResult.result.pending
        // log.debug("callResult.result.pending: " + JSON.stringify(callResult.result.pending));
        for (const fromKey in txItems) {
          // log.debug("fromKey: " + fromKey);
          const tx = txItems[fromKey]
          // for (const txKey in fromItems) {
            // log.debug("txKey: " + txKey);
            // const tx = fromItems[txKey]
            // log.debug("tx: " + JSON.stringify(tx));
            if (tx.nonce !== undefined && tx.nonce <= earlierNonce) {
              earlierNonce = tx.nonce
            }
          // }
        }
        resolve(earlierNonce)
      }
    }) // , 15000)
  });

}


const doWork = async (startTime) => {
  while (true) {

    if (alreadyProcessing) {
      // log.info("already processing, skip...")
      await sleep(1000);
      continue;
    }
    alreadyProcessing = true;

    // TODO droped a replaced este ponechava tx: https://etherscan.io/tx/0xcf40b958710ccc35ba616ad5fafa537222bd2a2aec19ea91bd07000e6c9ec559
    // tato je anhradena touto vysie 0xcf40b958710ccc35ba616ad5fafa537222bd2a2aec19ea91bd07000e6c9ec559

    const client = new JsonRpc("https://api.zmok.io/fr/wannhlnavli9kzyj");
    // const client = new JsonRpc("http://127.0.0.1:8080/");
    // var call1 = callWithTimeout(
    client.call("zmk_txpool_search", [{
      "to": "0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45",
      "input": "0x5ae401dc*",
      "value": "0x0"
    }])
    .then(async (callResult) => {
      // log.debug("callResult: " + callResult);
      if (callResult) {



        // log.debug("callResult.result: " + callResult.result);
        // log.debug("result: " + JSON.stringify(callResult));
        // let txItems = callResult.result.pending
        let txItems = callResult.pending
        // log.debug("txItems: " + txItems);
        var maxGasPrice = 0;
        var maxGasPriceTxHash = -1
        var eanPromises = []
        for (const fromKey in txItems) {
          // log.debug("fromKey: " + fromKey);
          // const fromItems = txItems[fromKey]
          // for (const txKey in fromItems) {
            const tx = txItems[fromKey]

            var eanPromise = getEarlierAccountNonce(client, tx.from, tx.nonce).then((earlierAccountNonce) => {
              var skipProcessing = (tx.nonce > earlierAccountNonce)

              log.debug("tx: " + tx.hash + ", from: " + tx.from + ", gas price: " + (tx.gasPrice != undefined ? getPriceInGwei(tx.gasPrice) + " gwei" : "undefined")
                + (skipProcessing ? " -> skip, lower nonce found" : ""));

              if (tx.gasPrice !== undefined && tx.nonce == earlierAccountNonce &&  BigInt(tx.gasPrice) > BigInt(maxGasPrice)) {
                maxGasPrice = tx.gasPrice
                maxGasPriceTxHash =tx.hash
              }
            }).catch((error) => {
              log.error("error: " + error.message)
            });

            // await eanPromise
            eanPromises.push(eanPromise)
          // }
        }

        let calls = await Promise.all(eanPromises).then(() => {
          log.debug("... all calls finished...")
          Font.create("" + getPriceInGwei(maxGasPrice) + " gwei", 'Doom', function(err, rendered) {
              log.info(rendered);
              log.info("Max. gas price: " + getPriceInGwei(maxGasPrice) + " gwei, tx: " + maxGasPriceTxHash)
          });
          alreadyProcessing = false;
        }).catch((error) => {
          log.error("error: " + error.message)
        })



      }
    })
    .catch((error) => {
      log.error("error: " + error.message);
      alreadyProcessing = false;
    })
    // , 2000)


    log.info("#######################################################################")



    // TODO zmazat toto
    // return;
  }
}


const start = async () => {
  log.info("Txpool started.");

  doWork(Date.now());
}

start()

// module.exports = {
//   start: start
// }
