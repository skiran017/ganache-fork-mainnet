const Web3 = require('web3');
const { daiAbi } = require('./abi.js');

const recipientAddress = '0x02d6190C22293e010846B439787d304668783885';
const unlockedAddress = '0x5777d92f208679DB4b9778590Fa3CAB3aC9e2168';
const daiAddress = '0x6B175474E89094C44Da98b954EedeAC495271d0F';

const web3 = new Web3('http://localhost:8545');
const dai = new web3.eth.Contract(daiAbi, daiAddress);

async function run() {
  let unlockedBalance, recipientBalance;
  [unlockedBalance, recipientBalance] = await Promise.all([
    dai.methods.balanceOf(unlockedAddress).call(),
    dai.methods.balanceOf(recipientAddress).call(),
  ]);

  console.log(`Balance unlocked: ${unlockedBalance}`);
  console.log(`Balance recipient: ${recipientBalance}`);

  await dai.methods
    .transfer(recipientAddress, 10)
    .send({ from: unlockedAddress });

  [unlockedBalance, recipientBalance] = await Promise.all([
    dai.methods.balanceOf(unlockedAddress).call(),
    dai.methods.balanceOf(recipientAddress).call(),
  ]);

  console.log(`Balance unlocked: ${unlockedBalance}`);
  console.log(`Balance recipient: ${recipientBalance}`);
}
run();
