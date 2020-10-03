class _EventEmitter {
    constructor() {
        this._callbacks = {};
    }

    on(eventName, callback) {
        let handlers = this._callbacks[eventName];

        if (!handlers) {
            handlers = [];
            this._callbacks[eventName] = handlers;
        }

        handlers.push(callback);

        return () => {
            handlers = handlers.filter(handler => handler !== callback);
            this._callbacks[eventName] = handlers.length ? handlers : undefined;
        }
    }

    emit(eventName, ...params) {
        console.log('Emit called');
        const handlers = this._callbacks[eventName];

        if (handlers) {
            handlers.forEach(handler => {
                handler(...params);
            })
        }
    }
}

function EventEmitter() {
    const eventEmitter = new _EventEmitter();

    const disallowedProps = ["_callbacks"];

    return new Proxy(eventEmitter, {
        get(target, prop) {
            if (disallowedProps.includes(prop)) {
                return undefined;
            }

            const value = target[prop];

            if (typeof value === "function") {
                return value.bind(eventEmitter);
            } else {
                return value;
            }
        },

        set(target, prop, value) {
            if (!allowedProps.includes(prop)) {
                target[prop] = value;
            }
        },

        ownKeys(target) {
            return Object.keys(target).filter(key => !key.startsWith("_"));
        },

        deleteProperty(target, prop) {
            if (!disallowedProps.includes(prop)) {
                delete target[prop];
            }
        }
    })
};



const emitter = new EventEmitter();

emitter.on("test", function () {
    console.log("Test successful");
})

emitter.emit("test");
