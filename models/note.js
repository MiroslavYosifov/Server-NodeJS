import mongoose from 'mongoose';

const { Schema } = mongoose;
const Model = mongoose.model;

const noteSchema = new Schema({
    title:  { type: String, required: true },
    description: { type: String, required: true },
    date: { type: String, required: true },
    creator: { type: Schema.Types.ObjectId, ref: 'User' },
  });

export default new Model('Note', noteSchema);