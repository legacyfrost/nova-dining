const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/:userId", async (req, res) => {

    try {

        const result = await db.query(
            `SELECT
                reservations.id,
                restaurant_tables.table_number,
                reservations.reservation_date,
                reservations.reservation_time
             FROM reservations
             JOIN restaurant_tables
             ON reservations.table_id = restaurant_tables.id
             WHERE reservations.user_id = $1
             ORDER BY reservations.id DESC`,
            [req.params.userId]
        );

        res.json(result.rows);

    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }

});

module.exports = router;