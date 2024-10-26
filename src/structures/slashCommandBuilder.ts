import {
  type AutocompleteAction,
  type CommandJsonResolvable,
  type SlashCommandAction,
} from '../types/sCBuilder';
import {
  type RESTPostAPIChatInputApplicationCommandsJSONBody,
  SlashCommandBuilder as SCB,
  SlashCommandStringOption as SCSO,
  type SlashCommandOptionsOnlyBuilder,
} from 'discord.js';

export class SlashCommandStringOption extends SCSO {
  autocompleteAction?: AutocompleteAction;

  setAutocomplete(
    autocompleteOption: AutocompleteAction | boolean | null | undefined,
  ): this {
    if (typeof autocompleteOption === 'boolean') {
      return super.setAutocomplete(autocompleteOption);
    }

    if (typeof autocompleteOption === 'function') {
      this.autocompleteAction = autocompleteOption;
      super.setAutocomplete(true);
    } else if (
      autocompleteOption === null ||
      autocompleteOption === undefined
    ) {
      this.autocompleteAction = undefined;
      super.setAutocomplete(false);
    }

    return this;
  }
}
export class SlashCommandBuilder extends SCB implements CommandJsonResolvable {
  action: SlashCommandAction;

  autocompletes: Map<string, AutocompleteAction> = new Map();

  constructor() {
    super();

    this.action = () => {};
  }

  addStringOption(
    input: ((builder: SCSO) => SCSO) | SCSO,
  ): SlashCommandOptionsOnlyBuilder {
    if (input instanceof SlashCommandStringOption) {
      const clone: typeof input = Object.assign(
        Object.create(Object.getPrototypeOf(input)),
        input,
      );
      delete clone.autocompleteAction;

      if (input.autocompleteAction) {
        this.autocompletes.set(input.name, input.autocompleteAction);
      }

      return super.addStringOption(clone);
    }

    if (typeof input === 'function') {
      const option = input(new SlashCommandStringOption());

      if (option instanceof SlashCommandStringOption) {
        const clone: typeof option = Object.assign(
          Object.create(Object.getPrototypeOf(option)),
          option,
        );
        delete (clone as SlashCommandStringOption).autocompleteAction;

        if (option.autocompleteAction) {
          this.autocompletes.set(option.name, option.autocompleteAction);
        }

        return super.addStringOption(clone);
      }

      return super.addStringOption(option);
    }

    return super.addStringOption(input);
  }

  setAction(action: SlashCommandAction): this {
    this.action = action;
    return this;
  }

  toJSON(): RESTPostAPIChatInputApplicationCommandsJSONBody {
    const { action: _, autocompletes: _u, ...rest } = this;

    return super.toJSON.call(rest);
  }
}
