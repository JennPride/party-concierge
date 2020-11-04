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
exports.fetchPrompt = exports.createPrompt = void 0;
const prompt_1 = __importDefault(require("../database/prompts/prompt"));
function createPrompt(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { title, description, isRemoteFriendly, level, createdBy, type } = req.body;
        const prompt = new prompt_1.default({
            title,
            description,
            isRemoteFriendly,
            level,
            createdBy,
            type
        });
        try {
            const createdPrompt = yield prompt_1.default.create(prompt);
            if (createdPrompt.errors) {
                res.status(500).send({ error: { 'meta': createdPrompt.errors } });
            }
            else {
                res.status(200).send({ createdPrompt });
            }
        }
        catch (e) {
            res.status(500).send({ 'error': { 'message': 'An unknown error occurred when creating the prompt.' } });
        }
    });
}
exports.createPrompt = createPrompt;
function fetchPrompt(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { excludedPromptIds, isRemoteFriendly, level, type, requesterId: createdBy, } = req.body;
        // TODO: Logic around is remote friendly query only if remote
        let searchObject = {
            _id: { $nin: excludedPromptIds },
            isRemoteFriendly,
            level: { $lte: level },
            type,
        };
        if (createdBy) {
            searchObject = Object.assign(Object.assign({}, searchObject), { $or: [{ createdBy: { $exists: false } }, { createdBy }] });
        }
        else {
            searchObject = Object.assign(Object.assign({}, searchObject), { createdBy: { $exists: false } });
        }
        try {
            const prompt = yield prompt_1.default.findOne(searchObject);
            if (!prompt) {
                res.status(500).send({ error: { 'message': 'No prompt found that matches that request.' } });
            }
            else if (prompt.errors) {
                res.status(500).send({ error: { 'meta': prompt.errors } });
            }
            else {
                res.status(200).send({ prompt });
            }
        }
        catch (e) {
            res.send(500).send({ 'error': { 'message': 'An unknown error occurred when fetching a prompt' } });
        }
    });
}
exports.fetchPrompt = fetchPrompt;
//# sourceMappingURL=promptController.js.map