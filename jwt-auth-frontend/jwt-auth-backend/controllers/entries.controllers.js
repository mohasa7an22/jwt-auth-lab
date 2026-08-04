const router = require("express").Router();
const Entry = require("../models/Entry");


async function createEntry(req, res) {
  try {
    const { title, entrybody, isPublic } = req.body;
    const owner = req.user._id;

    const entry = await Entry.create({
      title,
      entrybody,
      isPublic,
      owner,
    });

    return res.status(201).json(entry);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}
async function publicEntries(req, res) {
  try {
    const entries = await Entry.find({ isPublic: true }).populate("owner", "username");
    return res.status(200).json(entries);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

async function myEntries(req, res) {
  try {
    const owner = req.user._id;
    const entries = await Entry.find({ owner }).populate("owner", "username");
    return res.status(200).json(entries);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

async function getOneEntry (req,res) {
    try{
        const {id} = req.params
        const entry = await Entry.findById()

        if (!entry) {
      return res.status(404).json({
        message: "Entry not found",
      })
    }

    return res.status(200).json(entry)
    } catch(err){
        console.error(err)
        return res.status(500).json({
            message:"Internal Server Error"
        })
    }
}

async function updateEntry(req, res) {
  try {
    const { id } = req.params;
    const { title, entrybody, isPublic } = req.body;
    const owner = req.user._id;

    const entry = await Entry.findByIdAndUpdate(
      { _id: id, owner },
      { title, entrybody, isPublic },
      { new: true }
    );

    return res.status(200).json(entry);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

async function deleteEntry(req, res) {
  try {
    const { id } = req.params;
    const owner = req.user._id;

    const entry = await Entry.findOneAndDelete({ _id: id, owner });

    if (!entry) {
      return res.status(404).json({
        message: "Entry not found",
      });
    }

    return res.status(200).json({
      message: "Entry deleted successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

module.exports = {
    createEntry,
    publicEntries,
    myEntries,
    getOneEntry,
    updateEntry,
    deleteEntry

}
