import { expect } from "chai";

export default function (): void {
  it("createPair: Success", async function (): Promise<void> {
    const pairBefore = await this.adapter.getPair(
      this.tokenTST.address,
      this.tokenACDM.address
    );
    expect(pairBefore).to.be.equals(
      "0x0000000000000000000000000000000000000000"
    );

    await this.adapter.createPair(
      this.tokenTST.address,
      this.tokenACDM.address
    );
    const pairAfter = await this.adapter.getPair(
      this.tokenTST.address,
      this.tokenACDM.address
    );
    expect(pairAfter).to.be.not.equals(
      "0x0000000000000000000000000000000000000000"
    );
  });
}
