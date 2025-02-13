const express = require("express");
const router = express.Router();
const Whatsapp = require("./Model/Schema");
const { error } = require("console");

const create = router.post("/post", async (req, res) => {
    try {
        const newdata = req.body;
        const { quote } = newdata;
        const isexist = await Whatsapp.findOne({ quote: quote });
        if (isexist) {
            return res.status(400).json({ Message: "The quote already exists :(" });
        }
        const saved = await Whatsapp.create(newdata);
        res.status(200).json({ Message: "Successfully added the quote!" });
    } catch (err) {
        res.status(500).json({ Message: "Sorry there was an internal error", error: err });
    }
});

const update = router.put("/update/:id", async (req, res) => {
    try {
        const newdata = req.body;
        const { quote } = newdata;
        const isexist = await Whatsapp.findOne({ quote: quote });
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

const get = router.get("/fetch", async (req, res) => {
    try {
        const { quote } = req.query;
        const isexist = await Whatsapp.findOne({ quote: quote });
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

const del = router.delete("/del/:id", async (req, res) => {
    try {
        const { quote } = req.body;
        const isexist = await Whatsapp.findOne({ quote: quote });
        if (!isexist) {
            return res.status(400).json({ Message: "The quote does not exist..." });
        }
        await Whatsapp.deleteOne({ _id: req.params.id });
        res.status(200).json({ Message: "Successfully deleted the quote!" });
    } catch (err) {
        res.status(500).json({ Message: "Sorry there was an internal error", error: err });
    }
});

module.exports = router;