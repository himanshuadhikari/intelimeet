/**
 * @license ChantersJs v0.5
 * (c) 2013-2016 Chanters, Inc. http://chanters.herokuapp.com
 * License: MIT
 */

/**
 * ChantersJs is a JavaScript library for creating Web Components
 * ShadowRoot not supporting
 * Provides light Two-way data binding(browser supported) i.e.,
 * Object.defineProperties, Obect.defineProperty depends on the browser
 */


(function(window, document, undefined, factory) {
    window["Chanters"] = factory();

})(window, document, undefined, function() {

    /**
     * core functions
     */
    var isArray = Array.isArray;

    function forLoop(arr, callback) {
        if (arr && arr.length)
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] && typeof callback === "function")
                    callback(arr[i], i);
            }
    }


    function forEach(obj, iterator) {

        if (isArray(obj))
            obj.forEach(function(element, index, array) {
                if (iterator.call)
                    iterator.call(window, element, index, array);

            });

        else if (isObject(obj))
            Object.keys(obj).forEach(function(key, index, object) {
                if (iterator.call)
                    iterator.call(window, key, obj[key], index);

            });
    }

    function lowercase(string) {
        return isString(string) ? string.toLowerCase() : string;
    };

    function uppercase(string) {
        return isString(string) ? string.toUpperCase() : string;
    };


    function isString(value) {
        return typeof value === 'string';
    };

    function isObject(value) {
        return value !== null && typeof value === 'object';
    }

    function isNumber(value) {
        return typeof value === 'number';
    }

    function isDate(value) {
        return toString.call(value) === '[object Date]';
    }

    function isFunction(value) {
        return typeof value === 'function';
    }

    function isWindow(obj) {
        return obj && obj.window === obj;
    }

    function isFile(obj) {
        return toString.call(obj) === '[object File]';
    }

    function isFormData(obj) {
        return toString.call(obj) === '[object FormData]';
    }



    function keys(obj) {
        return isObject(obj) && Object.keys(obj);
    }

    /*
     *  HTML NODE related function
     */

    /*
     *  Recursive loop for html node
     *  node parser
     */
    function walkNodes(node, callback) {
        if (node.childNodes.length > 0) {
            var child = node.firstChild;
            while (child) {
                if (callback && typeof callback === "function")
                    callback(child);

                walkNodes(child, callback);
                child = child.nextSibling;
            }
        }
    }

    function getBindingVariables(str) {
        if (str.indexOf("{{") !== -1)
            return str.trim().match(/{{\s*[\w\.]+\s*}}/g).map(function(x) {
                return x.match(/[\w\.]+/)[0];
            });
    }

    function setBindingVariables(n, from, With, str_) {
        var str = str_ || n.textContent;
        for (var i = 0; i < from.length; i++) {
            str = str.replace(new RegExp('{{' + from[i] + '}}', 'gi'), With[i]);
            if (!str_)
                n.textContent = str;
        }
        if (str_)
            return str;
    }

    function addEventListener(n, eventName, callback) {
        n.addEventListener(eventName, callback);
    }

    function cloneHTMLNodes(n) {
        var _n = document.createElement(n.nodeName);
        _n.innerHTML = n.innerHTML;
        return _n;
    }

    function createHTMLElement(tagName) {
        return document.createElement(tagName);
    }

    function getNodeName(element) {
        return lowercase(element.nodeName || (element[0] && element[0].nodeName));
    }

    function hasTextContent(n) {
        if (n.textContent.trim().length)
            return true;
        else
            return false;
    }

    /*
     *  HTML NODE related function
     */


    /**
     * core functions
     */



    /**
     * ChantersJs constructor function
     */

    function Chanters(name, prototype) {
        if (!name)
            throw "please provide template name";

        if (typeof name === "object")
            throw "Template name should not be a String";

        if (name && prototype)
            Chanters.init(name, prototype);
    }

    /**
     * ChantersJs constructor function
     */


    Chanters.init = function(name, prototype) {
        var node = document.querySelector(name);
        var webComponent = new WebComponent(node, prototype);
        node.parentNode.replaceChild(webComponent, node);
        webComponent.onReady();
    }


    /**
     * Base Observer Class
     * Detects the changes over an object
     */

    Observers.prototype.__destroy__ = function(callback) {};


    function Observers(webComponent) {
        this.mapper = {};
        this.webComponent = webComponent;
        this.__cloneWebCompnent__(webComponent);
    }

    Observers.prototype.__cloneWebCompnent__ = function(webComponent) {
        var proto = cloneObject(webComponent.prototype);
        var prototype = webComponent.prototype;

        forEach(proto, function(key) {
            webComponent[key] = proto[key];
        });

        forEach(prototype, function(key) {
            if (isFunction(prototype[key]))
                webComponent[key] = prototype[key];
        })
    }

    function cloneObject(obj) {
        if (isObject(obj))
            return JSON.parse(JSON.stringify(obj));
    }


    Observers.prototype.__observe__ = function(n) {
        var obj = n.bindingObject.obj,
            clone = n.bindingObject.clone,
            bindingObject = n.bindingObject.textContent[0],
            _keys = bindingObject.keys,
            webComponent = this.webComponent,
            templateInstance = n.bindingObject.targetNodes,
            that = this;



        forEach(_keys, function(key, i) {
            var check = _checkValuesFromKeys(webComponent, key, that.mapper);
            if (check)
                that.__defineProperty__(obj, key, clone, templateInstance);
        });
    }

    function _checkValuesFromKeys(o, s, mapper) {
        s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
        s = s.replace(/^\./, ''); // strip a leading dot
        var a = s.split('.');

        for (var i = 0, n = a.length; i < n; ++i) {
            var k = a[i];

            if (k in o) {

                if (mapper[k] && i === a.length - 1)
                    return false;

                if (isString(o[k]))
                    mapper[k] = true;


                if (isObject(o[k])) {
                    if (!mapper[k])
                        mapper[k] = {};

                    mapper = mapper[k];
                }

                o = o[k];
            } else {
                return;
            }
        }

        return true;
    }


    Observers.prototype.__defineProperty__ = function(tag, key, clone, templateInstance) {
        key = key.split(".").pop();
        var that = this;

        Object.defineProperty(tag, key, {
            get: function() {
                // console.log("get", key);
                return clone[key];
            },
            set: function(val) {
                var change = that.__apply__(clone, key, val);
                if (!change)
                    return;

                change.templateInstance = templateInstance[key];
                clone[key] = val;


                that.__digest__(change);

            },
            enumerable: true
        });
    };

    Observers.prototype.__digest__ = function(change) {
        if (!change.templateInstance)
            return;

        var webComponent = this.webComponent;

        change.templateInstance.forEach(function(item) {
            var bindingObject = item.bindingObject.textContent[0];
            var raw = bindingObject.raw;

            var _keys = getBindingVariables(raw);

            var values = [];
            forEach(_keys, function(key, i) {
                values.push(byString(webComponent, key));
            });

            item.node.textContent = raw;

            setBindingVariables(item.node, _keys, values);


        })
    }


    function _getValuesFromKeys(o, s) {
        s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
        s = s.replace(/^\./, ''); // strip a leading dot
        var a = s.split('.');

        for (var i = 0, n = a.length; i < n; ++i) {
            var k = a[i];

            if (k in o) {
                o = o[k];
            } else {
                return;
            }
        }
        return o;
    }

    Observers.prototype.__apply__ = function(clone, key, value) {
        var newValue = value;
        var oldValue = clone[key];

        if (oldValue !== newValue) {
            return {
                name: key,
                newValue: newValue,
                oldValue: oldValue,
                type: "updated"
            }
        }
    }



    /**
     * Base Observer Class
     * Detects the changes over an object
     */

    /**
     * Base WebComponent Class
     */

    function WebComponent(webComponent, proto) {
        this.initializeComponent(webComponent, proto);

        (function(webComponent) {
            var getters = new Getters(webComponent);
            var observer = new Observers(webComponent);
            webComponent.templateInstance = new Object();

            walkNodes(webComponent, function(n) {
                if (!n.processedNode) {

                    n.bindingObject = new Object();


                    getters.__Filter__Node(n, webComponent);

                    if (keys(n.bindingObject).length && n.bindingObject.textContent) {
                        observer.__observe__(n);
                    }
                }

            });

            observer.__destroy__();


        })(this.node);

        return this.node;
    }


    WebComponent.prototype.initializeComponent = function(node, proto) {
        this.node = createHTMLElement(getNodeName(node));

        var template = node.querySelector("template");
        this.node.appendChild(document.importNode(template.content, true));
        this.node.prototype = proto;
    }



    /**
     * Base WebComponent Class
     */

    /**
     * Base Getter Class
     * Get every node binding request from template tag
     * Example text binding, event listeners
     */

    function Getters(n) {
        this.node = n;
    }

    Getters.prototype.__Filter__Node = function(n, webComponent) {
        var o = n.bindingObject;
        if (n.nodeType === 8)
            return;
        // only textNodes are available here
        // this part is important for text Binding
        if (hasTextContent(n) && n.childNodes.length < 1)
            this.__Getter__TextNodes(n, webComponent);

        // non-textNodes
        // this part is important for attributes Binding
        else if (n.nodeType === 1) {
            // if (n.nodeName === "TEMPLATE") {
            //     if (n.getAttribute("repeat"))
            //         this.__Getter__Template(n, o)
            //     else if (n.getAttribute("if"))
            //         console.log("do if binding here");
            // }

            // // this section is for attribute binding such as events and binding attribute with scope object 
            // // node type===1
            if (n.attributes.length)
                this.__Getter__Attributes(n, webComponent);
        }


    }

    Getters.prototype.__Getter__Input = function(n, webComponent, setter) {
        var key = getBindingVariables(n.value)[0];
        if (key) {

            n.value = getValuesFromKeys([key], webComponent) || "";
            var processed = inputCallback.bind(webComponent);
            var attr = getAttributeByName("value", n);
            var bindingObject = attributeIterator.__CreateEvent__Object(attr[0], key, webComponent, processed, 'input');

            function inputCallback(event) {
                console.log("event", event);
            }

            createBindingObject(n.bindingObject, bindingObject);

            n.removeAttribute("value");

            setter.__Setter__Events(n, bindingObject);
        }
    }

    function getAttributeByName(attrName, n) {
        return Array.prototype.slice.call(n.attributes).filter(function(attr) {
            if (attrName === attr.name)
                return attr;
        });
    }

    Getters.prototype.__Getter__Attributes = function(n, webComponent) {
        var setter = new Setters(n);

        if (n.nodeName === "INPUT" && n.value.indexOf("{{") !== -1) {
            this.__Getter__Input(n, webComponent, setter);
        }


        attributeIterator(n, webComponent, function(bindingObject) {
            createBindingObject(n.bindingObject, bindingObject);

            if (bindingObject.bindingType === "Event")
                setter.__Setter__Events(n, bindingObject);
        });



    }


    function attributeIterator(n, webComponent, callback) {
        if (!n.attributes)
            return;


        forLoop(n.attributes, function(attr) {
            if (attr.value.indexOf("{{") !== -1) {
                var _key = getBindingVariables(attr.value)[0];

                if (attr.name.indexOf("on-") !== -1) {
                    var obj = attributeIterator.__CreateEvent__Object(attr, _key, webComponent);

                    if (isFunction(callback) && keys(obj).length)
                        callback(obj);
                }





            } else if (attr.name === "repeat") {
                console.log("template", attr)
            }
        })
    }

    attributeIterator.__CreateEvent__Object = function(attr, key, webComponent, _function, eventType) {
        var eventName = eventType || attr.name.split("on-")[1];
        var callback = _function || webComponent[key].bind(webComponent) || undefined;

        return {
            eventName: eventName,
            functionBody: callback,
            bindingType: "Event",
            scopeVariable: key,
            raw: attr.value
        }
    }

    Getters.prototype.__Getter__TextNodes = function(n, webComponent) {
        var o = n.bindingObject;
        var keys = getBindingVariables(n.textContent);
        var prototype = webComponent.prototype;

        if (!keys) return;

        var setters = new Setters(n);

        var bindingObject = {
            keys: keys,
            bindingType: "textContent",
            raw: n.textContent.trim(),
            values: getValuesFromKeys(keys, webComponent, o, n)
        }

        createBindingObject(o, bindingObject);


        setters.__Setter__TextNodes(n, bindingObject);

    }



    // creates bindingObject from Getters class
    function createBindingObject(o, bindingObject) {
        var bindingType = bindingObject.bindingType;

        if (!o[bindingType])
            o[bindingType] = [];

        o[bindingType].push(bindingObject);
    }


    function getValuesFromKeys(keys, webComponent, bindingObject, n) {
        var values = [];
        forEach(keys, function(key, i) {
            values.push(byString(webComponent, key, bindingObject, n));
        });

        return values;
    }


    function byString(o, s, bindingObject, node) {
        s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
        s = s.replace(/^\./, ''); // strip a leading dot
        var a = s.split('.');

        var prototype = o.prototype;
        var templateInstance = o.templateInstance;


        for (var i = 0, n = a.length; i < n; ++i) {
            var k = a[i];

            if (k in o) {
                if (isString(prototype[k]) && bindingObject) {
                    bindingObject.obj = o;
                    bindingObject.clone = prototype;
                    bindingObject.targetNodes = templateInstance;
                    __mapNodes__(node, bindingObject, templateInstance, k);
                }

                // if (isArray(prototype[k])) {
                //     templateInstance[k] = [];
                //     templateInstance = templateInstance[k];
                // }

                if (isObject(prototype[k])) {
                    if (!templateInstance[k])
                        templateInstance[k] = {};

                    templateInstance = templateInstance[k];
                }


                o = o[k];
                prototype = prototype[k];



            } else {
                return;
            }
        }
        // debugger;
        return o;
    }


    function __mapNodes__(n, bindingObject, templateInstance, key) {
        if (!templateInstance[key]) {
            templateInstance[key] = [];
        }

        templateInstance[key].push({
            node: n,
            bindingObject: bindingObject
        });
    };


    /**
     * Base Getter Class
     * Get every node binding request from a template tag
     * Example text binding, event listeners
     */



    /**
     * Base Setters Class
     * Set every node setter request from a template tag
     * Example text binding, event listeners
     */

    function Setters(n) {
        this.node = n;
    }

    Setters.prototype.__Setter__TextNodes = function(n, bindingObject) {
        var _from = bindingObject.keys,
            _with = bindingObject.values;

        setBindingVariables(n, _from, _with);

        // this.__Setter__MapNodes(n, o, bindingObject);
    };


    Setters.prototype.__Setter__Events = function(n, bindingObject, o) {
        // this.mapNodes(n, o, repeaterObject);
        if (bindingObject.functionBody)
            addEventListener(n, bindingObject.eventName, bindingObject.functionBody);
    };

    Chanters.version = '0.0.5';

    return Chanters;

});
