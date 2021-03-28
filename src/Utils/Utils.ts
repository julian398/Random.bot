import { Guild } from "discord.js";
import {client} from "../index";
export namespace GuildUtils{

    export function getGuildId(): string{
      return "521118544075948053";
    }
  
    export function getGuildObject(): Guild{
      return client.guilds.cache.get(GuildUtils.getGuildId());
    }
  }