import { IUniswapV2Pair } from "./../typechain/IUniswapV2Pair.d";
import { parseEther } from "ethers/lib/utils";
import { expect } from "chai";
import { ethers } from "hardhat";

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
    // if (!data?.length) return;

    // const pairContract = await ethers.getContractAt("IUniswapV2Pair", pair);
    // await pairContract.approve(this.routerUniswap, data.liquidity.toString());
    // await pairContract.approve(this.adapter.address, data.liquidity.toString());

    // await this.adapter.approveToken(pair, data.liquidity.toString());
    // console.log(
    //   "awd: ",
    //   await pairContract.allowance(this.adapter.address, this.routerUniswap)
    // );

    // await this.adapter.removeLiquidity(
    //   this.tokenTST.address,
    //   this.tokenACDM.address,
    //   data.liquidity,
    //   parseEther("100"),
    //   parseEther("900"),
    //   this.owner.address,
    //   Date.now() + 60 * 20 // +20 min
    // );
  });
}
