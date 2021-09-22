const { expect } = require("chai");
const { base64 } = require("ethers/lib/utils");
const { ethers } = require("hardhat");


describe("Greeter", function () {
  it("Should be a contract", async function () {
    const accounts = await ethers.getSigners();

    const Potion = await ethers.getContractFactory("Potion");
    const potion = await Potion.deploy();
    await potion.deployed();
    const contractAddress = potion.deployTransaction.creates
    const tokenId = 2
    const result = await potion.claim(tokenId);

    const totalSupply = await potion.totalSupply()
    // SUCCESS
    expect(totalSupply).to.equal(1)
    expect(Number(result.data[result.data.length-1]), "Token id is correct").to.equal(tokenId)
    expect(result.to, "To address correct").to.equal(contractAddress)
    expect(result.from, "From address correct").to.equal(accounts[0].address)
    // FAILURE: cannot mint same color twice
    expect(potion.claim(tokenId)).to.be.reverted
  });
  it("Should have a uri", async function () {
    const accounts = await ethers.getSigners();

    const Potion = await ethers.getContractFactory("Potion");
    const potion = await Potion.deploy();
    await potion.deployed();
    const tokenId = 2
    const result = await potion.tokenURI(tokenId);
    const expected = "data:application/json;base64,eyJuYW1lIjogIlBvdGlvbiAjMiIsICJkZXNjcmlwdGlvbiI6ICJQb3Rpb25zIGFyZSByYW5kb21pemVkIHBvdGlvbnMgYW5kIHN0b3JlZCBvbiBjaGFpbi4iLCAiaW1hZ2UiOiAiZGF0YTppbWFnZS9zdmcreG1sO2Jhc2U2NCxQSE4yWnlCNGJXeHVjejBpYUhSMGNEb3ZMM2QzZHk1M015NXZjbWN2TWpBd01DOXpkbWNpSUhCeVpYTmxjblpsUVhOd1pXTjBVbUYwYVc4OUluaE5hVzVaVFdsdUlHMWxaWFFpSUhacFpYZENiM2c5SWpBZ01DQXpOVEFnTXpVd0lqNDhjM1I1YkdVK0xtSmhjMlVnZXlCbWFXeHNPaUIzYUdsMFpUc2dabTl1ZEMxbVlXMXBiSGs2SUhObGNtbG1PeUJtYjI1MExYTnBlbVU2SURFMGNIZzdJSDA4TDNOMGVXeGxQanh5WldOMElIZHBaSFJvUFNJeE1EQWxJaUJvWldsbmFIUTlJakV3TUNVaUlHWnBiR3c5SW1Kc1lXTnJJaUF2UGp4MFpYaDBJSGc5SWpFd0lpQjVQU0l5TUNJZ1kyeGhjM005SW1KaGMyVWlQazVoYldVNklGQnZkR2x2YmlCdlppQk1kV05yUEM5MFpYaDBQangwWlhoMElIZzlJakV3SWlCNVBTSTBNQ0lnWTJ4aGMzTTlJbUpoYzJVaVBpQkdhWEp6ZENCSmJtZHlaV1JwWVc1ME9pQklaWEp0YVhRZ1EzSmhZaUJUYUdWc2JEd3ZkR1Y0ZEQ0OGRHVjRkQ0I0UFNJeE1DSWdlVDBpTmpBaUlHTnNZWE56UFNKaVlYTmxJajRnVTJWamIyNWtJRWx1WjNKbFpHbGhiblE2SUU1cFoyaDBjMmhoWkdVOEwzUmxlSFErUEhSbGVIUWdlRDBpTVRBaUlIazlJamd3SWlCamJHRnpjejBpWW1GelpTSStJRk5sWTNKbGRDQkpibWR5WldScFlXNTBPaUJIYVdGdWRDQkZZV2RzWlNCR1pXRjBhR1Z5UEM5MFpYaDBQangwWlhoMElIZzlJakV3SWlCNVBTSXhNREFpSUdOc1lYTnpQU0ppWVhObElqNGdSSFZ5WVhScGIyNDZJRE13SUUxcGJuVjBaWE04TDNSbGVIUStQQzl6ZG1jKyJ9"
    expect(result).to.equal(expected)
  });
});
