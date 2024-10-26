/* eslint-disable no-console */
/* eslint-disable promise/prefer-await-to-then */
import { type DiscFactoryOptions } from '../types/discFactory';
import { type Module } from './module';
import {
  Collection,
  Client as DiscordClient,
  Events,
  REST,
  Routes,
} from 'discord.js';

export class Client extends DiscordClient {
  constructor(config: DiscFactoryOptions) {
    const { modules = [], token, ...clientOptions } = config;
    super(clientOptions);

    this.commands = new Collection();

    this.registerModules(modules);
    this.listenCommands();

    if (token) {
      this.login(token);
    }
  }

  listenCommands() {
    this.on(Events.InteractionCreate, async (interaction) => {
      if (interaction.isCommand()) {
        const command = this.commands.get(interaction.commandName);
        if (!command) return;

        try {
          console.info(
            `Command ${command.name} executed by ${interaction.user.tag}`,
          );
          await command.action(interaction);

          if (interaction.replied) return;
          await interaction.reply({
            content: 'Command executed!',
            ephemeral: true,
          });
        } catch (error) {
          console.error(error);
          await interaction.reply({
            content: 'There was an error while executing this command!',
            ephemeral: true,
          });
        }
      } else if (interaction.isAutocomplete()) {
        const command = this.commands.get(interaction.commandName);
        if (!command) return;

        try {
          console.info(
            `Autocomplete ${interaction.commandName} executed by ${interaction.user.tag}`,
          );

          const name = interaction.options.getFocused(true).name;
          const autocomplete = command.autocompletes.get(name);

          if (!autocomplete) return;

          await autocomplete(interaction);

          if (interaction.responded) return;
          await interaction.respond([]);
        } catch (error) {
          console.error(error);
          await interaction.respond([]);
        }
      }
    });
  }

  registerModules(modules: Module[]) {
    for (const module of modules) {
      module.register(this);
    }
  }

  uploadAppCommands(client: Client, auth: { clientId: string; token: string }) {
    if (!client.commands) return;
    const { clientId, token } = auth;

    if (!token) return;
    if ((clientId ?? null) === null || clientId === '') return;

    const restClient = new REST().setToken(token);
    const commands = client.commands.map((command) => {
      return command.toJSON();
    });

    console.log('Updating commands', commands);
    restClient
      .put(Routes.applicationCommands(clientId), {
        body: commands,
      })
      .then((resp) => console.log(resp))
      .catch(console.error);
  }
}
