const { Client } = require("pg") //save to db

const bcrypt = require("bcrypt")



const db = new Client({
    database: "goodfoodhunting"
})

db.connect()

const email = "ds@gmail.com"
const plainTextPassword = "pudding"

bcrypt.genSalt(10, (err,salt) => {
    bcrypt.hash(plainTextPassword,salt, (err, digestedPassword) => {
       const sql = `insert into users (email,password_digest) values ('${email}','${digestedPassword}');`



       db.query(sql,(err,dbRes) => {
        console.log(err)
        db.end
       })
    })
})