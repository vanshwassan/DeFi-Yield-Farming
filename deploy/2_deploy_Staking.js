const res = require("express/lib/response");
const hre = require("hardhat");
const setTimeout = require("timers/promises");

module.exports = async () => {

  const DappToken = await hre.deployments.get("DappToken");
  const LinkTokenAddress = "0x326C977E6efc84E512bB9C30f76E30c160eD06FB";
  const linkUsdBytes32 = "0x4c494e4b2f555344000000000000000000000000000000000000000000000000";

    const dapiServerAddress = "0x71Da7A936fCaEd1Ee364Df106B12deF6D1Bf1f14";
    const dappTokenAddress = DappToken.address;
    const StakingContract = await hre.deployments.deploy("TokenFarm", {
      args: [dapiServerAddress, dappTokenAddress],
      from: (await hre.getUnnamedAccounts())[0],
      log: true,
    });
    console.log(`Deployed Staking at ${StakingContract.address}`);
    console.log(`Staking contract deployed!`);
    const stakingContract = new hre.ethers.Contract(
      StakingContract.address,
      StakingContract.abi,
      hre.ethers.provider.getSigner()
    );

    const addLink = await stakingContract.addAllowedTokens(LinkTokenAddress);
    await addLink.wait();
    console.log(`Added LINK token to allowed tokens`);

    const setLinkDapi = await stakingContract.setDapiName(LinkTokenAddress, linkUsdBytes32);
    await setLinkDapi.wait();
    console.log(`DAPI set for LINK token`);

    const addDAPI = await stakingContract.addAllowedTokens(dappTokenAddress);
    await addDAPI.wait();
    console.log(`Added DAPPToken token to allowed tokens`);
 
    const setDAPIDAPI = await stakingContract.setDapiName(dappTokenAddress, linkUsdBytes32);
    await setDAPIDAPI.wait();
    console.log(`DAPI set for DAPPToken`);

  };