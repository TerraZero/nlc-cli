import Core from 'nlc/src/Core';



const core = new Core();
core.boot(null, true);
core.service('nlc.cli').execute(process.argv);
