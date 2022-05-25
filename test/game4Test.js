const { assert } = require("chai");

describe("Game4", function () {
  it("should be a winner", async function () {
    const Game = await ethers.getContractFactory("Game4");
    const game = await Game.deploy();
    await game.deployed();

    // nested mappings are rough :}
    // this works but probably not what we're looking for
    // const signer = ethers.provider.getSigner(0);
    // const address = await signer.getAddress();
    // await game.write(address);
    // await game.win(address);

    const signer0 = ethers.provider.getSigner(0);
    const address0 = await signer0.getAddress();
    const signer1 = ethers.provider.getSigner(1);
    const address1 = await signer1.getAddress();
    await game.connect(signer0).write(address1);
    await game.connect(signer1).win(address0);

    // leave this assertion as-is
    assert(await game.isWon(), "You did not win the game");
  });
});
