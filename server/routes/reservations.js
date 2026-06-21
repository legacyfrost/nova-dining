const express = require("express");
const router = express.Router();
const db = require("../db");

async function logActivity(userId, action){

try{
await db.query(
`
INSERT INTO activity_logs
(user_id, action)

VALUES($1,$2)
`,

[
userId,
action
]

);

}catch(err){

console.log(err.message);

}

}

router.get("/:userId", async(req,res)=>{

try{

const result = await db.query(

`
SELECT

reservations.id,

users.name,

users.email,

restaurant_tables.table_number,

reservations.reservation_date,

reservations.reservation_time

FROM reservations

JOIN users
ON reservations.user_id = users.id

JOIN restaurant_tables
ON reservations.table_id = restaurant_tables.id

WHERE reservations.user_id = $1

ORDER BY reservations.id DESC
`,

[
req.params.userId
]

);

res.json(result.rows);

}catch(err){

res.status(500).json({

error:err.message

});

}

});

router.post("/", async(req,res)=>{

try{

const {
user_id,
table_id,
date,
time
} = req.body;
const selectedDate = new Date(date);
const today = new Date();

today.setHours(0,0,0,0);

if (selectedDate < today) {
    return res.status(400).json({
        message: "Cannot reserve a past date"
    });
}
const result = await db.query(

`
INSERT INTO reservations
(
user_id,
table_id,
reservation_date,
reservation_time
)

VALUES($1,$2,$3,$4)

RETURNING *
`,

[
user_id,
table_id,
date,
time
]

);

await db.query(

`
UPDATE restaurant_tables

SET status='reserved'

WHERE id=$1
`,

[
table_id
]

);

// Get table number for logs

const tableInfo = await db.query(

`SELECT table_number
FROM restaurant_tables
WHERE id=$1`,

[
table_id
]

);

await logActivity(

user_id,

`Booked table ${tableInfo.rows[0].table_number}`

);

res.json(result.rows[0]);

}catch(err){

res.status(500).json({

error:err.message

});

}

});

// ===============================
// CANCEL RESERVATION
// ===============================

router.delete("/:id", async(req,res)=>{

try{

// get reservation info

const reservation = await db.query(

`
SELECT

reservations.user_id,

reservations.table_id,

restaurant_tables.table_number

FROM reservations

JOIN restaurant_tables

ON reservations.table_id = restaurant_tables.id

WHERE reservations.id=$1
`,

[
req.params.id
]

);

if(reservation.rows.length > 0){

await db.query(

`
UPDATE restaurant_tables

SET status='available'

WHERE id=$1
`,

[
reservation.rows[0].table_id
]

);

await logActivity(

reservation.rows[0].user_id,

`Cancelled reservation for table ${reservation.rows[0].table_number}`

);

}

await db.query(

`
DELETE FROM reservations

WHERE id=$1
`,

[
req.params.id
]

);

res.json({

message:"Reservation cancelled"

});

}catch(err){

res.status(500).json({

error:err.message

});

}

});

module.exports = router;
