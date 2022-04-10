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


const doWork = async (startTime) => {
  while (true) {




    const client = new JsonRpc("https://api.zmok.io/fr/wannhlnavli9kzyj");
    // var call1 = callWithTimeout(
    client.call("zmk_txpool_search", [{
        "to": "0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45",
        "input": "0x5ae401dc*",
        "value": "0x0"
      }])
      .then((callResult) => {
        // log.debug("callResult: " + callResult);
        if (callResult && callResult.result) {



          // log.debug("callResult.result: " + callResult.result);
          // log.debug("result: " + JSON.stringify(callResult.result));
          let txItems = callResult.result.pending

          var maxGasPrice = 0;
          var i = 0;
          for (const fromKey in txItems) {
            // log.debug("fromKey: " + fromKey);
            const fromItems = txItems[fromKey]
            i++;
            for (const txKey in fromItems) {
              const tx = fromItems[txKey]
              log.debug("index: " + i + ", tx: " + tx.hash + ", gasPrice: " + (tx.gasPrice !== undefined ? getPriceInGwei(tx.gasPrice) : "undefined") + " gwei");
              if (tx.gasPrice !== undefined && BigInt(tx.gasPrice) > BigInt(maxGasPrice)) {
                maxGasPrice = tx.gasPrice
              }
            }
          }
          log.info("Max. gas price: " + getPriceInGwei(maxGasPrice) + " gwei")

        }
      })
      .catch((error) => {
        log.error("error: " + error.message);
      })
      // , 10000)


    log.info("#######################################################################")


    await sleep(5000);
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
