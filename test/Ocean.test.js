const {expect} = require("chai");
const hre = require("hardhat");
const {loadFixture} = require("@nomicfoundation/hardhat-network-helpers");

describe("Ocean", function() {
    async function deployOceanAndMintTokenFixture() {
        const Ocean = await ethers.getContractFactory("Ocean");
        const accounts = await ethers.getSigners();
        const oceanInstance = await Ocean.deploy(accounts[0].address);
        await oceanInstance.safeMint(accounts[1].address, "Ocean.js");

        return {oceanInstance, accounts};
    }

    it("Is possible to mint a token", async() => {
        const {oceanInstance, accounts} = await loadFixture(deployOceanAndMintTokenFixture);

        expect(await oceanInstance.ownerOf(0)).to.equal(accounts[1].address);
    }),

    it("The owner token approve the transaction your token and transfer to new owner", async() => {
        const {oceanInstance, accounts} = await loadFixture(deployOceanAndMintTokenFixture);

        expect(await oceanInstance.ownerOf(0)).to.equal(accounts[1].address);

        // Approve the transaction and transfer the token
        const owner = accounts[1];
        const tokenId = 0;
        const spender = accounts[2];

        // Verify if the address is the owner
        expect(await oceanInstance.ownerOf(tokenId)).to.equal(owner.address);

        // Approve the transaction
        await oceanInstance.connect(owner).approve(spender.address, tokenId);

        // Transfer the token
        await oceanInstance.connect(spender).transferFrom(owner.address, spender.address, tokenId);

        // Verify if the address is the new owner
        expect(await oceanInstance.ownerOf(tokenId)).to.equal(spender.address);


    });
 })