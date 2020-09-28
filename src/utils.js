/**
 * Caaesar cipher letter transformation
 * 
 * @param {char} letter 
 * @param {number} direction 1 move to right and -1 move to left
 */
function crypto(letter, shift, direction = 1) {
    return letter.match('[a-zA-Z]') 
        ? String.fromCharCode(letter.charCodeAt() + (direction * shift))
        : letter;
}

/**
 * The function should exit from the application
 * if the application doesn't have permissions
 * 
 * @param {fs} fs - fs module
 * @param {string} filepath
 */
function isAcessToFile(fs, filepath) {
    try {
        fs.accessSync(filepath, fs.constants.R_OK | fs.constants.W_OK);
    } catch (err) {
        onError(err);
        process.exit(0);
    }
}

/**
 * Just function to print a error messesage only
 * 
 * @param {Erro} err 
 */
function onError(err) { 
    if (!err) return;
    console.error(err.message);
}

module.exports.crypto = crypto;
module.exports.isAcessToFile = isAcessToFile;
module.exports.onError = onError;
