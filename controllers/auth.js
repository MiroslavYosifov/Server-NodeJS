export default {
    get: {

    },
    post: {
        registration: (req, res, next) => {
            console.log('registration');
            res.send('REGISTRATION');
        },
        login: (req, res, next) => {
            console.log('login');
            res.send('login');
        },
        logout: (req, res, next) => {
            console.log('logout');
            res.send('logout');
        }
    },
    put: {

    },
    delete: {

    }
}