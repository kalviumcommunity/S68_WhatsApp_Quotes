const express = require("express");
const router = express.Router();

// const { error } = require("console");
const Whats = require("./Model/Schema");

router.post("/post", async (req, res) => {
    try {
        const { name, email, quote } = req.body;

        if (!name || !email || !quote) {
            return res.status(400).json({ Message: "All fields are required." });
        }

        const isexist = await Whats.findOne({ quote: quote.trim().toLowerCase() });
        if (isexist) {
            console.log(isexist);
            return res.status(400).json({ Message: "The quote already exists :(" });
        }

        const wquote = new Whats({
            name: name,
            email: email,
            quote: quote
        });

        console.log(wquote);
        await wquote.save();
        
        res.status(200).json({ Message: "Successfully added the quote using post req!" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ Message: "Sorry there was an internal error with the post req", error: err.message });
    }
});

 router.put("/update/:id", async (req, res) => {
    try {
        const newdata = req.body;
        const { quote } = newdata;
        const isexist = await Whats.findOne({ quote: quote });
        if (!isexist) {
            return res.status(400).json({ Message: "The quote does not exist..." });
        }
        await Whatsapp.updateOne({ _id: req.params.id }, newdata);
        res.status(200).json({ Message: "Successfully updated the quote!" });
    } catch (err) {
        res.status(500).json({
            message: "Sorry bad request",
            error: err
        });
    }
});

router.get("/fetch", async (req, res) => {
    try {
        const { quote } = req.query;
        const isexist = await Whats.findOne({ quote: quote });
        if (!isexist) {
            return res.status(400).json({ Message: "could not find!" });
        }
        res.status(200).json({
            message: "found the quote",
            quote: quote
        });
    } catch (err) {
        res.status(500).json({ Message: "bad request there has been an internal server error" });
    }
});

 router.delete("/del/:id", async (req, res) => {
    try {
        const { quote } = req.body;
        const isexist = await Whats.findOne({ quote: quote });
        if (!isexist) {
            return res.status(400).json({ Message: "The quote does not exist..." });
        }
        await Whatsapp.deleteOne({ _id: req.params.id });
        res.status(200).json({ Message: "Successfully deleted the quote!" });
    } catch (err) {
        res.status(500).json({ Message: "Sorry there was an internal error", error: err });
    }
});
router.get("/fetchall", async (req, res) => {
    try {
        const all = await Whats.find();
        console.log(all)
        res.send(all);
    } catch (err) {
        res.status(500).json({ Message: "Sorry there was an internal error", error: err });
    }
});

module.exports = router;