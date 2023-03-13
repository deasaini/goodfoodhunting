const express = require("express")
const router = express.Router()
const ensureLoggedIn = require("./../middlewares/ensure_logged_in")

const db = require("./../db")



router.get("/",(req,res) => {
    console.log(req.session)
    const sql = "SELECT * FROM dishes;"

db.query(sql, (err,dbRes) => {
    const dishes = dbRes.rows

    res.render("home", { dishes: dishes})
 })

})

    

router.get("/dishes/new", ensureLoggedIn, (req,res) => {
    res.render("new_dish")
})


router.get("/dishes/:id", (req, res) => {
    console.log("$1 = " + $1)
    const sql = `select * from dishes where id = $1;`
    console.log(sql)

db.query(sql, [req.params.id], (err, dbRes) =>{
    if (err) {
        console.log(err)
      } else {
        const dish = dbRes.rows[0]
        res.render("dish_details", { dish })
      }
    })
  })

  //get post redirect
  router.post("/dishes", (req, res) => {
    if (!req.session.userId) {
      res.redirect("/login")
      return
    }

  // prepare the SQL we're sending to the database
    const sql = `insert into dishes (title, image_url, user_id) values ($1, $2, $3);`

    db.query(sql, [req.body.title, req.body.image_url, res.session.userId], (err, dbRes) => {
        res.redirect("/")
      })
    })
   
router.get("/dishes/:dish_id/edit", (req, res) =>{

 const sql = `SELECT * FROM dishes WHERE id = $1;`

  db.query(sql, [req.params.dish_id], (err, dbRes) => {
    if (err) {
      console.log(err)
    } else {
      const dish = dbRes.rows[0]
      res.render("edit_dish", { dish: dish })
    }
  })
})


router.put("/dishes/:dish_id", (req, res) => {
  const sql = `UPDATE dishes SET title = $1, image_url = $2 WHERE id = $3;`

  db.query(
    sql,
    [req.body.title, req.body.image_url, req.params.dish_id],
    (err, dbRes) => {
      res.redirect(`/dishes/${req.params.dish_id}`)
    }
  )
})

router.delete("/dishes/:dish_id", (req,res) => {
    //console.log(req.params.dish_id)

 const sql = ` DELETE FROM dishes WHERE id = ${req.params.dish_id};`
 db.query(sql, (err, dbRes) => {
    res.redirect("/")
  })

})

module.exports = router