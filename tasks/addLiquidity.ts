import { AdapterUniswap } from "./../typechain/AdapterUniswap.d";
import { task } from "hardhat/config";

import "@nomiclabs/hardhat-ethers";

interface IArgs {
  contract: string;
  tokena: string;
  tokenb: string;
  amountadesired: string;
  amountbdesired: string;
  amountamin: string;
  amountbmin: string;
  to: string;
  deadline: string;
}

task("add-liquidity", "Add liquidity")
  .addParam("contract", "Contract token address")
  .addParam("tokena", "Token A")
  .addParam("tokenb", "Token B")
  .addParam("amountadesired", "Amount A Desired")
  .addParam("amountbdesired", "Amount B Desired")
  .addParam("amountamin", "Amount A Min")
  .addParam("amountbmin", "Amount B Min")
  .addParam("to", "To address")
  .addParam("deadline", "Deadline")
  .setAction(async (args: IArgs, hre) => {
    const AdapterUniswap = (await hre.ethers.getContractAt(
      "AdapterUniswap",
      args.contract
    )) as AdapterUniswap;

    const tx = await AdapterUniswap.addLiquidity(
      args.tokena,
      args.tokenb,
      args.amountadesired,
      args.amountbdesired,
      args.amountamin,
      args.amountbmin,
      args.to,
      args.deadline
    );
    await tx.wait();

    console.log("Successfully add liquidity");
  });

export {};
