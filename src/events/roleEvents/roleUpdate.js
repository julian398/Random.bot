import { AbstractEvent } from "../../model/AbstractEvent";

export class roleUpdate extends AbstractEvent{

    constructor() {
        super({
            name: "Role update",
            description: "Logs when role is changed"
        }, "roleUpdate");
    }

    execute({commandObject}) {
        const [oldRole, newRole] = commandObject;
        const channeltosendid = "818172844277891083";
        const oldname = oldRole.name;
        const newname = newRole.name;
        if(oldname === newname){
            return;
        }
        const channelToSend = newRole.guild.channels.cache.get(channeltosendid);
        channelToSend.send(`Role's old name: ${oldname} \nRole's new name: ${newname}`);
    }
}
new roleUpdate();