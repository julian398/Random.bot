import {AbstractEvent} from "../../model/AbstractEvent";
import {CommandDescriptor} from "../../model/CommandDescriptor";
import {TextChannel} from "discord.js";

const Discord = require('discord.js');

export class roleUpdate extends AbstractEvent<"roleUpdate"> {

    constructor() {
        super({
            name: "Role update",
            description: "Logs when role is changed"
        }, "roleUpdate");
    }

    public async execute({commandObject}: CommandDescriptor<"roleUpdate">): Promise<void> {
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
        if (channelToSend instanceof TextChannel) {
            channelToSend.send(roleChangeEmbed);
        }
    }

    private _roleNameChange(oldRole, newRole, roleChangeEmbed) {
        if (oldRole.name === newRole.name) {
            return;
        }
        roleChangeEmbed.addField("Role name change", `Role's old name: ${oldRole.name} \nRole's new name: ${newRole.name}`);
    }

    private _roleColorChange(oldRole, newRole, roleChangeEmbed) {
        if (oldRole.color === newRole.color) {
            return;
        }
        roleChangeEmbed.setColor(newRole.color);
        roleChangeEmbed.addField("Role color change", `Role's old color: ${oldRole.color} \nRole's new color: ${newRole.color}`);
    }

    private _getPermissionChanges(oldRole, newRole, roleChangeEmbed) {
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