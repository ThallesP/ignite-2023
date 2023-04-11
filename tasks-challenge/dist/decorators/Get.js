export function loggedMethod(target, _context) {
    function replacementMethod(...args) {
        console.log("LOG: Entering method.");
        const result = target.call(this, ...args);
        console.log("LOG: Exiting method.");
        return result;
    }
    return replacementMethod;
}
