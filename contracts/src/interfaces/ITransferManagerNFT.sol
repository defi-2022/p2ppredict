// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

interface ITransferManagerNFT {
    function transferNonFungibleToken(
        address collection,
        address from,
        address to,
        uint256 tokenId,
        uint256 amount
    ) external;
}
