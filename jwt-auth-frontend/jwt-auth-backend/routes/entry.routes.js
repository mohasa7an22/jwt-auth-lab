const router = require("express").Router();
const verifyToken = require("../middleware/verifyToken");
const entryController = require('../controllers/entries.controllers')

router.post("/", verifyToken, entryController.createEntry);

router.get("/", entryController.publicEntries);

router.get("/my-entries", verifyToken, entryController.myEntries);

router.get("/:id", verifyToken, entryController.getOneEntry);

router.put("/:id", verifyToken, entryController.updateEntry);

router.delete("/:id", verifyToken, entryController.deleteEntry);

module.exports = router;