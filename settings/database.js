import mongoose from "mongoose";
import configs from "./configs.js";

export default () => {
    mongoose.set('useNewUrlParser', true);
    mongoose.set('useFindAndModify', false);
    mongoose.set('useCreateIndex', true);

    return mongoose.connect(`${configs.db.URL}`, { 
        useNewUrlParser: true, 
        useUnifiedTopology: true
    });
}