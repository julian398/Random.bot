import {AbstractRunnableEngine, engineConstructorArgument} from "./AbstractRunnableEngine";
import {CommandDescriptor} from "./CommandDescriptor";

export abstract class AbstractCommand extends AbstractRunnableEngine<"message"> {

    private _rolesAllowed: string[];

    protected constructor(commandInfo: engineConstructorArgument, rolesAllowed:string[] = []) {
        super(commandInfo);
        this._rolesAllowed = rolesAllowed;
    }

    public canHandle(commandDescriptor: CommandDescriptor<"message">): boolean {
        const isRoleMetaCorrect = super.canHandle(commandDescriptor) && commandDescriptor.prefix === AbstractRunnableEngine.pf && commandDescriptor.command === this.name.toLowerCase();
        if (!isRoleMetaCorrect) {
            return false;
        }
        if (this._rolesAllowed.length === 0) {
            return true;
        }
        const [message] = commandDescriptor.commandObject;
        const roleCashe = message.member.roles.cache;
        for (const [roleId,] of roleCashe) {
            if (this._rolesAllowed.includes(roleId)) {
                return true;
            }
        }
        return false;
    }

    public abstract execute(events: CommandDescriptor<"message">): Promise<void>
}