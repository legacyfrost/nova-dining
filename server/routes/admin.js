const express = require("express");
const router = express.Router();
const db = require("../db");
const nodemailer = require("nodemailer");


const transporter = nodemailer.createTransport({

service:"gmail",

auth:{

user:process.env.EMAIL_USER,

pass:process.env.EMAIL_PASS

}

});




// ACTIVITY LOGGER

async function logActivity(userId,action){

try{

await db.query(

`
INSERT INTO activity_logs
(user_id,action)
VALUES($1,$2)
`

,

[
userId,
action
]

);

}catch(err){

console.log(err.message);

}

}







// =====================
// STATS
// =====================


router.get("/stats",async(req,res)=>{


try{


const users = await db.query(
"SELECT COUNT(*) FROM users"
);


const tables = await db.query(
"SELECT COUNT(*) FROM restaurant_tables"
);


const reservations = await db.query(
"SELECT COUNT(*) FROM reservations"
);



const availableTables = await db.query(

"SELECT COUNT(*) FROM restaurant_tables WHERE status='available'"

);




res.json({

totalUsers:users.rows[0].count,

totalTables:tables.rows[0].count,

totalReservations:reservations.rows[0].count,

availableTables:availableTables.rows[0].count

});



}catch(err){

res.status(500).json({
error:err.message
});

}


});









// =====================
// RESERVATIONS
// =====================


router.get("/reservations",async(req,res)=>{


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


ORDER BY reservations.id DESC


`

);



res.json(result.rows);



}catch(err){

res.status(500).json({
error:err.message
});

}


});









// =====================
// USERS
// =====================


router.get("/users",async(req,res)=>{


try{


const result = await db.query(

`

SELECT

id,
name,
email,
is_admin,
is_super_admin

FROM users

ORDER BY id


`

);



res.json(result.rows);



}catch(err){

res.status(500).json({
error:err.message
});

}


});











// =====================
// TABLES FOR ADMIN
// =====================


router.get("/tables",async(req,res)=>{


try{


const result = await db.query(

`

SELECT

restaurant_tables.id,

restaurant_tables.table_number,

restaurant_tables.seats,

restaurant_tables.status,


users.name AS user_name,

users.email,


reservations.reservation_date,

reservations.reservation_time



FROM restaurant_tables


LEFT JOIN reservations

ON restaurant_tables.id = reservations.table_id


LEFT JOIN users

ON reservations.user_id = users.id



ORDER BY restaurant_tables.table_number


`

);



res.json(result.rows);



}catch(err){

res.status(500).json({
error:err.message
});

}


});











// =====================
// ADD TABLE
// =====================


router.post("/tables",async(req,res)=>{


try{


const {

table_number,

seats

}=req.body;



const result = await db.query(

`

INSERT INTO restaurant_tables

(table_number,seats,status)

VALUES($1,$2,'available')


RETURNING *

`

,

[

table_number,

seats

]

);




await logActivity(
1,
`Created table ${table_number}`
);



res.json(result.rows[0]);



}catch(err){

res.status(500).json({
error:err.message
});

}


});
// =====================
// EDIT TABLE SEATS
// =====================


router.put("/tables/:id",async(req,res)=>{


try{


const {seats}=req.body;



await db.query(

`

UPDATE restaurant_tables

SET seats=$1

WHERE id=$2

`

,

[
seats,
req.params.id
]

);



await logActivity(
1,
`Updated table ${req.params.id} seats`
);



res.json({

message:"Updated"

});



}catch(err){

res.status(500).json({

error:err.message

});

}


});









// =====================
// UNBOOK TABLE
// =====================


router.put("/tables/:id/unbook",async(req,res)=>{


try{


await db.query(

`

UPDATE restaurant_tables

SET status='available'

WHERE id=$1

`

,

[
req.params.id
]

);



await db.query(

`

DELETE FROM reservations

WHERE table_id=$1

`

,

[
req.params.id
]

);




await logActivity(

1,

`Unbooked table ${req.params.id}`

);



res.json({

message:"Unbooked"

});



}catch(err){

res.status(500).json({

error:err.message

});

}


});











// =====================
// DELETE TABLE + EMAIL
// =====================


router.delete("/tables/:id",async(req,res)=>{


try{


const reservation = await db.query(

`

SELECT

reservations.id,

users.email,

users.name,

restaurant_tables.table_number


FROM reservations


JOIN users

ON reservations.user_id=users.id


JOIN restaurant_tables

ON reservations.table_id=restaurant_tables.id


WHERE restaurant_tables.id=$1


`

,

[
req.params.id
]

);






if(reservation.rows.length > 0){


const customer = reservation.rows[0];



await transporter.sendMail({


from:process.env.EMAIL_USER,

to:customer.email,


subject:"Reservation Update 🍽️",


html:

`

<h2>Hello ${customer.name}</h2>

<p>Your reservation was cancelled because the table was removed.</p>

<h3>Table ${customer.table_number}</h3>

`


});



await db.query(

`

DELETE FROM reservations

WHERE id=$1

`

,

[
customer.id
]

);


}





await db.query(

`

DELETE FROM restaurant_tables

WHERE id=$1

`

,

[
req.params.id
]

);




await logActivity(

1,

`Deleted table ${req.params.id}`

);





res.json({

message:"Table removed"

});



}catch(err){

res.status(500).json({

error:err.message

});

}


});









// =====================
// SUPER ADMIN USERS
// =====================


router.get("/super/users",async(req,res)=>{


const result = await db.query(

`

SELECT

id,

name,

email,

is_admin,

is_super_admin


FROM users

ORDER BY id


`

);



res.json(result.rows);


});








// MAKE ADMIN

router.put("/super/make-admin/:id",async(req,res)=>{


await db.query(

`

UPDATE users

SET is_admin=true

WHERE id=$1


`

,

[
req.params.id
]

);



await logActivity(

1,

`Promoted user ${req.params.id}`

);



res.json({

message:"Admin added"

});



});









// REMOVE ADMIN


router.put("/super/remove-admin/:id",async(req,res)=>{


await db.query(

`

UPDATE users

SET is_admin=false

WHERE id=$1

`

,

[
req.params.id
]

);



await logActivity(

1,

`Removed admin ${req.params.id}`

);



res.json({

message:"Removed"

});



});









// DELETE USER


router.delete("/super/delete-user/:id",async(req,res)=>{


try{


const id=req.params.id;



await db.query(

`

DELETE FROM reservations

WHERE user_id=$1

`

,

[id]

);





await db.query(

`

DELETE FROM users

WHERE id=$1

`

,

[id]

);





await logActivity(

1,

`Deleted user ${id}`

);





res.json({

message:"Deleted"

});





}catch(err){


res.status(500).json({

error:err.message

});


}


});









// =====================
// ACTIVITY LOGS
// =====================


router.get("/activity",async(req,res)=>{


const result = await db.query(

`

SELECT

activity_logs.id,

users.name,

users.email,

activity_logs.action,

activity_logs.created_at


FROM activity_logs


LEFT JOIN users

ON users.id=activity_logs.user_id


ORDER BY activity_logs.created_at DESC


`

);



res.json(result.rows);


});









module.exports = router;