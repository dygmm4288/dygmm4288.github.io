const _ = {};
const MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
const isArrayLike = (list) => {
    const length = list == null ? void 0 : list.length;
    return (
        typeof length === 'number' && length >= 0 && length <= MAX_ARRAY_INDEX
    );
};
const bloop = function (new_data, body) {
    return function (data, iter_predi) {
        const result = new_data(data);
        if (isArrayLike(data)) {
            for (let i = 0, len = data.length; i < len; i++) {
                body(iter_predi(data[i], i, data), result, data[i]);
            }
        } else {
            for (const key in data) {
                if (data.hasOwnProperty(key)) {
                    body(iter_predi(data[key], key, data), result, data[key]);
                }
            }
        }
        return result;
    };
};
_.identity = (v) => v;
_.noop = () => {};
_.array = () => [];
_.push_to = (val, obj) => {
    obj.push(val);
    return val;
};
_.values = (list) => _.map(list, _.identity);
_.toArray = (list) => (Array.isArray(list) ? list : _.values(list));
function partial(fn) {
    const args = _.rest(arguments);
    const placeholder = undefined;
    const argsLength = args.length;

    const bound = function () {
        let position = 0;
        const innerArgs = Array(argsLength);
        for (let i = 0, len = argsLength; i < len; i++) {
            innerArgs[i] =
                args[i] === placeholder ? arguments[position++] : args[i];
        }

        while (position < innerArgs.length) {
            args.push(arguments[position++]);
        }
        return fn.apply(this, innerArgs);
    };

    return bound;
}
/* -------------------Related to Array Method------------------- */
_.map = bloop(_.array, _.push_to);
_.each = bloop(_.identity, _.noop);
_.filter = bloop(_.array, (bool, result, val) => {
    if (bool) result.push(val);
});
_.rest = (list, num = 1) => _.toArray(list).slice(num);
_.filterTwo = bloop(
    () => [[], []],
    (bool, result, val) => {
        if (bool) result[0].push(val);
        else result[1].push(val);
    },
);

/* -------------------Related to DOM------------------- */
const addEvent = (element, type, func) => {
    element.addEventListener(type, (e) => func(e, element));
};
const property = function (property) {
    const args = _.rest(arguments)[0];
    return function (element) {
        const value = _.rest(arguments)[0];
        if (value) {
            element[property][args] = value;
        }
        return element[property][args];
    };
};
const styleLeft = property('style', 'left');
const styleTop = property('style', 'top');

function getId(element) {
    return (id) => element.getElementById(id);
}
function selector(element) {
    return (selector) => element.querySelector(selector);
}
function dGetId(id) {
    return getId(document)(id);
}
function createElement(tag) {
    return document.createElement(tag);
}
const ce = createElement;
function setClass(element) {
    const classes = _.rest(arguments);
    _.each(classes, (c) => {
        element.classList.add(c);
    });
    return element;
}
function removeClass(element) {
    const classes = _.rest(arguments);
    _.each(classes, (c) => {
        element.classList.remove(c);
    });
    return element;
}
function toggleClass(element) {
    const classes = _.rest(arguments);
    _.each(classes, (c) => {
        element.classList.toggle(c);
    });
    return element;
}
function createIcon() {
    const iconClasses = arguments;
    const icon = createElement('i');
    setClass(icon, ...iconClasses);
    return icon;
}
const appendChild = (parentNode, childNodes) => {
    if (childNodes.length == 1) {
        parentNode.appendChild(childNodes[0]);
    } else {
        _.each(childNodes, (elem) => {
            parentNode.appendChild(elem);
        });
    }
};

/* -------------------Related LocalStorage------------------- */
function setStorage(key, value) {
    return localStorage.setItem(key, value);
}
function getStorage(key) {
    return localStorage.getItem(key);
}
/* -------------------Related Time------------------- */
function splitTime(time) {
    const hh = parseInt(time / (60 * 60));
    time -= hh * 60 * 60;
    const mm = parseInt(time / 60);
    time -= mm * 60;
    const ss = parseInt(time);
    return [hh, mm, ss];
}
function timeFormat(hh, mm, ss) {
    hh = hh.toString().padStart(2, '0');
    mm = mm.toString().padStart(2, '0');
    ss = ss.toString().padStart(2, '0');
    return `${hh}:${mm}:${ss}`;
}
const timeToString = (time) => timeFormat(...splitTime(time));
