import { ethers } from "hardhat";
import { parseEther } from "ethers/lib/utils";

import * as dotenv from "dotenv";

import createPairTest from "./createPair";
import getPairTest from "./getPair";
import addLiquidityTest from "./addLiquidity";
import addLiquidityETHTest from "./addLiquidityETH";
import removeLiquidityTest from "./removeLiquidity";
import getPairPriceTest from "./getPairPrice";
import exchangePairTest from "./exchangePair";

dotenv.config();

describe("Test functions", async function () {
  beforeEach(async function () {
    this.AdapterUniswapContract = await ethers.getContractFactory(
      "AdapterUniswap"
    );
    this.TokenContract = await ethers.getContractFactory("Token");
    this.TokenContract = await ethers.getContractFactory("Token");
    [this.owner, this.addr1, this.addr2] = await ethers.getSigners();

    this.factoryUniswap = String(process.env.FACTORY_ADDRESS);
    this.routerUniswap = String(process.env.ROUTER_ADDRESS);

    this.tokenACDM = await this.TokenContract.deploy("Academy Token", "ACDM");
    this.tokenTST = await this.TokenContract.deploy("TST Token", "TST");
    this.tokenPOP = await this.TokenContract.deploy("POP Token", "POP");

    this.adapter = await this.AdapterUniswapContract.deploy(
      this.factoryUniswap,
      this.routerUniswap
    );

    await this.tokenACDM.grantRole(
      await this.tokenACDM.MODER_ROLE(),
      this.adapter.address
    );
    await this.tokenTST.grantRole(
      await this.tokenTST.MODER_ROLE(),
      this.adapter.address
    );
    await this.tokenPOP.grantRole(
      await this.tokenPOP.MODER_ROLE(),
      this.adapter.address
    );

    await this.tokenACDM.mint(this.owner.address, parseEther("10000"));
    await this.tokenTST.mint(this.owner.address, parseEther("10000"));
    await this.tokenPOP.mint(this.owner.address, parseEther("10000"));

    await this.tokenTST.transfer(this.adapter.address, parseEther("10000"));
    await this.tokenACDM.transfer(this.adapter.address, parseEther("10000"));
    await this.tokenPOP.transfer(this.adapter.address, parseEther("10000"));

    await this.adapter.approveToken(
      this.tokenACDM.address,
      parseEther("10000")
    );
    await this.adapter.approveToken(this.tokenTST.address, parseEther("10000"));
    await this.adapter.approveToken(this.tokenPOP.address, parseEther("10000"));
  });

  exchangePairTest();
  createPairTest();
  getPairTest();
  addLiquidityTest();
  removeLiquidityTest();
  addLiquidityETHTest();
  getPairPriceTest();
});
