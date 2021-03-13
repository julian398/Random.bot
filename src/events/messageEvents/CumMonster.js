import {AbstractEvent} from "../../model/AbstractEvent.js";

export class CumMonster extends AbstractEvent {

    constructor() {
        super({
            name: "some name",
            description: "some desc"
        }, "message");
    }

    execute({commandObject}) {
        if (commandObject.content.toLowerCase().includes(`cum monster`)) {
            commandObject.channel.send(`https://tenor.com/view/cum-scary-death-help-me-gif-18207070`);
        }
    }
}
new CumMonster();