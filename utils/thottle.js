// Executes at the end
function throttle(fn, interval) {
    let args, timerId = null;
    return function () {
        args = arguments;
        if (timerId) {
            return;
        }

        timerId = setTimeout(() => {
            fn.apply(null, args);
            timerId = null;
        }, interval);
    }
}

// Executes at the start
function throttleV2(fn, interval) {
    let hasExecuted = false;
    return function () {
        if (hasExecuted) {
            return;
        }

        fn.apply(null, arguments);
        hasExecuted = true;
        setTimeout(() => {
            hasExecuted = false;
        }, interval);
    }
}