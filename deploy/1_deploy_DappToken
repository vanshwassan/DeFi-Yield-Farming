const hre = require('hardhat');

module.exports = async function() {
  // Deploy Dapp Token
    const DappToken = await hre.deployments.deploy('DappToken', {
        from: (await hre.getUnnamedAccounts())[0],
    } );
    console.log(`Deployed DappToken at ${DappToken.address}`);
    console.log(`DappTokens sent!`);
}