import { parseEther } from "ethers/lib/utils";
import { expect } from "chai";

export default function (): void {
  it("addLiquidity: Success", async function (): Promise<void> {
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
  });
}
