const env = process.env.NODE_ENV || 'development';

const configs = {
    development: {
        app: {
            PORT: process.env.PORT || 3333,
        },
        db: {
            URL: "mongodb+srv://miro:HeAG7JJfrMIdV7Aw@cluster0.m5tsg.mongodb.net/VueJSProject?retryWrites=true&w=majority",
        },
        auth: {

        }
    },
    production: {
        app: {
            PORT: process.env.PORT || 3333,
        },
        db: {
            URL: "mongodb+srv://miro:HeAG7JJfrMIdV7Aw@cluster0.m5tsg.mongodb.net/VueJSProject?retryWrites=true&w=majority",
        },
        auth: {
            
        }
    }
};

export default configs[env];

