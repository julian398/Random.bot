import {AbstractEvent} from "../../model/AbstractEvent";

export class CumMonster extends AbstractEvent {

    constructor() {
        super({
            name: "some name",
            description: "some desc"
        }, "message");
    }

    execute({commandObject}) {
        const [message] = commandObject;
        if (message.content.toLowerCase().includes(`cum monster`)) {
            message.channel.send(`https://tenor.com/view/cum-scary-death-help-me-gif-18207070`);
        }
    }
}
new CumMonster();