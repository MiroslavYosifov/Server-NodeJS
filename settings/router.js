import routes from "../routes/index.js";

export default (app) => {
    app.use('/api/auth', routes.auth);
    app.use('/api/project', routes.project);
    app.use('/api/feature', routes.feature);
    app.use('/api/issue', routes.issue);
    app.use('/api/suggestion', routes.suggestion);
    app.use('/api/note', routes.note);
};

