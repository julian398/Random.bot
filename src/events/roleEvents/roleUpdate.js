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
        .setTitle(`Role change`)
        .addFields(
            {name: `Role name change`, value: `${this.roleNameChange(oldRole,newRole)}`},
            {name: `Role color change`, value: `${this.roleColorChange(oldRole, newRole)}`}  
        );
        if(this.rolePermissionsCheck(oldRole,newRole) === true){
            roleChangeEmbed.addFields(
                {name: `Permissions added`, value: `${this.rolePermissionsAdded(oldRole,newRole)}`},
                {name: `Permissions removed`, value: `${this.rolePermissionsRemoved(oldRole,newRole)}`}
            )
        };
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
    rolePermissionsCheck(oldRole, newRole){
        const permsadd = oldRole.permissions.missing(newRole.permissions.bitfield);
        const permsremove = newRole.permissions.missing(oldRole.permissions.bitfield);
        if(permsadd.length === 0 && permsremove.length === 0 ){
            return false;
        }
        return true;
    }
    rolePermissionsAdded(oldRole, newRole){
        return oldRole.permissions.missing(newRole.permissions.bitfield);
    }
    rolePermissionsRemoved(oldRole, newRole){
        return newRole.permissions.missing(oldRole.permissions.bitfield);
    }

}
new roleUpdate();