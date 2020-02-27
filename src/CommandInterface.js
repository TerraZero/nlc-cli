export default class CommandInterface {

  /**
   * @param {import('nlc/src/Core').default} core
   * @param {import('commander')}
   */
  constructor(core, cli) {
    this._core = core;
    this._cli = cli;
  }

  /**
   *  @returns {import('nlc/src/Core').default}
   */
  get core() {
    return this._core;
  }

  /**
   * @param {string} definition
   * @returns {import('commander')}
   */
  command(definition) {
    return this._cli.command(definition);
  }

  /**
   * @returns {import('commander')}
   */
  init() { }

  /**
   * @param {import('nlc-cli/src/CommandRequest').default} request
   */
  action(request) { }

}
