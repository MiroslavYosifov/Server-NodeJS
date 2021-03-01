import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const Model = mongoose.model;

const tokenBlackListSchema = new Schema({
    token: {
      type: String,
      required: true
    },


});

export default new Model('TokenBlackList', tokenBlackListSchema);