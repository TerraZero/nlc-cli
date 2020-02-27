import Bag from 'nlc-util/src/data/Bag';



export default class CommandRequest {

  /**
   * @param {Array} args
   * @param {import('nlc-util/src/logger/Logger').default} logger
   */
  constructor(args, logger) {
    this._args = args;
    this._logger = logger;
    this._program = args.pop();
    this._bag = new Bag();
    this._options = {};

    for (const opt of this._program.options) {
      let name = opt.long;

      if (name.startsWith('--')) {
        name = name.substring(2);
      } else {
        name = name.substring(1).toUpperCase();
      }
      this._options[name] = this._program[name];
    }
  }

  /**
   * @returns {Object<string, (boolean|number|string|Array)>}
   */
  get options() {
    return this._options;
  }

  /**
   * @returns {string[]}
   */
  get args() {
    return this._args;
  }

  /**
   * @returns {Bag}
   */
  get bag() {
    return this._bag;
  }

  /**
   * @returns {import('nlc-util/src/logger/Logger').default}
   */
  get logger() {
    return this._logger;
  }

  /**
   * @param {string} name
   * @param {any} fallback
   * @returns {any}
   */
  get(name, fallback = null) {
    return this.bag.get(name, fallback);
  }

  /**
   * @param {string} name
   * @param {any} value
   * @returns {this}
   */
  set(name, value) {
    this.bag.set(name, value);
    return this;
  }

}
