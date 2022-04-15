import { expect } from "chai";

export default function (): void {
  it("getPair: Success", async function (): Promise<void> {
    await this.adapter.createPair(
      this.tokenTST.address,
      this.tokenACDM.address
    );
    const pairCreated = await this.adapter.getPair(
      this.tokenTST.address,
      this.tokenACDM.address
    );
    const pairGet = await this.adapter.getPair(
      this.tokenTST.address,
      this.tokenACDM.address
    );
    expect(pairCreated).to.be.equals(pairGet);
  });
}
