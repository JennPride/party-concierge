"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const Authentication_1 = require("../const/Authentication");
const user_1 = __importDefault(require("../database/users/user"));
function createUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, userName, password } = req.body;
        const hashPass = yield bcrypt_1.default.hash(password, Authentication_1.SALT_ROUNDS);
        const user = new user_1.default({
            email,
            userName,
            isEmailVerified: false,
            password: hashPass
        });
        try {
            const createdUser = yield user_1.default.create(user);
            if (createdUser.errors) {
                res.status(500).send({ error: { 'meta': createdUser.errors } });
            }
            else {
                res.status(200).send({ createdUser });
            }
        }
        catch (e) {
            const { name, message } = e;
            if (name === 'MongoError' && message.includes('duplicate key error')) {
                let issueValue = `those credentials`;
                if (message.includes('email_1 dup key')) {
                    issueValue = `that email address`;
                }
                else if (message.includes('userName_1 dup key')) {
                    issueValue = `that username`;
                }
                else {
                    // TODO: log error
                }
                res.status(400).send({ 'error': { 'message': `A user with ${issueValue} already exists!` } });
            }
            else {
                res.status(500).send({ 'error': { 'message': 'Unknown error encountered when trying to create user.' } });
            }
        }
    });
}
exports.createUser = createUser;
//# sourceMappingURL=userController.js.map