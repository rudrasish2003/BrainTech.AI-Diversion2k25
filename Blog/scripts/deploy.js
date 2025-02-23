const hre = require("hardhat");

async function main() {
  const Blog = await hre.ethers.deployContract("Blog"); // Use deployContract instead of getContractFactory

  console.log(`Contract deployed to: ${await Blog.getAddress()}`); // Use getAddress() instead of .address
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
