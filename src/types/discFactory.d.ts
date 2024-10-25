import { type ClientOptions } from 'discord.js';

export interface DiscFactoryOptions extends ClientOptions {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  modules?: any[];
  token?: string;
}
