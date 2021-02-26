import mongoose from 'mongoose';
const { Schema } = mongoose;

const suggestionSchema = new Schema({
    name:  { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, required: true }, // ACCEPTED // DECLINED
    date: { type: String, required: true }, // IN PROCCESS // COMPLETE
    creator: { type: Schema.Types.ObjectId, ref: 'User' },
    project: { type: Schema.Types.ObjectId, ref: 'Project' },
    feature: { type: Schema.Types.ObjectId, ref: 'Feature' },
  });

export default mongoose.model('Suggestion', suggestionSchema);