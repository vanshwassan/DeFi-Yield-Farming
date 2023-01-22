# Staking DAPP Using dAPIs

> dAPP to stake Mock Wrapped ETH or any ERC20 token to earn DAPP Tokens of the same equivalent staked value in USD using API3's dAPIs on Polygon Mumbai Testnet.

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)

## Installation

- Install dependencies

```sh
yarn
```

- Enter credentials

```sh
cp credentials.example.json credentials.json

# ..and populate credentials.json with your mnemonic
```

## Deploy the Contracts and set dAPIs

- Compile the contracts

```sh
yarn compile
```

- To deploy and set all the dAPI and Contract addresses

```sh
yarn deploy
```

- Head on to [API3 Market](https://market.api3.org) and get access to the dAPIs so that the dAPP can access them. They are free to use on Mumbai Testnet. Just head on to it, enter your Staking contract's address, click on request access and approve the transactions.
    - For `ETH/USD` on Polygon Mumbai - [ETH/USD dAPI](https://market.api3.org/dapis/polygon-testnet/ETH-USD)
    - For `USDC/USD` on Polygon Mumbai - [USDC/USD dAPI](https://market.api3.org/dapis/polygon-testnet/USDC-USD)

## Using the dAPP

- Import the `DappToken` contract address in your account's Metamask and send all the `DAPP` to the Staking Contract. The Staking contract will control all the `DAPP` Tokens

- Also import the `Wrapped ETH` contract address in your account's Metamask. `WETH` will be used to stake and earn `DAPP` Tokens. Don't send this directly to the staking contract.

### Staking WETH

- To stake `WETH`

```sh
yarn stake
```

- To issue and send `DAPP` rewards back to the Staker

```sh
yarn issue
```

### Unstaking WETH
- To unstake and get back your WETH

```sh
yarn unstake
```

- As any user can stake/unstake WETH, you can try running `yarn stake` and `yarn unstake` with a different mnemonic with enough gas to make the trasnactions.

- Only the owner (the address that deployed the contract) can issue the rewards - run `yarn stake` command.