const hre = require('hardhat');

async function main() {

  const StakingContract = await hre.deployments.get("TokenFarm");
  const stakingContract = new hre.ethers.Contract(
    StakingContract.address,
    StakingContract.abi,
    hre.ethers.provider.getSigner()
  );

  const issueTokens = await stakingContract.issueTokens();
  await issueTokens.wait();
  console.log("Staking Rewards Sent!");

}
  main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });