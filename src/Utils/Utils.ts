import {client} from "../index";
export namespace GuildUtils{

    export function getGuildId(){
      return "521118544075948053";
    }
  
    export function getGuildObject(){
      return client.guilds.cache.get(GuildUtils.getGuildId());
    }
  }