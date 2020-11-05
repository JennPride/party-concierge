import Action from "../../database/actions/actions";
import { backfillActionsJson } from "./backfillSources/actionBackfillSources";
const { connect } = require('../../database/database');

async function backfill() {

    connect();

    await Action.deleteMany({});

    for (const action of backfillActionsJson) {
        const {title, description, level, createdBy, numberOfParticipants, isRemoteFriendly: unformattedRemoteFriendly, requiredConsentTypes: unformattedConstentTypes} = action;

        const requiredConsentTypes = unformattedConstentTypes.split(',');
        const isRemoteFriendly = unformattedRemoteFriendly !== 'FALSE';

        await Action.create(new Action({
            title,
            description,
            isRemoteFriendly,
            level,
            numberOfParticipants,
            requiredConsentTypes
        }));
    }

    console.log('Actions backfilled!');
}

backfill();
