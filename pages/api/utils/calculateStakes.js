const axios = require("axios");
const { MongoClient } = require("mongodb");
const { default: BigNumber } = require("bignumber.js");

const calculateStakes = async (from_block, to_block) => {
  if (!from_block || !to_block) {
    return;
  }
  // return;

  const response = await axios.post(
    "https://deep-index.moralis.io/api/v2/0x2A3f235599E2F6b199Ebe488F41988A050958837/events",
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "staker",
          type: "address",
        },
        {
          indexed: false,
          internalType: "bytes32",
          name: "stakeId",
          type: "bytes32",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "endsAt",
          type: "uint256",
        },
      ],
      name: "Staked",
      type: "event",
    },
    {
      params: {
        chain: "bsc",
        from_block,
        to_block,
        topic:
          "0xa98fe7d2204baa1060672de0612aecc1197e5cd1fc4bb5e6f5f4b8c357052e8e",
      },
      headers: {
        accept: "application/json",
        "X-API-Key":
          "vRndH8LmARZ9pyllhyFofMJoJDqXt63QJGDBxTs3SsxDMmGjZtD2x1YmPbOVpINJ",
        "Content-Type": "application/json",
      },
    }
  );

  const events = response.data.result;
  const cumulativeStakes = {
    oneMonth: "0",
    threeMonths: "0",
    sixMonths: "0",
    twelveMonths: "0",
    lastBlockFetched: to_block,
  };

  for (var i = 0; i < events.length; i++) {
    const event = events[i];
    const stakePeriodMilliseconds =
      new Date(parseInt(event.data.endsAt) * 1000) -
      new Date(event.block_timestamp);
    const stakePeriodMonths =
      stakePeriodMilliseconds / 1000 / (60 * 60 * 24 * 30);
    if (stakePeriodMonths == 12) {
      cumulativeStakes.twelveMonths = new BigNumber(
        cumulativeStakes.twelveMonths
      )
        .plus(new BigNumber(event.data.amount))
        .toString();
    } else if (stakePeriodMonths == 6) {
      cumulativeStakes.sixMonths = new BigNumber(cumulativeStakes.sixMonths)
        .plus(new BigNumber(event.data.amount))
        .toString();
    } else if (stakePeriodMonths == 3) {
      cumulativeStakes.threeMonths = new BigNumber(cumulativeStakes.threeMonths)
        .plus(new BigNumber(event.data.amount))
        .toString();
    } else {
      cumulativeStakes.oneMonth = new BigNumber(cumulativeStakes.oneMonth)
        .plus(new BigNumber(event.data.amount))
        .toString();
    }
  }

  const client = await MongoClient.connect(
    `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.vzlal.mongodb.net/`
  );
  const db = client.db("bedrock");
  const collection = db.collection(process.env.MONGODB_COLLECTION_CONFIG);
  await collection.findOneAndUpdate(
    { key: "stakes" },
    {
      $set: {
        value: cumulativeStakes,
      },
    }
  );
  await client.close();
};

module.exports = calculateStakes;
