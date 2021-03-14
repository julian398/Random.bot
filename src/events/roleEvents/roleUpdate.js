import {AbstractEvent} from "../../model/AbstractEvent";

const Discord = require('discord.js');

export class roleUpdate extends AbstractEvent {

    constructor() {
        super({
            name: "Role update",
            description: "Logs when role is changed"
        }, "roleUpdate");
    }

    execute({commandObject}) {
        /**
         * Get a modification object as a better solution than this shit
         * @type {boolean}
         */
        const [oldRole, newRole] = commandObject;
        const channeltosendid = "818172844277891083";
        const roleChangeEmbed = new Discord.MessageEmbed()
            .setColor(oldRole.color)
            .setTitle(`Role change "${oldRole.name}"`);

        this._roleNameChange(oldRole, newRole, roleChangeEmbed);
        this._roleColorChange(oldRole, newRole, roleChangeEmbed);
        this._getPermissionChanges(oldRole, newRole, roleChangeEmbed);

        const channelToSend = newRole.guild.channels.cache.get(channeltosendid);
        channelToSend.send(roleChangeEmbed);
    }

    _roleNameChange(oldRole, newRole, roleChangeEmbed) {
        if (oldRole.name === newRole.name) {
            return;
        }
        roleChangeEmbed.addField("Role name change", `Role's old name: ${oldRole.name} \nRole's new name: ${newRole.name}`);
    }

    _roleColorChange(oldRole, newRole, roleChangeEmbed) {
        if (oldRole.color === newRole.color) {
            return
        }
        roleChangeEmbed.setColor(newRole.color);
        roleChangeEmbed.addField("Role color change", `Role's old color: ${oldRole.color} \nRole's new color: ${newRole.color}`);
    }

    _getPermissionChanges(oldRole, newRole, roleChangeEmbed) {
        const added = oldRole.permissions.missing(newRole.permissions.bitfield);
        const removed = newRole.permissions.missing(oldRole.permissions.bitfield);
        if (added.length > 0) {
            roleChangeEmbed.addField("Permissions added", `${added.join(", ")}`);
        }
        if (removed.length > 0) {
            roleChangeEmbed.addField("Permissions removed", `${removed.join(", ")}`);
        }
    }
}

new roleUpdate();