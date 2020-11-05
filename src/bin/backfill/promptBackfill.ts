import Prompt from "../../database/prompts/prompt";
import { backfillPromptsJson } from "./backfillSources/promptBackfillSources";
const { connect } = require('../../database/database');

async function backfill() {

    connect();

    await Prompt.deleteMany({});

    for (const prompt of backfillPromptsJson) {
        const {title, description, level, isRemoteFriendly: unformattedRemoteFriendly, type} = prompt;

        const isRemoteFriendly = unformattedRemoteFriendly !== 'FALSE';

        await Prompt.create(new Prompt({
            title,
            description,
            isRemoteFriendly,
            level,
            type
        }));
    }

    console.log('Prompts backfilled!');
}

backfill();
