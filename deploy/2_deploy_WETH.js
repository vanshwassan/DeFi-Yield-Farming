const hre = require('hardhat');

module.exports = async function() {
  // Deploy Dapp Token
    const WETH = await hre.deployments.deploy('WETH', {
        from: (await hre.getUnnamedAccounts())[0],
    } );
    console.log(`Deployed Wrapped ETH at ${WETH.address}`);
    console.log(`Wrapped ETH sent!`);
}