import { AdapterUniswap } from "./../typechain/AdapterUniswap.d";
import { task } from "hardhat/config";

import "@nomiclabs/hardhat-ethers";

interface IArgs {
  contract: string;
  token: string;
  amounttokendesired: string;
  amounttokenmin: string;
  amountethmin: string;
  to: string;
  deadline: string;
  valueeth: string;
}

task("add-liquidity", "Add liquidity")
  .addParam("contract", "Contract token address")
  .addParam("token", "Token")
  .addParam("amounttokendesired", "Amount Token Desired")
  .addParam("amounttokenmin", "Amount Token Min")
  .addParam("amountethmin", "Amount ETH Min")
  .addParam("to", "To Address")
  .addParam("deadline", "Deadline")
  .addParam("valueeth", "Value ETH")
  .setAction(async (args: IArgs, hre) => {
    const AdapterUniswap = (await hre.ethers.getContractAt(
      "AdapterUniswap",
      args.contract
    )) as AdapterUniswap;

    const tx = await AdapterUniswap.addLiquidityETH(
      args.token,
      args.amounttokendesired,
      args.amounttokenmin,
      args.amountethmin,
      args.to,
      args.deadline,
      {
        value: args.valueeth,
      }
    );
    await tx.wait();

    console.log("Successfully add liquidity ETH");
  });

export {};
