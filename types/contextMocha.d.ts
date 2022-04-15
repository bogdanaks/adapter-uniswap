import {
  Token,
  AdapterUniswap__factory,
  Token__factory,
  AdapterUniswap,
} from "../typechain";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

declare module "mocha" {
  export interface Context {
    AdapterUniswapContract: AdapterUniswap__factory;
    tokenContract: Token__factory;
    tokenACDM: Token;
    tokenTST: Token;
    tokenPOP: Token;
    adapter: AdapterUniswap;
    owner: SignerWithAddress;
    addr1: SignerWithAddress;
    addr2: SignerWithAddress;
    factoryUniswap: string;
    routerUniswap: string;
  }
}
