import ConsentTypes from "../enums/ConsentTypes";

export default interface Player {
    name: string;
    consentTypes: ConsentTypes[]
}
