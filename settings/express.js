import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';

export default (app) => {
    app.use(cors({
        origin: 'http://localhost:8080',
        // origin: 'https://projects-oss-system.netlify.app',
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        credentials: true,
        optionsSuccessStatus: 200
    }));

    app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
    app.use(bodyParser.json({ limit: '50mb' }));
    app.use(cookieParser());
    // app.use((error, req, res, next) => {

    // });
}