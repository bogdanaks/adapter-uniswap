import { parseEther } from "ethers/lib/utils";
import { expect } from "chai";
import { ethers } from "hardhat";

import { IUniswapV2Pair } from "./../typechain/IUniswapV2Pair.d";

export default function (): void {
  it("removeLiquidity: Success", async function (): Promise<void> {
    await this.adapter.createPair(
      this.tokenTST.address,
      this.tokenACDM.address
    );

    const pair = await this.adapter.getPair(
      this.tokenTST.address,
      this.tokenACDM.address
    );

    const tx = await this.adapter.addLiquidity(
      this.tokenTST.address,
      this.tokenACDM.address,
      parseEther("100"),
      parseEther("1000"),
      parseEther("90"),
      parseEther("900"),
      this.owner.address,
      Date.now() + 60 * 20 // +20 min
    );
    const res = await tx.wait();
    const event = res?.events?.find((event) => event.event === "AddLiquidity");
    const data = event?.args;

    expect(data?.length).to.be.greaterThan(0);
    if (!data?.length) return;

    const pairContract = await ethers.getContractAt("IUniswapV2Pair", pair);
    await pairContract.approve(this.routerUniswap, data.liquidity.toString());
    await pairContract.approve(this.adapter.address, data.liquidity.toString());
    await pairContract.transfer(
      this.adapter.address,
      data.liquidity.toString()
    );

    await this.adapter.approveToken(pair, data.liquidity.toString());
    await this.adapter.removeLiquidity(
      this.tokenTST.address,
      this.tokenACDM.address,
      data.liquidity,
      parseEther("10"),
      parseEther("90"),
      this.owner.address,
      Date.now() + 60 * 20 // +20 min
    );
  });

  it("removeLiquidity: Pair doest exist", async function (): Promise<void> {
    expect(
      this.adapter.removeLiquidity(
        this.tokenTST.address,
        this.tokenACDM.address,
        parseEther("10"),
        parseEther("100"),
        parseEther("900"),
        this.owner.address,
        Date.now() + 60 * 20 // +20 min
      )
    ).to.be.revertedWith("Pair doesnt exist");
  });
}
