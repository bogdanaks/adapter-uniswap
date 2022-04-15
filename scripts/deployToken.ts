import { ethers } from "hardhat";
import * as dotenv from "dotenv";
import assert from "assert";

dotenv.config();

assert(process.env.ROUTER_ADDRESS, "ROUTER_ADDRESS not found");
assert(process.env.FACTORY_ADDRESS, "FACTORY_ADDRESS not found");

async function main() {
  const Contract = await ethers.getContractFactory("Token");
  const [owner] = await ethers.getSigners();
  const contract = await Contract.deploy("Academy Token", "ACDM");

  console.log("Contract deployed to:", contract.address);
  console.log("Owner address is: ", owner.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
