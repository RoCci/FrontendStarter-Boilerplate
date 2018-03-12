'use strict';

const toLetter = (num) => {
    var mod = num % 26,
        pow = num / 26 | 0,
        out = mod ? String.fromCharCode(64 + mod) : (--pow, 'Z');
    return pow ? toLetter(pow) + out : out;
};

export default toLetter;
