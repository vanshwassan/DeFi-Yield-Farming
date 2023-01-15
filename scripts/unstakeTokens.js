const hre = require('hardhat');

async function main() {
  const StakingContract = await hre.deployments.get("TokenFarm");
  const LinkTokenAddress = "0x326C977E6efc84E512bB9C30f76E30c160eD06FB";
  const stakingContract = new hre.ethers.Contract(
    StakingContract.address,
    StakingContract.abi,
    hre.ethers.provider.getSigner()
  );

  const unstakeTokens = await stakingContract.unstakeTokens(LinkTokenAddress);
  await unstakeTokens.wait();
  console.log("Unstaked LINK tokens!");

}
  main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });