import { token as _token } from './config.json';
import { ShardingManager } from 'discord.js';
const shard = new ShardingManager('./index.js', {
  token: _token,
  autoSpawn: true
});
shard.on('message', (shard, message) => {
	console.log(`Shard[${shard.id}] : ${message._eval} : ${message._result}`);
});
shard.spawn(2);

shard.on('launch', shard => console.log(`[SHARD] Shard ${shard.id}/${shard.totalShards}`));