var { get } = require('snekfetch')

class NSFWCheck {
  constructor (opt = {}) {}
  async check (url, key) {
    return new Promise(async function (full, reje) {
      await get('https://www.moderatecontent.com/api/v2?key='+ key +'&url='+ url).then(async (result) => {
        if (result.body.error_code !== 0) {
          return reje("ERR! Code "+ result.body.error_code);
        } else {
          full(result.body.rating_label)
        }
      }).catch(err => {
        reje(err)
      });
    });
  }
}

module.exports = NSFWCheck