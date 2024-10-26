import { type Module } from '../structures/module';
import { type ClientOptions } from 'discord.js';

export interface DiscFactoryOptions extends ClientOptions {
  modules?: Module[];
  token?: string;
}
