# ae-blockchain
This script allows you to track render data inside of After Effects using a simple blockchain method. Instead of using a hash function to encrypt/secure data, we will only be using binary format for simplicity's sake.

JSON2.js - https://gist.github.com/atheken/654510

Steps to make the script work:
1) Ensure you have included json2.js and it is in the same directory as this script
2) Define "blockchainLocation" on line 6
3) Run script before or after a composition is added to the render queue
4) After selecting an output location and format, press the render button in the script
5) View "blockchain.txt" to check out the results (or use $.writeln())

Video Tutorial Reference: https://youtu.be/-sn8519_p2c