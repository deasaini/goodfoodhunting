const db = require("./../db")
//req a folder without a file,bydefault look for index.js

function setCurrentUser (req, res, next) {
    const { userId } = req.session
    res.locals.currentUser = {}
  
     if(userId) {
  
       const sql = `select id, email from users where id = ${userId}`
  
       db.query(sql, (err, dbRes) => {
       if (err) {
          console.log(err)
       } else {
          res.locals.currentUser = dbRes.rows[0]
          next() 
      }
     })
      } else {
      next()
    }
   
  }

  module.exports = setCurrentUser