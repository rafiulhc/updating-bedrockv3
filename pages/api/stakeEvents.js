const Web3 = require('web3')
const { MongoClient } = require('mongodb')
const abi = require(__dirname + '/utils/staking.json')

const stakeEvents = () => {
  try {
    let options = {
      clientConfig: {
        // Useful to keep a connection alive
        keepalive: true,
        keepaliveInterval: 100000, // ms
      },

      reconnect: {
        auto: true,
        maxAttempts: 5,
        onTimeout: false,
      },
    }
    const webSocket =
      'wss://speedy-nodes-nyc.moralis.io/df800cc67c2b4ffd5f3e4005/bsc/testnet/ws'
    const provider = new Web3.providers.WebsocketProvider(webSocket, options)
    const web3 = new Web3(provider)

    //In case of testing contract: testnet addr 0x11f0Fa868cAC1e0a4b2983cDa07094714719Fb8e, start from block: 18464058
    // const address = "";
    const address = '0x2A3f235599E2F6b199Ebe488F41988A050958837'
    const contract = new web3.eth.Contract(abi, address)
    let eventArr = []
    let latestBlock
    let oneMonth = 0
    let threeMonth = 0
    let sixMonth = 0
    let twelveMonth = 0

    let subscribeEvents = () => {
      var subscription = web3.eth
        .subscribe('logs', {
          address: address,
          topics: [
            '0xa98fe7d2204baa1060672de0612aecc1197e5cd1fc4bb5e6f5f4b8c357052e8e',
          ],
        })
        .on('connected', async function (subscriptionId) {
        
        })
        .on('data', async function (event) {
          

          const id = event.data.slice(0, 66)
          
          const stakeInfo = await contract.methods
            .getStakeInformation(id)
            .call()
          const stakeAmount = parseInt(stakeInfo.amount) / 10 ** 18
          if (stakeInfo.stakingPeriod == '2592000') {
            oneMonth += stakeAmount
          } else if (stakeInfo.stakingPeriod == '7776000') {
            threeMonth += stakeAmount
          } else if (stakeInfo.stakingPeriod == '15552000') {
            sixMonth += stakeAmount
          } else if (stakeInfo.stakingPeriod == '31104000') {
            twelveMonth += stakeAmount
          }

      
          const client = await MongoClient.connect(
            `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.vzlal.mongodb.net/`
          )
          const db = client.db('bedrock')
          const collection = db.collection(
            process.env.MONGODB_COLLECTION_BITCOINRELEASE
          )
          collection.updateOne(
            { key: 'stake-metrics' }, // specifies the document to update
            {
              $set: { value: [oneMonth, threeMonth, sixMonth, twelveMonth] },
              $currentDate: { lastModified: true },
            }
          )
        })
        .on('error', function (error, receipt) {
          console.error(error)
        })
    }

    const getEvents = async () => {
      //Transaction block = 13652035
      latestBlock = await web3.eth.getBlockNumber()

      for (let i = 13652035; i <= latestBlock; i = i + 5000) {
        const res = await contract.getPastEvents('Staked', {
          fromBlock: i,
          toBlock: i + 5000,
        })
        eventArr.push(...res)
      }
      for (let j = 0; j < eventArr.length; j++) {
        const id = eventArr[j].returnValues.stakeId
        const stakeInfo = await contract.methods.getStakeInformation(id).call()
        const stakeAmount = parseInt(stakeInfo.amount) / 10 ** 18
        if (stakeInfo.stakingPeriod == '2592000') {
          oneMonth += stakeAmount
        } else if (stakeInfo.stakingPeriod == '7776000') {
          threeMonth += stakeAmount
        } else if (stakeInfo.stakingPeriod == '15552000') {
          sixMonth += stakeAmount
        } else if (stakeInfo.stakingPeriod == '31104000') {
          twelveMonth += stakeAmount
        }
      }

      subscribeEvents()

      
      const client = await MongoClient.connect(
        `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.vzlal.mongodb.net/`
      )
      const db = client.db('bedrock')
      const collection = db.collection(
        process.env.MONGODB_COLLECTION_BITCOINRELEASE
      )
      collection.updateOne(
        { key: 'stake-metrics' }, // specifies the document to update
        {
          $set: { value: [oneMonth, threeMonth, sixMonth, twelveMonth] },
          $currentDate: { lastModified: true },
        }
      )
    }

    getEvents()
  } catch {
    ;(err) => console.log('Staking errors', err)
  }
}
module.exports = stakeEvents
