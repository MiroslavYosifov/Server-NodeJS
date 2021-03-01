//const payload = { id: user._id, user_roles: ["admin", "moderator"]};

export const isAdmin = async function (req, res, next) {
    console.log("IS ADMIN", req.authUser);
    next();
}

export const isModerator = async function (req, res, next) {
    console.log("IS MODERATOR",  req.authUser);
    next();
}

export const isDeveloper = async function (req, res, next) {
    console.log("IS DEVELOPER",  req.authUser, req.user);
    next();
}

export const isQA = async function (req, res, next) {
    console.log("IS QA",  req.authUser);
    next();
}
