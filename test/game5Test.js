const { assert } = require("chai");

describe("Game5", function () {
  it("should be a winner", async function () {
    const Game = await ethers.getContractFactory("Game5");
    const game = await Game.deploy();
    await game.deployed();

    const threshold = 0x00ffffffffffffffffffffffffffffffffffffff;

    let wallet = ethers.Wallet.createRandom();

    const generateAddress = async () => {
      while (wallet.address > threshold) {
        wallet = ethers.Wallet.createRandom();
      }
      const signer = ethers.provider.getSigner(0);
      await signer.sendTransaction({
        to: wallet.address,
        value: ethers.utils.parseUnits("1", "ether"),
      });
      return new ethers.Wallet(wallet.privateKey, ethers.provider);
    };

    await game.connect(await generateAddress()).win();

    // leave this assertion as-is
    assert(await game.isWon(), "You did not win the game");
  });
});
