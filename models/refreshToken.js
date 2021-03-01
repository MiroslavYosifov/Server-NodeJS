import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const Model = mongoose.model;

const schema = new Schema({
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'user'
    },
    token: {
      type: String,
      required: true
    },
    expireAt: {
      type: Date,
      default: Date.now,
      index: { expires: 60*60*24 }
    }

});

// schema.virtual('isExpired').get(function () {
//     return Date.now() >= this.expires;
// });

export default new Model('RefreshToken', schema);