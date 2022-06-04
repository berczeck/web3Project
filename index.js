/*##########################

CONFIGURATION
##########################*/

// -- Step 1: Set up the appropriate configuration 
var Web3 = require("web3") 
// var EthereumTransaction = require("ethereumjs-tx") 
const EthereumTransaction = require('ethereumjs-tx').Transaction
var web3 = new Web3('HTTP://127.0.0.1:7545')

// -- Step 2: Set the sending and receiving addresses for the transaction. 
var sendingAddress = '0x095480D126B4E3f2B6243f4F4A6fd42e5404Ad85' 
var receivingAddress = '0x2E0C510EAD24efb98666a4625CCFcA59bf9a2EF2'

// -- Step 3: Check the balances of each address 
web3.eth.getBalance(sendingAddress).then(console.log) 
web3.eth.getBalance(receivingAddress).then(console.log)

/*##########################

CREATE A TRANSACTION
##########################*/

// -- Step 4: Set up the transaction using the transaction variables as shown 
var rawTransaction = 
  { nonce: ascii_2_0xhex(0), 
    to: receivingAddress, 
    gasPrice: ascii_2_0xhex(20000000), 
    gasLimit: ascii_2_0xhex(30000), 
    value: ascii_2_0xhex(1), 
    data: "0x00" }

// -- Step 5: View the raw transaction rawTransaction

// -- Step 6: Check the new account balances (they should be the same) 
web3.eth.getBalance(sendingAddress).then(console.log) 
web3.eth.getBalance(receivingAddress).then(console.log)

// Note: They haven't changed because they need to be signed...

/*##########################

Sign the Transaction
##########################*/

// -- Step 7: Sign the transaction with the Hex value of the private key of the sender 
var privateKeySender = '446669308a5b099e51b303d481ca44c9fef016a0ae57379fd5d6e3e268af12fb' 
// var privateKeySenderHex = new Buffer(privateKeySender, 'hex') 
var privateKeySenderHex = Buffer.from(privateKeySender, 'hex') 
var transaction = new EthereumTransaction(rawTransaction) 
transaction.sign(privateKeySenderHex)

/*#########################################

Send the transaction to the network
#########################################*/

// -- Step 8: Send the serialized signed transaction to the Ethereum network. 
var serializedTransaction = transaction.serialize(); 
web3.eth.sendSignedTransaction(serializedTransaction);

web3.eth.getGasPrice().then(console.log);
web3.eth.getUncle('latest',0).then(console.log);
web3.eth.getBlockTransactionCount("0xbb6727558cf1f0afcc7b5c906bb6fac4aed3324094c0f632ce3891b71f7c2a4b").then(console.log);

function ascii_2_0xhex(num){
    return "0x" + num.toString(16)
}