const hre = require('hardhat');

async function main() {
  const StakingContract = await hre.deployments.get("TokenFarm");
  const WETH = await hre.deployments.get("WETH");
  const WETHAddress = WETH.address;
  const stakingContract = new hre.ethers.Contract(
    StakingContract.address,
    StakingContract.abi,
    hre.ethers.provider.getSigner()
  );

  const unstakeTokens = await stakingContract.unstakeTokens(WETHAddress);
  await unstakeTokens.wait();
  console.log("Unstaked Wrapped ETH!");

}
  main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });