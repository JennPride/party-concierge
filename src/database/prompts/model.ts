import { model } from "mongoose";
import { IPromptDocument } from "./types";
import PromptSchema from "./schema";
export const PromptModel = model<IPromptDocument>("Prompt", PromptSchema);
