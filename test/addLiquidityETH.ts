import { parseEther } from "ethers/lib/utils";
import { expect } from "chai";

export default function (): void {
  it("addLiquidityETH: Success", async function (): Promise<void> {
    const wETH = "0xc778417E063141139Fce010982780140Aa0cD5Ab";
    await this.adapter.createPair(wETH, this.tokenPOP.address);

    await this.adapter.addLiquidityETH(
      this.tokenPOP.address,
      parseEther("100"),
      parseEther("90"),
      parseEther("1"),
      this.owner.address,
      Date.now() + 60 * 20, // +20 min
      {
        value: parseEther("1"),
      }
    );
  });
}
