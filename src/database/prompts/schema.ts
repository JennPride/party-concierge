import { Schema } from "mongoose";

const ConsentTypes = require('../../enums/ConsentTypes');

const PromptSchema = new Schema({
    title: String,
    description: String,
    requiredConsentTypes: [ConsentTypes],
    isRemoteFriendly: Boolean,
    isInPersonFriendly: Boolean,
    level: Number
});

export default PromptSchema;
