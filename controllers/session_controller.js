const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')

const db = require("./../db")

router.get("/login", (req, res) => {
    res.render("login")
})


router.post('/sessions', (req, res) => {
    const { email, password } = req.body

const sql = `SELECT * FROM users WHERE email = $1;`


db.query(sql, [email], (err, dbRes) => {
    if(dbRes.rows.length === 0){
        res.render("login")
        return
    }

    const user = dbRes.rows[0]

    bcrypt.compare(password,dbRes.rows[0].password_digest,(err,result) => {
        if (result){
            req.session.userID = user.id
     
            res.redirect('/')
        } 
        else{
            res.render("login")
        }
    })

})
  
})
 router.delete("/sessions", (req,res) => {
    req.session.destroy(() => {
        res.redirect("/login")
    })
 })


module.exports = router