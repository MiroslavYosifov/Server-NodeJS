import { User, TokenBlackList } from '../../models/index.js';
import { verifyAuthToken } from '../../helpers/jwt.js';
import configs from '../../settings/configs.js';

export const isAuth = async function (req, res, next) {
    const authToken = req.cookies[configs.auth.authToken.name];

    try {
        const verifiedUser = await verifyAuthToken(authToken);
        const blackListToken = await TokenBlackList.find({ token: authToken });

        if(!verifiedUser) {
            res.status(401).send('Unauthorized!!!');
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