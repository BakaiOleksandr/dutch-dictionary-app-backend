import mongoose from 'mongoose';

const folderSchema = new mongoose.Schema({
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}, // владелец папки
  name: {type: String, required: true}, // название папки
  createdAt: {type: Date, default: Date.now},
});

export default mongoose.model('Folder', folderSchema, 'folders'); // "folders" — имя коллекции
