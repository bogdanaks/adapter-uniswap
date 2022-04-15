import { expect } from "chai";
import { parseEther } from "ethers/lib/utils";

export default function (): void {
  it("exchangePair: Success one-by-one", async function (): Promise<void> {
    await this.adapter.createPair(
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

    await this.adapter.exchangePair(
      parseEther("10"),
      parseEther("0.5"),
      [this.tokenACDM.address, this.tokenTST.address],
      this.owner.address,
      Date.now() + 60 * 20 // +20 min
    );
  });
}
