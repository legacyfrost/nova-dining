const express = require("express");
const router = express.Router();
const db = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({

host:"smtp.gmail.com",
port:587,
secure:false,

auth:{
user:process.env.EMAIL_USER,
pass:process.env.EMAIL_PASS
},

family:4

});

async function logActivity(userId,action){

try{

await db.query(

`
INSERT INTO activity_logs
(user_id,action)

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

router.post("/register", async(req,res)=>{

try{

const {
name,
email,
password
}=req.body;


const exists = await db.query(
"SELECT * FROM users WHERE email=$1",
[email]
);


if(exists.rows.length > 0){

return res.status(400).json({
error:"Email already exists"
});

}


const pending = await db.query(
"SELECT * FROM pending_users WHERE email=$1",
[email]
);


if(pending.rows.length > 0){

await db.query(
"DELETE FROM pending_users WHERE email=$1",
[email]
);

}


const code =
Math.floor(
100000 +
Math.random()*900000
).toString();


await db.query(

`
INSERT INTO pending_users
(
name,
email,
password,
verification_code
)

VALUES($1,$2,$3,$4)
`

,
[
name,
email,
password,
code
]

);


await transporter.sendMail({

from:process.env.EMAIL_USER,

to:email,

subject:"Smart Restaurant Verification Code 🍽️",

html:

`
<h2>Welcome ${name} 🍽️</h2>

<p>Your verification code is:</p>

<h1>${code}</h1>
`

});


res.json({

message:"Verification code sent"

});


}catch(err){

console.log(err);

res.status(500).json({

error:err.message

});

}

});
// ===============================
// VERIFY EMAIL
// ===============================

router.post("/verify", async(req,res)=>{

try{

const {email,code}=req.body;


const result = await db.query(

`
SELECT *
FROM pending_users
WHERE email=$1
AND verification_code=$2
`

,
[
email,
code
]

);


if(result.rows.length===0){

return res.status(400).json({

error:"Invalid code"

});

}


const user = result.rows[0];


const hashedPassword =
await bcrypt.hash(user.password,10);



const createdUser = await db.query(

`
INSERT INTO users
(
name,
email,
password,
verified,
is_admin,
is_super_admin
)

VALUES($1,$2,$3,true,false,false)

RETURNING id

`

,
[
user.name,
user.email,
hashedPassword
]

);



await logActivity(

createdUser.rows[0].id,

"Registered account"

);



await db.query(

"DELETE FROM pending_users WHERE email=$1",

[email]

);



res.json({

message:"Email verified successfully"

});


}catch(err){

console.log(err);

res.status(500).json({

error:err.message

});

}

});
// ===============================
// LOGIN
// ===============================

router.post("/login", async(req,res)=>{

const {email,password}=req.body;

try{

const result = await db.query(

"SELECT * FROM users WHERE email=$1",

[email]

);

if(result.rows.length===0){

return res.status(400).json({

error:"User not found"

});

}

const user=result.rows[0];

if(user.verified === false){

return res.status(400).json({

error:"Please verify your email first"

});

}
console.log("checking password");
const match =
await bcrypt.compare(

password,

user.password

);
console.log("PASSWORD MATCH:", match);

if(!match){

return res.status(400).json({

error:"Wrong password"

});

}

await logActivity(

user.id,

"Logged in"

);

const token = jwt.sign(

{

id:user.id,

email:user.email,

is_admin:user.is_admin,

is_super_admin:user.is_super_admin

},

process.env.JWT_SECRET,

{
expiresIn:"1d"
}

);

res.json({

token,

user:{

id:user.id,

name:user.name,

email:user.email,

is_admin:user.is_admin,

is_super_admin:user.is_super_admin

}

});

}
catch(err){
  console.log("LOGIN ERROR:", err);
  res.status(500).json({
    error: err.message
  });
}

});
router.post("/forgot-password", async(req,res)=>{

try{

const {email}=req.body;

const result = await db.query(

"SELECT * FROM users WHERE email=$1",

[email]

);

if(result.rows.length===0){

return res.status(400).json({

error:"Email not found"

});

}

const code =
Math.floor(
100000 +
Math.random()*900000
).toString();

await db.query(

`

UPDATE users

SET reset_code=$1,

reset_expiry=NOW()+INTERVAL '10 minutes'

WHERE email=$2

`

,

[
code,
email
]

);

await logActivity(

result.rows[0].id,

"Requested password reset"

);

await transporter.sendMail({

from:process.env.EMAIL_USER,

to:email,

subject:"Smart Restaurant Password Reset 🔐",

html:

`

<h2>Password Reset</h2>

<h1>Your password reset code is 
:${code}</h1>

<p>Code expires in 10 minutes</p>

`

});

res.json({

message:"Reset code sent"

});

}catch(err){

res.status(500).json({

error:err.message

});

}

});

router.post("/reset-password", async(req,res)=>{

try{

const {

email,

code,

password

}=req.body;

const result = await db.query(

`

SELECT *

FROM users

WHERE email=$1

AND reset_code=$2

AND reset_expiry > NOW()

`

,

[
email,
code
]

);

if(result.rows.length===0){

return res.status(400).json({

error:"Invalid or expired code"

});

}

const hashedPassword =
await bcrypt.hash(password,10);

await db.query(

`

UPDATE users

SET password=$1,

reset_code=NULL,

reset_expiry=NULL

WHERE email=$2

`

,

[
hashedPassword,
email
]

);

await logActivity(

result.rows[0].id,

"Changed password"

);

res.json({

message:"Password changed successfully"

});

}catch(err){

res.status(500).json({

error:err.message

});

}

});

module.exports = router;
