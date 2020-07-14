import * as Mongoose from 'mongoose';
import config from 'config';

let database: Mongoose.Connection;
export const connect = () => {
    // add your own uri below
    // TODO: When prod comes along, will probably need srv
    const uri = `mongodb://${config.get('database.user')}:${config.get('database.password')}@${config.get('database.host')}:${config.get('database.port')}/test?retryWrites=true&w=majority`;
    if (database) {
        return;
    }
    Mongoose.connect(uri, {
        useNewUrlParser: true,
        useFindAndModify: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    });
    database = Mongoose.connection;
    database.once("open", async () => {
        console.log("Connected to database");
    });
    database.on("error", () => {
        console.log("Error connecting to database");
    });
};

export const disconnect = () => {
    if (!database) {
        return;
    }
    Mongoose.disconnect();
};
