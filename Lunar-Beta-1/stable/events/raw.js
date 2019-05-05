const events = {
  MESSAGE_REACTION_ADD: "messageReactionAdd",
  MESSAGE_REACTION_REMOVE: "messageReactionRemove",
};// This event handles adding/removing users from the role(s) they chose
module.exports = async (event, client) => {
  // `event.t` is the raw event name
  if (!events.hasOwnProperty(event.t)) return;

  const { d: data } = event;
  const user = client.users.get(data.user_id);
  const channel = client.channels.get(data.channel_id) || await user.createDM();

  // if the message is already in the cache, don't re-emit the event
  if (channel.messages.has(data.message_id)) return;

  // if you're on the master/v12 branch, use `channel.messages.fetch()`
  const message = await channel.fetchMessage(data.message_id);

  // custom emojis reactions are keyed in a `name:ID` format, while unicode emojis are keyed by names
  // if you're on the master/v12 branch, custom emojis reactions are keyed by their ID
  const emojiKey = (data.emoji.id) ? `${data.emoji.name}:${data.emoji.id}` : data.emoji.name;
  const reaction = message.reactions.get(emojiKey);

  client.emit(events[event.t], reaction, user);
};