import Action from "../../database/actions/actions";
import { backfillActionsJson } from "./backfillSources/actionBackfillSources";
const { connect } = require('../../database/database');

async function backfill() {

    connect();

    await Action.deleteMany({});

    for (const action of backfillActionsJson) {
        console.log(action);
    }
}

backfill();
