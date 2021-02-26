import routes from "../routes/index.js";

export default (app) => {
    app.use('/api/auth', routes.auth);
};