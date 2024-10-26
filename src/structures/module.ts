import { type CommandJsonResolvable } from '../types/sCBuilder';
import { type Client } from 'discord.js';

export class Module {
  public commands: CommandJsonResolvable[];

  public name: string;

  constructor(name: string, commands: CommandJsonResolvable[]) {
    this.name = name;
    this.commands = commands;
  }

  register(client: Client) {
    for (const command of this.commands) {
      if (client.commands.has(command.name)) {
        console.warn(
          `Command ${command.name} already exists in the client, skipping...`,
        );
        continue;
      }

      client.commands.set(command.name, command);
    }
  }
}
