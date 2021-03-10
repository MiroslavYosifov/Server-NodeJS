const env = process.env.NODE_ENV || 'development';

const configs = {
    development: {
        app: {
            PORT: process.env.PORT || 3400,
        },
        db: {
            URL: "mongodb+srv://miro:HeAG7JJfrMIdV7Aw@cluster0.m5tsg.mongodb.net/VueJSProject?retryWrites=true&w=majority",
        },
        auth: {
            authToken: {
                name: 'auth-token',
                secret: "fgerg4g45",
                expire: '5h'
            },
            refreshToken: {
                name: 'refresh-token',
                secret: "htrhrtherh5",
                expire: "24h"
            }
            
        }
    },
    production: {
        app: {
            PORT: process.env.PORT || 3400,
        },
        db: {
            URL: "mongodb+srv://miro:HeAG7JJfrMIdV7Aw@cluster0.m5tsg.mongodb.net/VueJSProject?retryWrites=true&w=majority",
        },
        auth: {
            authToken: {
                name: 'auth-token',
                secret: "fgerg4g45",
                expire: '5h'
            },
            refreshToken: {
                name: 'refresh-token',
                secret: "htrhrtherh5",
                expire: 180000
            }
            
        }
    }
};

export default configs[env];

