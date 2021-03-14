import {AbstractCommand} from "../../model/AbstractCommand";

export class Test extends AbstractCommand{
    constructor (){
        super({
            name: "ping",
            description: "Test new command"
        });
    }
    execute({commandObject}){
        const [message] = commandObject;
        message.reply("pong");
    }
}