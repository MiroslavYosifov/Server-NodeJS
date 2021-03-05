import { User, TokenBlackList } from '../../models/index.js';
import { verifyAuthToken } from '../../helpers/jwt.js';
import configs from '../../settings/configs.js';

export const isAuth = async function (req, res, next) {
    const authToken = req.cookies[configs.auth.authToken.name];

    try {
        if(!authToken) {
            throw  new Error('Not authenticated!');
        }

        const verifiedUser = await verifyAuthToken(authToken);
        const blackListToken = await TokenBlackList.find({ token: authToken });

        if(!verifiedUser) {
            res.status(401).send('Not authenticated!');
            return;
        }

        if(blackListToken.token) {
            res.status(401).send('Blacklisted token!!!');
            return;
        }

        const user = await User.findById(verifiedUser.id);
        req.authUser = user;
        next();

    } catch (error) {
        console.log(error);
    }
}