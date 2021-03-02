import mongoose from 'mongoose';
import bcrypt from "bcryptjs";
const saltRounds = 10;

const { Schema } = mongoose;
const Model = mongoose.model;

const userSchema = new Schema({
    name:  { type: String, required: true },
    password: { type: String, required: true },
    roles: [],
    ownProjects: [{ type: Schema.Types.ObjectId, ref: 'Project' }], // TO DO REF TO PROJECT MODEL
    participantsInProjects: [{ type: Schema.Types.ObjectId, ref: 'Project' }], // TO DO REF TO PROJECT MODEL
    features: [{ type: Schema.Types.ObjectId, ref: 'Feature' }],
    suggestions: [{ type: Schema.Types.ObjectId, ref: 'Suggestion' }],
    issues: [{ type: Schema.Types.ObjectId, ref: 'Issue' }],
});


userSchema.methods = {
    matchPassword: function (password) {
        return bcrypt.compare(password, this.password);
    }
};


export default new Model('User', userSchema);



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