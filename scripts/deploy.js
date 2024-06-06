async function main() {
    // We get the contract to deploy
    const Ocean = await ethers.getContractFactory("Ocean");

    //Get the accounts
    const accounts = await ethers.getSigners();
    console.log("Deploying Ocean...");

    //Instance of the contract
    const oceanInstance = await Ocean.deploy(accounts[0].address);

    // await oceanInstance.deployed;

    console.log("Ocean Token deployed to:", oceanInstance.target);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });