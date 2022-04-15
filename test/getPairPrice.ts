import { expect } from "chai";
import { formatEther, parseEther } from "ethers/lib/utils";
import Big from "bignumber.js";

export default function (): void {
  it("getPairPrice: Success", async function (): Promise<void> {
    await this.adapter.createPair(
      this.tokenTST.address,
      this.tokenACDM.address
    );

    const pair = await this.adapter.getPair(
      this.tokenTST.address,
      this.tokenACDM.address
    );

    await this.adapter.addLiquidity(
      this.tokenTST.address,
      this.tokenACDM.address,
      parseEther("100"),
      parseEther("1000"),
      parseEther("90"),
      parseEther("900"),
      this.owner.address,
      Date.now() + 60 * 20 // +20 min
    );

    const pairPrice = await this.adapter.getPairPrice(pair, parseEther("5"));
    const value = new Big(formatEther(pairPrice)).toNumber() / 1e18;

    expect(value).to.be.equals(50);
  });
}
