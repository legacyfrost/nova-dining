const tableRoutes = require("./routes/tables");
const db = require("./db");
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const adminRoutes = require("./routes/admin");
const userRoutes = require("./routes/users");
const reservationRoutes = require("./routes/reservations");
const historyRoutes = require("./routes/history");

const app = express();

app.use(cors());
app.use(express.json());


app.use("/api/users", userRoutes);
app.use("/api/tables", tableRoutes);
app.use("/api/reservations", reservationRoutes);
app.use("/api/history", historyRoutes);
app.use("/api/admin", adminRoutes);

db.query("SELECT NOW()", (err, result) => {

    if (err) {

        console.log("Database connection failed ❌");
        console.log(err.message);

    } else {

        console.log("Database connected ✅");
        console.log(result.rows[0]);

    }

});


app.get("/", (req, res) => {

    res.json({
        message: "Smart Restaurant Reservation API is running 🚀"
    });

});


const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {

    console.log(`Server running on port ${PORT}`);

});