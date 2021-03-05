import jwt from 'jsonwebtoken';
import configs from '../settings/configs.js';


export const createAuthToken = function (user) {
    const payload = { id: user._id, user_roles: ["admin", "moderator", "developer", "qa"]};
    return jwt.sign(payload, configs.auth.authToken.secret, { expiresIn: configs.auth.authToken.expire });
}

export const verifyAuthToken = async function (authToken) {
    return new Promise((resolve, reject) => {
        try {
            const data = jwt.verify(authToken, configs.auth.authToken.secret)
            resolve(data);
        } 
        catch (error) {
            reject(error)
        }
    });
}


// export const createRefreshToken = function (user) {
//     const payload = { id: user._id, user_roles: ["admin", "moderator", "developer", "qa"]};
//     return jwt.sign(payload, configs.auth.refreshToken.secret, { expiresIn: configs.auth.refreshToken.expire })
// }


// export const verifyRefreshToken = function (refreshToken) {

//     if (!authToken) return res.status(401).send("Access Denied / Unauthorized request");

//     let verifiedUser = jwt.verify(authToken, configs.auth.secret); 
//     if (!verifiedUser) return res.status(401).send('Unauthorized request');

//     return verifiedUser;
// }

// export const verifyToken = function (req, res, next) {
//     const token = req.cookies[configs.auth.authToken];

//     if (!token) return res.status(401).send("Access Denied / Unauthorized request");

//     let verifiedUser = jwt.verify(token, configs.auth.secret); 
//     if (!verifiedUser) return res.status(401).send('Unauthorized request');

//     req.user = verifiedUser;
//     next();
// }

// export const verifyToken = function (token) {
//     return new Promise((resolve, reject) => {
//         jwt.verify(token, configs.auth.secret, (err, data) => {
//             if (err) { reject(err); return; }
//             resolve(data);
//         });
//     });
// }


// export const verifyAuthToken = function (authToken) {
//     if (!authToken) return res.status(401).send("Access Denied / Unauthorized request");

//     let verifiedUser = jwt.verify(authToken, configs.auth.authToken.secret); 
    
//     if (!verifiedUser) return res.status(401).send('Unauthorized request');
//     return verifiedUser;
// }