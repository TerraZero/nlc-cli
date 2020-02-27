import CommandInterface from 'nlc-cli/src/CommandInterface';



export default class CoreCommand extends CommandInterface {

  init() {
    return this.command('core <hallo>')
      .option('--ok [ok]', 'the ok option');
  }

  /**
   * @param {import('nlc-cli/src/CommandRequest').default} request
   */
  action(request, cool) {
    console.log(cool);
    console.table([{ a: 'a1', b: 'b1', c: 'c1' }, { a: 'a2', d: 'd2', c: 'c2' }], ['d']);
    request.logger.trace('versuch');
  }

}
