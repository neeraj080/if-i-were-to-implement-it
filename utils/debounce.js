const { time } = require("console");

// Executes debounced at the start
function debounce(fn, wait) {
    let timerId = null;
    return function () {
        if (timerId) {
            clearTimeout(timerId);
        }

        timerId = setTimeout(() => {
            fn.apply(null, arguments);
        }, wait);
    }
}

// Executes the debouned function at the start
function debounceV2(fn, wait) {
    let timerId = null;
    return function () {
        if (!timerId) {
            fn.apply(null, arguments);
        } else {
            clearTimeout(timerId);
        }

        timerId = setTimeout(() => {
            timerId = null;
        }, wait)
    }
}

