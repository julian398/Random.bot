import {AbstractRunnableEngine} from "./AbstractRunnableEngine";

export class AbstractCommand extends AbstractRunnableEngine {
    canHandle({prefix, message, command}) {
        return prefix === AbstractRunnableEngine.pf && super.canHandle(message) && command === this.name;
    }
}