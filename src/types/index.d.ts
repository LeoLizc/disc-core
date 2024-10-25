import { type CommandJsonResolvable } from './sCBuilder';
import { type Collection } from 'discord.js';

declare module 'discord.js' {
  export interface Client extends Client {
    commands: Collection<unknown, CommandJsonResolvable>;
  }
}
