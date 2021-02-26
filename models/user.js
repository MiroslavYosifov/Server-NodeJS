import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
    name:  { type: String, required: true },
    password: { type: String, required: true },
    roles: [],
    ownProjects: [], // TO DO REF TO PROJECT MODEL
    participantsInProjects: [] // TO DO REF TO PROJECT MODEL
  });

export default mongoose.model('User', userSchema);


// const userSchema = new Schema({
//     title:  String, // String is shorthand for {type: String}
//     author: String,
//     body:   String,
//     comments: [{ body: String, date: Date }],
//     date: { type: Date, default: Date.now },
//     hidden: Boolean,
//     meta: {
//       votes: Number,
//       favs:  Number
//     }
//   });