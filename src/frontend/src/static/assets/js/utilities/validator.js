class Validator {
    static isNotEmpty( value ) {
        return value !== '';
    }

    static isPLZ( value ) {
        return /^[0-9]{5}$/.test( value );
    }

    static isEmail( value ) {
        return /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test( value );
    }

    /* See: https://stackoverflow.com/questions/3183322/one-line-match-in-js-regex
    exec: A RegExp method that executes a search for a match in a string.
        It returns an array of information.
    test: A RegExp method that tests for a match in a string.
        It returns true or false.
    match: A String method that executes a search for a match in a string.
        It returns an array of information or null on a mismatch.
    search: A String method that tests for a match in a string.
        It returns the index of the match, or -1 if the search fails.
    replace: A String method that executes a search for a match in a string,
        and replaces the matched substring with a replacement substring.
    split: A String method that uses a regular expression or a fixed string
        to break a string into an array of substrings.
    */
}

module.exports = Validator;
