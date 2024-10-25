import { type DiscFactoryOptions } from '../types/discFactory';
import { Collection, Client as DiscordClient } from 'discord.js';

export class Client extends DiscordClient {
  constructor(config: DiscFactoryOptions) {
    const { modules = [], token, ...clientOptions } = config;
    super(clientOptions);

    this.commands = new Collection();

    // this.registerModules(client, modules);
    // this.listenCommands(client);

    // return client;
    super(config);
  }
}
