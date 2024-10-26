import {
  type AutocompleteInteraction,
  type CommandInteraction,
  type RESTPostAPIChatInputApplicationCommandsJSONBody,
} from 'discord.js';

export type SlashCommandAction = (
  interaction: CommandInteraction,
) => Promise<void> | void;

export type AutocompleteAction = (
  interaction: AutocompleteInteraction,
) => Promise<void> | void;

export interface CommandJsonResolvable {
  action: SlashCommandAction;
  autocompletes: Map<string, AutocompleteAction>;
  name: string;
  toJSON: () => RESTPostAPIChatInputApplicationCommandsJSONBody;
}
