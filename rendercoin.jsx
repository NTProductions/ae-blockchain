// render coin

#include json2.js

// global vars
var blockchainLocation = "C:\\renderchain";
var renderCoin;

function block(index, timestamp, data, previousHash) {
                this.index = index;

                this.timestamp = timestamp;
                this.data = data;
                this.previousHash = previousHash;
                this.hash = calculateHash(this.index, this.timestamp, this.data, this.previousHash);
         function calculateHash(index, timestamp, data, previousHash) {
                return hashAlgo(index, parseInt(timestamp.replace("/", "").replace("/", "")), data, previousHash);
            }
        
            
    }

function Blockchain() {
                this.chain = [];
                this.chain.push(createGenesisBlock());
        
        function createGenesisBlock() {
                return new block(0, "3/24/2018", 0, 0);
            }
        
        Blockchain.prototype.getLatestBlock = function() {
                return this.chain[this.chain.length - 1];
            }
        
        Blockchain.prototype.addBlock = function(newBlock) {
            newBlock.previousHash = this.getLatestBlock().hash;
            this.chain.push(newBlock);
            }
        
        Blockchain.prototype.isChainValid = function() {
            for(var i = 1; i < this.chain.length; i++) {
                const currentBlock = this.chain[i];
                const previousBlock = this.chain[i-1];
                
                if(currentBlock.hash !== hashAlgo(currentBlock.index, parseInt(currentBlock.timestamp.replace("/", "").replace("/", "")), currentBlock.data, currentBlock.previousHash)) {
                    return false;
                    }
                
                if(currentBlock.previousHash !== previousBlock.hash) {
                     return false;
                    }
                }
            return true;
            }
    }

function hashAlgo(index, timestamp, data, previousHash) {
    var hashData = index.toString(2) + " " + timestamp.toString(2) + " " + data.toString(2) + "  " + previousHash.toString(2);
    return hashData;
    }

var mainWindow = new Window("palette", "Render Blockchain", undefined);
mainWindow.orientation = "column";

var groupOne = mainWindow.add("group", undefined, "groupOne");
groupOne.orientation = "column";
var displayText = groupOne.add("statictext", undefined, "Render active RQ item and add to blockchain");
var renderButton = groupOne.add("button", undefined, "Render...");

mainWindow.center();
mainWindow.show();

renderButton.onClick = function() {
        if(checkSelectedRQItem() < 1) {
            alert("Please add item(s) to render queue to add to the chain");
            return false;
            } else {
                // check if blockchain exists
                    var blockchainFile = checkBlockchain();
                    var date = getDate();
                    
                    var chainData = readBlockchain(blockchainFile);
                    if(renderCoin == null || renderCoin == undefined) {
                    renderCoin = new Blockchain();
                    }
                    appendBlockchain(date, chainData, renderCoin);
                    $.writeln("appending finished");
                    renderItem();
                    $.writeln("render complete");
                    
                }
    }

function checkSelectedRQItem() {
        var counter = 0;
    for(var i = 1; i <= app.project.renderQueue.numItems; i++) {
        counter++;
        }

    return counter;
    }

function checkBlockchain() {
    var blockchainFile = File(blockchainLocation + "/blockchain.txt");
    if(!blockchainFile.exists) {
        blockchainFile.open("w");
            blockchainFile = new File(blockchainLocation + "/blockchain.txt");
            blockchainFile.close();
        }
    
    return blockchainFile;
    }

function getDate() {
    var newDate = new Date();
    var day = newDate.getDate();
    var month = newDate.getMonth();
    var year = newDate.getFullYear();
    
    return month + "/" + day + "/" + year;
    }

function readBlockchain(file) {
   var data = [];
   var currentLine;
   file.open("r");
    while(!file.eof) {
        currentLine = file.readln();
            data.push(currentLine);
        }
    file.close();
    
    return data;
    }

function appendBlockchain(date, data, renderCoin) {
    renderCoin.addBlock(new block(renderCoin.chain[renderCoin.chain.length-1].index+1, date, app.project.renderQueue.item(1).timeSpanDuration, renderCoin.chain[renderCoin.chain.length-1].hash));
    writeBlockchain(data, renderCoin);
    }

function writeBlockchain(data, renderCoin) {
        var blockchainFile = File(blockchainLocation + "/blockchain.txt");
        var chainArray = []; 
        var currentLine;
        $.writeln("the current chain length is: " + renderCoin.chain.length);
        for(var i = 0; i < renderCoin.chain.length; i++) {
            chainArray.push(JSON.stringify(renderCoin.chain[i]));
            }
        blockchainFile.open("w");
            blockchainFile.encoding = "UTF-8";
            blockchainFile.write(chainArray);
        blockchainFile.close();
        
        
    }

function renderItem() {
    app.project.renderQueue.render();
    app.project.renderQueue.item(1).remove();
    }

