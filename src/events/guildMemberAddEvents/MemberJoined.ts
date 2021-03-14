import {AbstractEvent} from "../../model/AbstractEvent";
import {CommandDescriptor} from "../../model/CommandDescriptor";

export class MemberJoined extends AbstractEvent<"guildMemberAdd"> {
    constructor() {
        super({
            name: "member-joined",
            description: "logs a welcome when member joins"
        }, "guildMemberAdd");
    }

    execute(events: CommandDescriptor<"guildMemberAdd">): Promise<void> {
        return Promise.resolve(undefined);
    }

}