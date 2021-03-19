//const payload = { id: user._id, user_roles: ["admin", "moderator"]};
// TO DO AUTHORIZATION
export const isAdmin = async function (req, res, next) {

    if(!req.authUser.roles.include('admin')) {
        res.status(401).send('NO AUTHORIZATION!');
        return;
    }

    next();
}

export const isModerator = async function (req, res, next) {
    
    if(!req.authUser.roles.include('moderator')) {
        res.status(401).send('NO AUTHORIZATION!');
        return;
    }

    next();
}

export const isDeveloper = async function (req, res, next) {

    if(!req.authUser.roles.include('developer')) {
        res.status(401).send('NO AUTHORIZATION!');
        return;
    }

    next();
}

export const isQA = async function (req, res, next) {

    if(!req.authUser.roles.include('qa')) {
        res.status(401).send('NO AUTHORIZATION!');
        return;
    }
    
    next();
}
