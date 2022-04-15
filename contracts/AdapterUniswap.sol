//SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.11;

import "hardhat/console.sol";
import "@uniswap/v2-core/contracts/interfaces/IUniswapV2Pair.sol";
import "@uniswap/v2-core/contracts/interfaces/IUniswapV2Factory.sol";
import "@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol";

import "./IToken.sol";

contract AdapterUniswap {
  event AddLiquidity(address indexed tokenA, address indexed tokenB, uint256 indexed liquidity);
  event CreatePair(address indexed tokenA, address indexed tokenB);
  event RemoveLiquidity(address indexed tokenA, address indexed tokenB, uint256 indexed liquidity);
  event AddLiquidityETH(address indexed token, uint256 indexed liquidity);
  event ExchangePair(
    uint256 indexed amountIn,
    uint256 indexed amountOutMin,
    address[] path,
    address indexed to,
    uint256 deadline
  );

  IUniswapV2Factory public factory;
  IUniswapV2Router02 public router;

  constructor(IUniswapV2Factory _factory, IUniswapV2Router02 _router) public {
    factory =  _factory;
    router =  _router;
  }

  function createPair(address tokenA, address tokenB) external returns (address pair) {
    emit CreatePair(tokenA, tokenB);
    return factory.createPair(tokenA, tokenB);
  }

  function getPair(address tokenA, address tokenB) external view returns (address pair) {
    return factory.getPair(tokenA, tokenB);
  }

  function addLiquidity(
    address tokenA,
    address tokenB,
    uint256 amountADesired,
    uint256 amountBDesired,
    uint256 amountAMin,
    uint256 amountBMin,
    address to,
    uint256 deadline
  ) external returns (uint256 amountA, uint256 amountB, uint256 liquidity) {
    (amountA, amountB, liquidity) = router.addLiquidity(tokenA, tokenB, amountADesired, amountBDesired, amountAMin, amountBMin, to, deadline);
    emit AddLiquidity(tokenA, tokenB, liquidity);
  }

  function removeLiquidity(
    address tokenA,
    address tokenB,
    uint256 liquidity,
    uint256 amountAMin,
    uint256 amountBMin,
    address to,
    uint256 deadline
  ) external returns (uint256 amountA, uint256 amountB) {
    address pair = factory.getPair(tokenA, tokenB);
    require(pair != address(0), "Pair doesnt exist");

    emit RemoveLiquidity(tokenA, tokenB, liquidity);

    return router.removeLiquidity(
      tokenA,
      tokenB,
      liquidity,
      amountAMin,
      amountBMin,
      to,
      deadline
    );
  }

  function addLiquidityETH(
    address token,
    uint256 amountTokenDesired,
    uint256 amountTokenMin,
    uint256 amountETHMin,
    address to,
    uint256 deadline
  ) public payable returns (uint256 amountToken, uint256 amountETH, uint256 liquidity) {
    (amountToken, amountETH, liquidity) = router.addLiquidityETH{value: msg.value}(
      token,
      amountTokenDesired,
      amountTokenMin,
      amountETHMin,
      to,
      deadline
    );
    emit AddLiquidityETH(token, liquidity);
  }

  function approveToken(IToken token, uint256 amount) public {
    token.approve(address(router), amount);
  }

  function getPairPrice(address pairAddress, uint256 amount) public view returns(uint256) {
    require(pairAddress != address(0), "Pair doesnt exist");

    IUniswapV2Pair pair = IUniswapV2Pair(pairAddress);
    IToken token1 = IToken(pair.token1());

    (uint256 Res0, uint256 Res1,) = pair.getReserves();
    uint256 res0 = Res0*(10**token1.decimals());
    return ((amount * res0) / Res1);
  }

  function exchangePair(
    uint256 amountIn,
    uint256 amountOutMin,
    address[] calldata path,
    address to,
    uint256 deadline
  ) external payable returns (uint256[] memory amounts) {
    (amounts) = router.swapExactTokensForTokens(amountIn, amountOutMin, path, to, deadline);
    emit ExchangePair(amountIn, amountOutMin, path, to, deadline);
  }
}
