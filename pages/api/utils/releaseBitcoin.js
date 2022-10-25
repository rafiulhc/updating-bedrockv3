const { MongoClient } = require("mongodb");
const Web3 = require("web3");
const BigNumber = require("bignumber.js");
const btcStakeAbi = require("./rockBitcoin.json");
const erc20Abi = require("./erc20Abi.json");

const release_interval = process.env.NETWORK_ID == 56 ? 8.64e7 : 60000;
let releasing = false;

exports.releaseBitcoin = async () => {
  const client = await MongoClient.connect(
    `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.vzlal.mongodb.net/`
  );
  const db = client.db("bedrock");
  const releases = db.collection(process.env.MONGODB_COLLECTION_BITCOINRELEASE);
  var rel = await releases.find({ key: "rel" }).toArray();
  rel = rel[0].value;

  const lastReleaseTimeStamp = rel[0];
  const pendingBtcUnclaimed = rel[1];

  if (Date.now() - lastReleaseTimeStamp < release_interval || releasing) {
    client.close();
    return parseInt(lastReleaseTimeStamp) + release_interval;
  }
  releasing = true;

  const web3 = new Web3(process.env.RPC_URL);
  const btcStakeContract = new web3.eth.Contract(
    btcStakeAbi,
    process.env.BTCSTAKING_CONTRACT
  );
  const bedrockContract = new web3.eth.Contract(
    erc20Abi,
    process.env.BEDROCK_CONTRACT
  );
  const bitcoinContract = new web3.eth.Contract(
    erc20Abi,
    process.env.WBTC_CONTRACT
  );

  const totalRock = await bedrockContract.methods
    .balanceOf(process.env.BTCSTAKING_CONTRACT)
    .call();
  let btcBalance = await bitcoinContract.methods
    .balanceOf(process.env.BTCSTAKING_CONTRACT)
    .call();
  btcBalance = new BigNumber(btcBalance).minus(
    new BigNumber(pendingBtcUnclaimed)
  );
  const releaseAmount = new BigNumber(btcBalance).multipliedBy(0.01).toFixed(0);

  const collection = db.collection(process.env.MONGODB_COLLECTION_BITCOINSTAKE);

  var wallet = "";
  for (let i = 1; ; i++) {
    try {
      wallet = await btcStakeContract.methods.stakerWallets(i).call();
    } catch (_) {
      break;
    }

    const rockStaked = await btcStakeContract.methods.rockStakes(wallet).call();
    const poolShare = new BigNumber(rockStaked)
      .dividedBy(new BigNumber(totalRock))
      .toFixed();

    if (poolShare && poolShare > 0 && poolShare <= 1) {
      let staked = await collection.find({ wallet }).toArray();

      if (staked.length == 0) {
        await collection.insertOne({
          wallet,
          amount: 0,
        });
        staked = await collection.find({ wallet }).toArray();
      }

      const new_share = new BigNumber(releaseAmount).multipliedBy(
        new BigNumber(poolShare)
      );

      await collection.findOneAndUpdate(
        { wallet },
        {
          $set: {
            amount: new BigNumber(staked[0].amount).plus(new_share).toFixed(0),
          },
        }
      );
    }
  }

  await releases.findOneAndUpdate(
    { key: "rel" },
    {
      $set: {
        value: [
          (parseInt(lastReleaseTimeStamp) + release_interval).toString(),
          new BigNumber(pendingBtcUnclaimed)
            .plus(new BigNumber(releaseAmount))
            .toFixed(),
        ],
      },
    }
  );
  client.close();
  releasing = false;
  return parseInt(lastReleaseTimeStamp) + 2 * release_interval;
}
this.releaseBitcoin();