import {AbstractCommand} from "../../model/AbstractCommand.js";

export class Test extends AbstractCommand{
    constructor (){
        super({
            name: "ping",
            description: "Test new command"
        });
    }
    executes({commandObject}){
        commandObject.reply("pong");
    }
}