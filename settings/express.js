import bodyParser from 'body-parser';
import cors from 'cors';

export default (app) => {
    app.use(cors({
        origin: 'http://localhost:3000/',
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        credentials: true,
        optionsSuccessStatus: 200
    }));
    app.use(bodyParser.urlencoded({ extended: true }));
}