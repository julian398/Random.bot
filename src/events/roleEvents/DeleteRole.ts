import { AbstractEvent } from "../../model/AbstractEvent";
import { CommandDescriptor } from "../../model/CommandDescriptor";

export class DeleteRole extends AbstractEvent<"roleDelete">{

    constructor() {
        super({
            name: "Role update",
            description: "Logs when role is changed"
        }, "roleDelete");
    }


    public execute(events: CommandDescriptor<"roleDelete">): Promise<void> {
        const [name] = events.commandObject;
        throw new Error("Method not implemented.");
    }
    
}