var Web3 = require("web3") 
var web3 = new Web3('HTTP://127.0.0.1:7545')

web3.eth.getBlockTransactionCount("0xbb6727558cf1f0afcc7b5c906bb6fac4aed3324094c0f632ce3891b71f7c2a4b").then(console.log);
