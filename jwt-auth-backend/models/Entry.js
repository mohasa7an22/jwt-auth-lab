const mongoose = require("mongoose");

const entrySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: 100,
    },
    entrybody: {
      type: String,
      maxLength: 350
    },
    isPublic:{
        type: Boolean,
        default: false
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

entrySchema.set("toJSON", {
  transform: (document, returnedObject) => {
    delete returnedObject.hashedPassword;
  },
});

const Entry = mongoose.model("Entry", entrySchema);

module.exports = Entry;
