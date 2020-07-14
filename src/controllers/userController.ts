import User from '../database/users/user.model';

module.exports.createUser = async (req: any, resp: any): Promise<any> => {
    const {email, userName } = req.body;
    const user = new User({
        email,
        userName,
        isEmailVerified: false,
    });
    const fuckThis = await user.save;

    return fuckThis;
};
