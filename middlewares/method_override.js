
const methodOverride = require("method-override")

//method override is fn return a func
function callback (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      var method = req.body._method
      delete req.body._method
      return method
    }
}

// methodOverride is a function that returns another function
module.exports = methodOverride(callback)