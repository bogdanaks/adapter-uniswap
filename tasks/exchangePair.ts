import { AdapterUniswap } from "./../typechain/AdapterUniswap.d";
import { task } from "hardhat/config";

import "@nomiclabs/hardhat-ethers";

interface IArgs {
  contract: string;
  amountin: string;
  amountaoutmin: string;
  path: string;
  to: string;
  deadline: string;
}

task("exchange-pair", "Exchange pair")
  .addParam("contract", "Contract token address")
  .addParam("amountin", "Amount In")
  .addParam("amountaoutmin", "Amount Out Min")
  .addParam("path", "Path (addr1,addr2...)")
  .addParam("to", "To address")
  .addParam("deadline", "Deadline")
  .setAction(async (args: IArgs, hre) => {
    const AdapterUniswap = (await hre.ethers.getContractAt(
      "AdapterUniswap",
      args.contract
    )) as AdapterUniswap;

    const tx = await AdapterUniswap.exchangePair(
      args.amountin,
      args.amountaoutmin,
      args.path.split(","),
      args.to,
      args.deadline
    );
    await tx.wait();

    console.log("Successfully exchange pair");
  });

export {};
