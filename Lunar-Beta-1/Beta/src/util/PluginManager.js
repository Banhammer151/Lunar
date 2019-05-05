var fs = require('fs')
var loadedPlugins = []
class PluginLoader {
  constructor () {}
  async loadPlugin (name) {
    try {
      var pluginRequire = require('/app/src/plugins/'+ name +'.js');
      var plugin = new pluginRequire()
      plugin.main()
      loadedPlugins.push(plugin.name +"@"+ plugin.version)
      console.log(plugin.name +" v"+ plugin.version +" loaded with sucess.")
    } catch (e) {
      console.log(e)
    }
  }
  async loadPlugins () {
    console.log("Loading plugins...")
    try {
      fs.readdirSync('/app/src/plugins/', (err, plugins) => {
        if (err) console.warn(err)
        if (plugins.length <= 0) return console.log("No plugins found...");
        console.log("Loading "+ plugins.length +" plugins...");
        plugins.forEach(plugin => {
          this.loadPlugin(plugin.split(".")[0])
        });
      });
      console.log("Sucess loading all plugins.")
    } catch (e) {
      console.log("FAIL!ERR!\n"+e)
    }
  }
  async loadedPlugins () {
    return this.loadedPlugins
  }
}

module.exports = PluginLoader