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

  const stakeTokens = await stakingContract.stakeTokens('1000000000000000000', WETHAddress);
  await stakeTokens.wait();
  console.log("Staked 1.00 Wrapped ETH!");

}
  main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });