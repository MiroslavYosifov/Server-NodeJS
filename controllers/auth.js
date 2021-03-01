import bcrypt from 'bcryptjs';
import { User, TokenBlackList } from '../models/index.js';

import configs from '../settings/configs.js';
import { createAuthToken } from '../helpers/jwt.js';

export default {
    get: {

    },
    post: {
        registration: async (req, res, next) => {
            const { name, password } = req.body;

            try {
                const salt = await bcrypt.genSalt(10);
                const hashPassword = await bcrypt.hash(password, salt);

                const user = await User.create({ name: name, password: hashPassword });
                const autToken = createAuthToken(user);

                res
                .cookie(configs.auth.authToken.name, autToken)
                .status(200)
                .send({ "tokens": { autToken: autToken } });

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
    
                const autToken = createAuthToken(user);
                //const refreshToken = createRefreshToken(user);

                res
                .cookie(configs.auth.authToken.name, autToken)
                .status(200)
                .send({ "tokens": { autToken: autToken } });
    
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
                res.clearCookie(configs.auth.authToken.name).send('Logout successfully!');
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