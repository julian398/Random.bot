import {AbstractRunnableEngine} from "./AbstractRunnableEngine";

export class AbstractMessageEvent extends AbstractRunnableEngine {
    canHandle({message, event}) {
        return super.canHandle(message) && event === "message";
    }
}