import mongoose from 'mongoose';

const { Schema } = mongoose;
const Model = mongoose.model;

const projectSchema = new Schema({
    name:  { type: String, required: true },
    description: { type: String, required: true },
    date: { type: String, required: true },
    creator: { type: Schema.Types.ObjectId, ref: 'User' },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    features: [{ type: Schema.Types.ObjectId, ref: 'Feature' }],
});

export default new Model('Project', projectSchema);