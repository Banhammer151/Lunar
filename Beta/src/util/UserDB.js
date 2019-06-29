/* eslint-disable linebreak-style */
var mongoose = require("mongoose");
var {users, guilds} = require ("./MongoSchemas");
class UserDB {
  constructor(opt = {}) {
    if (!opt.uri) throw new ReferenceError("No Mongo URI passed to this class.");
    this._auth = opt.uri;
    
    this.connect(this._auth);
  }
  connect(uri) {
    mongoose.connect(uri, { useNewUrlParser: true });
    var conec = mongoose.connection;
    conec.on("error", (e) => console.warn(e));
    conec.once("open", () => console.log("[LunarUserDB] Connected."));
  }
  writeUser(id, obj) {
    return new Promise (function(res, rej) {
      users.findOne({ _id: id }, function(e, d) {
        if (e) return rej(e);
        if (!d) return rej("User not found. You should check if the user exists before trying edit it, stupid.");
        d = obj;
        d.save();
        return res(true);
      });
    });
  }
  getUser(id) {
    return new Promise (function(res, rej) {
      users.findOne({ _id: id }, function(e, d) {
        if (e) return rej(e);
        if (!d) {
          var user = new users({
            _id: id
          });
          user.save();
          return res(user);
        }
        res(d);
      });
    });
  }
  hasUser(id) {
    return new Promise(function(res, rej) {
      users.findOne({ _id: id }, function(e, d) {
        if (e) return rej(e);
        if (!d) return res(false);
        else return res(true);
      });
    });
  }
  // getGuilds() {
  //   return new Promise (function(res, rej) {
  //     guilds.find({}, function(err, guilds) {
  //       var userMap = {};

  //       guilds.forEach(function(guild) {
  //         userMap[guild.bumpChannel] = guild;
  //       });

  //       console.log(userMap);  
  //     });
  //   });

  // }
  getGuild(id) {
    return new Promise (function(res, rej) {
      guilds.findOne({ _id: id }, function(e, d) {
        if (e) return rej(e);
        if (!d) {
          var guild = new guilds({
            _id: id
          });
          guild.save();
          return res(guild);
        }
        res(d);
      });
    });
  }
  getRandomGuild(id) {
    return new Promise (function( res, rej) {
      guilds.aggregate([
        { 
          $project:{
            _id: {$ne:["_id", id]},
            globalChat: true                            
              
            
          }
        }], function(e, d) {
        if (e) return rej(e);
        if (!d) {
          var guild = new guilds({
            
          });
          //guild.save();
          return res(guild);
        }
        res(d);
      });
    });
  }
  hasGuild(id) {
    return new Promise(function(res, rej) {
      guilds.findOne({ _id: id }, function(e, d) {
        if (e) return rej(e);
        if (!d) return res(false);
        else return res(true);
      });
    });
  }
  writeGuild(id, obj) {
    return new Promise (function(res, rej) {
      guilds.findOne({ _id: id }, function(e, d) {
        if (e) return rej(e);
        if (!d) return rej("Guild not found. You should check if the user exists before trying edit it, stupid.");
        d = obj;
        d.save();
        return res(true);
      });
    });
  }
  // getBump(id) {
  //   return new Promise (function(res, rej) {
  //     bump.findOne({ _id: id }, function(e, d) {
  //       if (e) return rej(e);
  //       if (!d) {
  //         var bump = new bump({
  //           _id: id
  //         });
  //         bump.save();
  //         return res(bump);
  //       }
  //       res(d);
  //     });
  //   });
  // }
  // getRandomBump() {
  //   return new Promise (function(res, rej) {
  //     bump.aggregate([
  //       {$match: {bumpEn:true}}, // filter the results
  //       {$sample: {size: 5}} // You want to get 5 docs
  //     ], function(e, d) {
  //       if (e) return rej(e);
  //       // eslint-disable-next-line no-empty
  //       if (!d) {
         
          
  //       }
  //       res(d);
  //     });
  //   });
  // }
  // hasBump(id) {
  //   return new Promise(function(res, rej) {
  //     bump.findOne({ _id: id }, function(e, d) {
  //       if (e) return rej(e);
  //       if (!d) return res(false);
  //       else return res(true);
  //     });
  //   });
  // }
  // writeBump(id, obj) {
  //   return new Promise (function(res, rej) {
  //     bump.findOne({ _id: id }, function(e, d) {
  //       if (e) return rej(e);
  //       if (!d) return rej("Guild not found. You should check if the user exists before trying edit it, stupid.");
  //       d = obj;
  //       d.save();
  //       return res(true);
  //     });
  //   });
  // }
}

module.exports = UserDB;