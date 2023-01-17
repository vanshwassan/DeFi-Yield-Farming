const hre = require("hardhat");

module.exports = async () => {

  const DappToken = await hre.deployments.get("DappToken");
  const WETH = await hre.deployments.get("WETH");
  const WETHAddress = WETH.address;
  const ethUsdBytes32 = "0x4554482f55534400000000000000000000000000000000000000000000000000";
  const usdcusdbytes32 = "0x555344432f555344000000000000000000000000000000000000000000000000";

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

    const addWETH = await stakingContract.addAllowedTokens(WETHAddress);
    await addWETH.wait();
    console.log(`Added WETH token to allowed tokens`);

    const setWETHDapi = await stakingContract.setDapiName(WETHAddress, ethUsdBytes32);
    await setWETHDapi.wait();
    console.log(`DAPI set for Wrapped ETH`);

    const addDAPP = await stakingContract.addAllowedTokens(dappTokenAddress);
    await addDAPP.wait();
    console.log(`Added DAPPToken token to allowed tokens`);
 
    const setDAPIDAPI = await stakingContract.setDapiName(dappTokenAddress, usdcusdbytes32);
    await setDAPIDAPI.wait();
    console.log(`DAPI set for DAPPToken`);

    // Approve Spending Limits
    const WETHContract = new hre.ethers.Contract(
      WETH.address,
      WETH.abi,
      hre.ethers.provider.getSigner()
    );
    const approve = await WETHContract.approve(StakingContract.address, '10000000000000000000');
    await approve.wait();
    console.log(`Approved to spend Wrapped ETH!`);

  };