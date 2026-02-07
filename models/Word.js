import mongoose from "mongoose";

const wordSchema = new mongoose.Schema({
  folderId: { type: mongoose.Schema.Types.ObjectId, ref: "Folder", required: true }, // к какой папке относится
  en: { type: String, required: true },
  nl: { type: String, required: true },
  ru: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Word", wordSchema, "words"); // "words" — имя коллекции
