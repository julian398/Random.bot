import {AbstractRunnableEngine} from "./AbstractRunnableEngine";

export class AbstractCommand extends AbstractRunnableEngine {

    _rolesAllowed;

    constructor(commandInfo, rolesAllowed = []) {
        super(commandInfo);
        this._rolesAllowed = rolesAllowed;
    }

    canHandle({prefix, commandObject, command}) {
        const isRoleMetaCorrect = super.canHandle(commandObject) && prefix === AbstractRunnableEngine.pf && command === this.name.toLowerCase();
        if (!isRoleMetaCorrect) {
            return false;
        }
        if (this._rolesAllowed.length === 0) {
            return true;
        }
        const [message] = commandObject;
        const roleCashe = message.member.roles.cache;
        for (const role of roleCashe) {
            if (this._rolesAllowed.includes(role)) {
                return true;
            }
        }
        return false;
    }
}