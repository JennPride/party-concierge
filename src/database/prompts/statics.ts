import {ALL_CONSENT_TYPES} from "../../const/ConsentTypes";

const { diff } = require('lodash');

import { IPromptDocument, IPromptModel } from "./types";

const PromptRequestDto = require('../../dtos/PromptRequestDto');

export async function findByPromptRequest(promptRequest: any): Promise<IPromptDocument[]> {

    const {
        level,
        consentTypes,
        isRemote
    } = promptRequest;

    const forbiddenConsentTypes = consentTypes.diff(ALL_CONSENT_TYPES);

    return this.findOne({
        level,
        isRemoteFriendly: isRemote,
        requiredConsentTypes: { $nin: forbiddenConsentTypes}
    });
}
