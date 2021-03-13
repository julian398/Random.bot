import {AbstractEvent} from "../../model/AbstractEvent.js";

export class MemberJoined extends AbstractEvent{
    constructor() {
        super({
            name: "member-joined",
            description: "logs a welcome when member joins"
        }, "guildMemberAdd");
    }

    execute({commandObject}) {
        //`<@${commandObject.id}> has joined the server`
    }
}