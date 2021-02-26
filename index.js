import express from 'express';
import configs from "./settings/configs.js";
import database from "./settings/database.js";
import expressSettings from "./settings/express.js";
import router from "./settings/router.js";

const app = express();

database().then(() => {

    expressSettings(app);
    router(app);

    app.listen(configs.app.PORT, console.log(`App listening on port ${configs.app.PORT} ...`));
}).catch(err => {
    console.log(err);
});



