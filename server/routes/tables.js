const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", async(req,res)=>{


const result =
await db.query(`

SELECT

restaurant_tables.*,

users.name as user_name,

users.email,

reservations.reservation_date,

reservations.reservation_time


FROM restaurant_tables


LEFT JOIN reservations

ON restaurant_tables.id =
reservations.table_id


LEFT JOIN users

ON reservations.user_id =
users.id


ORDER BY table_number


`);


res.json(result.rows);


});

module.exports = router;