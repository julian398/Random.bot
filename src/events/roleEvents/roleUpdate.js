import { AbstractEvent } from "../../model/AbstractEvent";
const Discord = require('discord.js');

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
        const roleChangeEmbed = new Discord.MessageEmbed()
        .setColor(oldRole.color)
        .setTitle(`Role change "${oldRole.name}"`)
        .addFields(
            {name: `Role name change`, value: `${this.roleNameChange(oldRole,newRole)}`},
            {name: `Role color change`, value: `${this.roleColorChange(oldRole, newRole)}`}  
        );
        const {added, removed} = this._getPremissionChanges(oldRole,newRole);

        if(added.length > 0){
            roleChangeEmbed.addField( "Permissions added", `${added.join(", ")}`);
        }

        if(removed.length > 0){
            roleChangeEmbed.addField( "Permissions removed", `${removed.join(", ")}`);
        }
        if(!oldRole.color === newRole.color){
            roleChangeEmbed.setColor(newRole.color);
        }
        const channelToSend = newRole.guild.channels.cache.get(channeltosendid);
        channelToSend.send(roleChangeEmbed);
    }

    roleNameChange(oldRole, newRole){
        if(oldRole.name === newRole.name){
            return `Role name is sill ${oldRole.name}`;
        }
        return (`Role's old name: ${oldRole.name} \nRole's new name: ${newRole.name}`);
    }

    roleColorChange(oldRole, newRole){
        if(oldRole.color === newRole.color){
            return `No color change`;
        }
        return (`Role's old color: ${oldRole.color} \nRole's new color: ${newRole.color}`);
    }
    
    _getPremissionChanges(oldRole, newRole){
        const retObj = {
          added: [],
          removed: []
        };
        const permsadd = oldRole.permissions.missing(newRole.permissions.bitfield);
        const permsremove = newRole.permissions.missing(oldRole.permissions.bitfield);
        if(permsadd.length > 0 || permsremove.length > 0 ){
           retObj["added"] = permsadd;
           retObj["removed"] = permsremove;
        }
        return retObj;
      }

}
new roleUpdate();