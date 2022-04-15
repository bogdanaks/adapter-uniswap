import { AdapterUniswap } from "./../typechain/AdapterUniswap.d";
import { task } from "hardhat/config";

import "@nomiclabs/hardhat-ethers";

interface IArgs {
  contract: string;
  tokena: string;
  tokenb: string;
}

task("create-pair", "Create pair")
  .addParam("contract", "Contract token address")
  .addParam("tokena", "Token A")
  .addParam("tokenb", "Token B")
  .setAction(async (args: IArgs, hre) => {
    const AdapterUniswap = (await hre.ethers.getContractAt(
      "AdapterUniswap",
      args.contract
    )) as AdapterUniswap;

    const tx = await AdapterUniswap.createPair(args.tokena, args.tokenb);
    await tx.wait();

    console.log("Successfully create pair");
  });

export {};
