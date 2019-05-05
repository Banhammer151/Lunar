exports.run = async (msg) => {
  msg = msg.replace(process.env.TOKEN, "TOKEN")
  console.log(msg)
}