class ShardingUtils {
  constructor () {}
  async getServer(client, id) {
    return new Promise(async function (resolve, reject) {
      client.shard.broadcastEval('this.guilds.get("'+ id +'")').then(results => {
        for (var i = 0; i < results.length; i++) {
          if (results[i] != null && results[i] != undefined && results[i].length > 10) {
            resolve(results[i])
          }
        }
      });
    });
  }
  async getUser(client, id) {
    return new Promise(async function (resolve, reject) {
      client.shard.broadcastEval('this.users.get("'+ id +'")').then(results => {
        for (var i = 0; i < results.length; i++) {
          if (results[i] != null && results[i] != undefined) {
            resolve(results[i])
          }
        }
      });
    });
  }
}
module.exports = ShardingUtils