var mongoose = require('mongoose')


var userSchema = new mongoose.Schema({
  _id: {
    type: String
  },
  mentionWarn: {
    type: Boolean,
    default: false
  },
  xp: {
    type: Number,
    default: 0
  },
  money: {
    type: Number,
    default: 0
  },
  nextMoney: {
    type: String,
    default: "bypassMe"
  },
  rep: {
    type: Number,
    default: 0
  },
  nextRep: {
    type: String,
    default: "bypassMe"
  },
  sobremim: {
    type: String,
    default: "Change this text using @Kanori aboutme."
  },
  background: {
    type: String,
    default: "https://cdn.discordapp.com/attachments/446298803566542869/466264652087558165/IMG_20180625_224435.jpg"
  },
  marry: {
    type: String,
    default: 'not'
  },
  banned: {
    type: Boolean,
    default: false
  }
})

var serverSchema = new mongoose.Schema({
  eventLog: {
    type: Boolean,
    default: false
  },
  eventLogChannel: {
    type: String,
    default: "no"
  },
  antiMassPing: {
    type: Boolean,
    default: false
  },
  _id: {
    type: String
  },
  lang: {
    type: String,
    default: "en"
  },
  bwf: {
    type: Array,
    default: []
  },
  shop: { 
    type: Array,
    default: []
  }
})

var modelUsers = mongoose.model("users", userSchema)
var modelGuilds = mongoose.model("guilds", serverSchema)

exports.users = modelUsers
exports.guilds = modelGuilds