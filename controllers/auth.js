import bcrypt from 'bcryptjs';
import { User, TokenBlackList } from '../models/index.js';

import configs from '../settings/configs.js';
import { createAuthToken, verifyAuthToken, getTokenExpirationTime } from '../helpers/jwt.js';

export default {
    get: {
        userInfo: async (req, res, next) => {
            const userId = req.params.userId;

            try {
                const userInfo = await User
                                        .findById(userId)
                                        .populate('ownProjects')
                                        .populate('features')
                                        .populate({ 
                                            path: 'suggestions', 
                                            populate: [
                                                { 
                                                    path: 'project',
                                                    model: 'Project',
                                                },
                                                {
                                                    path: 'feature',
                                                    model: 'Feature',
                                                },
                                                {
                                                    path: 'creator',
                                                    model: 'User',
                                                },
                                            ]
                                        })
                                        .populate({ 
                                            path: 'issues', 
                                            populate: [
                                                { 
                                                    path: 'project',
                                                    model: 'Project',
                                                },
                                                {
                                                    path: 'feature',
                                                    model: 'Feature',
                                                },
                                                {
                                                    path: 'creator',
                                                    model: 'User',
                                                },
                                            ]
                                        })
                res
                .status(200)
                .send(userInfo);

            } 
            catch (error) {
                throw new Error(error);
            }
                 
        },
    },
    post: {
        registration: async (req, res, next) => {
            const { name, password } = req.body;

            try {
                const salt = await bcrypt.genSalt(10);
                const hashPassword = await bcrypt.hash(password, salt);

                const user = await User.create({ name: name, password: hashPassword });

                const authToken = createAuthToken(user);
                const expiresIn = await getTokenExpirationTime(authToken);

                res
                .status(200)
                .send({ authToken: authToken, expiresIn: expiresIn, userId: user._id, name: user.name, roles: user.roles });

            } 
            catch (error) {
                throw new Error(error);
            }
                 
        },
        login: async (req, res, next) => {
            const { name, password } = req.body;

            try {
                const user = await User.findOne({ name: name });
                if(!user) res.status(401).send('email or password is wrong');
    
                const validPass = await bcrypt.compare(password, user.password)
                if (!validPass) return res.status(401).send("email or password is wrong");
    
                const authToken = createAuthToken(user);
                const expiresIn = await getTokenExpirationTime(authToken);
                //const refreshToken = createRefreshToken(user);

                res
                .status(200)
                .send({ authToken: authToken, expiresIn: expiresIn, userId: user._id, name: user.name, roles: user.roles });
    
                //res.cookie(configs.auth.authToken, token).status(200).header(configs.auth.authToken, token).send({ "token": token });
                //let token = req.headers.authorization;
            } 
            catch (error) {
               throw new Error(error);
            }
           
        },
        logout: async (req, res, next) => {

            const authToken = req.cookies[configs.auth.authToken.name];
            
            try {
                await TokenBlackList.create({ token: authToken });
                res
                .status(200)
                .send('Logout successfully!');
            } catch (error) {
                throw new Error(error);
            }
          
        }
    },
    put: {

    },
    delete: {

    }
}