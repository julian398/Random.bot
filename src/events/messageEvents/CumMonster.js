import {AbstractMessageEvent} from "../../model/AbstractMessageEvent";

export class CumMonster extends AbstractMessageEvent {

    constructor() {
        super({
            name: "some name",
            description: "some desc"
        });
    }

    execute({message}) {
        if (message.content.toLowerCase().includes(`cum monster`)) {
            message.channel.send(`https://tenor.com/view/cum-scary-death-help-me-gif-18207070`);
        }
    }
}
new CumMonster();