import {AbstractRunnableEngine} from "./AbstractRunnableEngine.js";

export class AbstractCommand extends AbstractRunnableEngine {
    canHandle({prefix, commandObject, command}) {
        return super.canHandle(commandObject) && prefix === AbstractRunnableEngine.pf && command === this.name;
    }
}