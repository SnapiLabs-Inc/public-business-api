const axios = require('axios')
const log = require('ololog').configure({ time: true })
const Config = require('../common/config');


// exports.getTokenBalance = async (contractAddress,address) => {
//     if(Contract == null || address == null){
//         return 0;
//     }

//     let balance = 0;
//     let payload = {
//       params: {
//         module: 'account',
//         action: 'tokenbalance',
//         contractaddress: contractAddress,
//         address: address,
//         tag: 'latest',
//         apikey: Config.EtherScanKey 
//       }
//     }

//     let response = await axios.get('https://api.etherscan.io/api',payload);
//     console.log(response.data)
//     if (response.data.status && response.data.message == 'OK') {

//       	balance = response.data.result;
//     }

//     return balance;
// }