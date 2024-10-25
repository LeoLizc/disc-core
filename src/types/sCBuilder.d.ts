import {
  type CommandInteraction,
  type RESTPostAPIChatInputApplicationCommandsJSONBody,
} from 'discord.js';

export type SlashCommandAction = (
  interaction: CommandInteraction,
) => Promise<void> | void;

export interface CommandJsonResolvable {
  action: SlashCommandAction;
  name: string;
  toJSON: () => RESTPostAPIChatInputApplicationCommandsJSONBody;
}
