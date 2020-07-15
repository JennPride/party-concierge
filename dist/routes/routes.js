"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_validation_1 = require("express-validation");
const { fetchPrompt, createPrompt } = require('../controllers/promptController');
const { createUser } = require('../controllers/userController');
const router = express_1.default.Router();
const cors = require('cors');
router.use(body_parser_1.default.json());
router.use(cors);
const promptRequestValidation = {
    body: express_validation_1.Joi.object({
        level: express_validation_1.Joi.number().required(),
        isRemote: express_validation_1.Joi.boolean().required(),
        consentCategories: express_validation_1.Joi.array().required(),
    })
};
const promptCreationRequestValidation = {
    body: express_validation_1.Joi.object({
        userId: express_validation_1.Joi.number().required(),
        title: express_validation_1.Joi.string().required(),
        description: express_validation_1.Joi.string().required(),
        level: express_validation_1.Joi.number().required(),
        isRemote: express_validation_1.Joi.boolean().required(),
        consentCategories: express_validation_1.Joi.array().required(),
    })
};
const userCreateRequestValidation = {
    body: express_validation_1.Joi.object({
        email: express_validation_1.Joi.string().email().required(),
        userName: express_validation_1.Joi.string().required()
    })
};
router.post('/request_prompt', express_validation_1.validate(promptRequestValidation, {}, {}), (req, res) => {
    fetchPrompt(req, res);
});
router.post('/create_prompt', express_validation_1.validate(promptCreationRequestValidation, {}, {}), (req, res) => {
    createPrompt(req, res);
});
router.post('/create_user', express_validation_1.validate(userCreateRequestValidation, {}, {}), createUser);
module.exports = router;
//# sourceMappingURL=routes.js.map