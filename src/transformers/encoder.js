const { Transform } = require('stream');

const { DEFAULT_SHIFT } = require('../../config');
const { crypto } = require('../utils');

class Encoder extends Transform {
    constructor(opts = {}) {
        super(opts);
        this.shift = parseInt(opts.shift) || DEFAULT_SHIFT;
    }

    _transform(chunk, _, callback) {
        const str = chunk.toString('utf-8');
        const { shift } = this;
        const out = [...str].map(x => crypto(x, shift)).join('');
        callback(null, Buffer.from(out, 'utf8'));
    }
}

module.exports = Encoder;
