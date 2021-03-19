import mongoose from 'mongoose';

const { Schema } = mongoose;
const Model = mongoose.model;

const issueSchema = new Schema({
    name:  { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, required: true },
    date: { type: String, required: true },
    creator: { type: Schema.Types.ObjectId, ref: 'User' },
    project: { type: Schema.Types.ObjectId, ref: 'Project' },
    feature: { type: Schema.Types.ObjectId, ref: 'Feature' },
  });

export default new Model('Issue', issueSchema);