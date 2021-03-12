import {AbstractRunnableEngine} from "./AbstractRunnableEngine";

export class AbstractEvent extends AbstractRunnableEngine {
    _eventType;
    constructor(desc, eventType) {
        super(desc);
        this._eventType = eventType;
    }
    canHandle({commandObject, event}) {
        return super.canHandle(commandObject) && event === this._eventType;
    }
}