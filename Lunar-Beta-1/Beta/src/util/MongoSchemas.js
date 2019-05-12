/* eslint-disable linebreak-style */
var mongoose = require("mongoose");


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
    default: "Change this text using @Lunar aboutme."
  },
  background: {
    type: String,
    default: "https://steamuserimages-a.akamaihd.net/ugc/915801223659353008/E8096A16B38A92351E3EE2F1B32BCD1C9A1CC8D5/"
  },
  marry: {
    type: String,
    default: "not"
  },
  banned: {
    type: Boolean,
    default: false
  }
});

var serverSchema = new mongoose.Schema({
  eventLog: {
    type: Boolean,
    default: false
  },
  eventLogChannel: {
    type: String,
    default: "no"
  },
  globalChat: {
    type: Boolean,
    default: false
  },
  globalChatChannel: {
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
  },
  welcomemsg:{
    type: String,
    default: "Welcome To The Server! {{user}}"
  },
  welcomeMsgEn:{
    type: Boolean,
    default: false
  },
  welcomeMsgChannel:{
    type: String,
    default: "no"
  }
 
});


var modelUsers = mongoose.model("users", userSchema);
var modelGuilds = mongoose.model("guilds", serverSchema);

exports.users = modelUsers;
exports.guilds = modelGuilds;