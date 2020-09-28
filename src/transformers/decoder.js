const { Transform } = require('stream');

const { DEFAULT_SHIFT } = require('../../config');
const { crypto } = require('../utils');

class Decoder extends Transform {
    constructor(opts = {}) {
        super(opts);
        this.shift = opts.shift || DEFAULT_SHIFT;
    }

    _transform(chunk, _, callback) {
        const str = chunk.toString('utf8');
        const { shift } = this;
        const out = [...str].map(x => crypto(x, shift, -1)).join('');
        callback(null, Buffer.from(out, 'utf8'));
    }
}

module.exports = Decoder;
