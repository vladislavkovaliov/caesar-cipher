const fs = require('fs');
const { program } = require('commander');
const { pipeline, Readable } = require('stream');

const Decoder = require('./src/transformers/decoder');
const Encoder = require('./src/transformers/encoder');

const { isAcessToFile, onError } = require('./src/utils');

const ENCODE = 'encode';
const DECODE = 'decode';


program
    .storeOptionsAsProperties(false)
    .passCommandToAction(false);

program
    .requiredOption('-s, --shift <int>', 'should be a number of shift')
    .option('-i, --input <filepath>', 'should be path to an input file')
    .option('-o, --output <filepath>', 'should be path to an output file');

program
    .requiredOption('-a, --action <action>', 'should be one of actions such as \'encode\' or \'decode\'')
    .action((options) => {
        const { input, output, shift } = options;
        const errorMessage = 'The %FILE% doesn\'t exist.';
        
        if (!input && output && fs.existsSync(output)) {
            console.log('To exit, press ^C again or ^D.');
        } else if (!fs.existsSync(input)) {
            onError({ message: errorMessage.replace('%FILE%', input) });
            process.exit(0);
        } else if (input) {
            isAcessToFile(fs, input);
        }

        if (output && !fs.existsSync(output)) {
            onError({ message: errorMessage.replace('%FILE%', output) });
            process.exit(0);
        } else if (output) {
            isAcessToFile(fs, output);
        }

        let transform = null;

        switch(options.action) {
        case ENCODE: {
            transform = new Encoder({ shift: shift });
            break;
        }
        case DECODE: {
            transform = new Decoder({ shift: shift });
            break;
        }
        default: {
            program.help();
            process.exit(0);
        }
        }

        pipeline(
            input ? fs.createReadStream(input) : Readable.from(process.stdin),
            transform,
            output ? fs.createWriteStream(output, { flags: 'a' }) : process.stdout,
            onError,
        );
    });

program.parse(process.argv);
