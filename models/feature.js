import mongoose from 'mongoose';
const { Schema } = mongoose;

const featureSchema = new Schema({
    name:  { type: String, required: true },
    date: { type: String, required: true },
    status: { type: String, required: true }, // IN SUGGESTED // IN DEVELOPMENT // IN TESTING // COMPLETED
    creator: { type: Schema.Types.ObjectId, ref: 'User' },
    project: { type: Schema.Types.ObjectId, ref: 'Project' },
    suggestion: [{ type: Schema.Types.ObjectId, ref: 'Suggestion' }],
    issues: [{ type: Schema.Types.ObjectId, ref: 'Issue' }],
  });

export default mongoose.model('Feature', featureSchema);