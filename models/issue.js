import mongoose from 'mongoose';
const { Schema } = mongoose;

const issueSchema = new Schema({
    name:  { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, required: true },
    date: { type: String, required: true }, // IN PROCCESS // COMPLETE
    creator: {}, // TO DO REF TO USER MODEL
    feature: {}, // TO DO REF TO Feature MODEL
    project: {}, // TO DO REF TO Project MODEL
  });

export default mongoose.model('Issue', issueSchema);