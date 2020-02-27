import Commander from 'commander';

import CommandRequest from 'nlc-cli/src/CommandRequest';



export default class CommandManager {

  /**
   * @param {import('nlc/src/Core').default} core
   * @param {import('nlc-util/src/data/Bag').default} commands
   */
  constructor(core, commands) {
    this._core = core;
    this._commands = commands;
    this._logger = this._core.createLogger('cli');
    this._inited = false;
  }

  /**
   * @returns {import('commander')}
   */
  get cli() {
    return Commander;
  }

  init() {
    if (this._inited) return;

    for (const name in this._commands.data) {
      const command = new (this._commands.data[name].subject)(this._core, this.cli);

      this._logger.trace('init command: ' + name);

      command
        .init()
        .action(async (...args) => {
          const logger = this._logger.create(name);

          this._logger.trace('execute command: ' + name);
          await command.action(new CommandRequest(args, logger), ...args);
        });
    }

    // error on unknown commands
    this.cli.on('command:*', () => {
      console.error('Invalid command: %s\nSee --help for a list of available commands.', this.cli.args.join(' '));
      process.exit(1);
    });

    this._core.container.trigger('on.cli.init', this);

    this._inited = true;
  }

  /**
   * @param {(string|string[])} argv
   */
  executeProcess(argv = []) {
    if (typeof argv === 'string') argv = argv.split(' ');
    this.execute(argv.splice(0, 2));
  }

  /**
   * @param {(string|string[])} argv
   * @returns {Promise}
   */
  execute(argv = []) {
    if (typeof argv === 'string') argv = argv.split(' ');
    this.init();

    argv.unshift('', '');
    this._core.container.trigger('on.cli.execute', argv);
    this._logger.trace('execute: ' + argv.slice(2).join(' '));
    return this.cli.parseAsync(argv);
  }

}
