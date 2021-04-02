import {AbstractEvent} from "../../model/AbstractEvent";
import {CommandDescriptor} from "../../model/CommandDescriptor";

export class MemberJoined extends AbstractEvent<"guildMemberAdd"> {
    constructor() {
        super({
            name: "member-joined",
            description: "logs a welcome when member joins"
        }, "guildMemberAdd");
    }

    public async execute(events: CommandDescriptor<"guildMemberAdd">): Promise<void> {
        await super.execute(events);
        return Promise.resolve(undefined);
    }

}