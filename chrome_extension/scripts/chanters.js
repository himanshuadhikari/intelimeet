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

    function cloneObject(object, callback) {
        if (!object) return;

        var obj = {};

        forEach(object, function(key, value) {
            if (isFunction(object[key]))
                return;
            if (callback) {
                callback(key, value, obj);
            } else {
                obj[key] = object[key];
            }
        });

        return obj;
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
        console.log(webComponent);
    }


    /**
     * Base Observer Class
     * Detects the changes over an object
     */

    function Observers(n) {
        this.node = n;
        n.templateInstance = cloneObject(this.node.prototype, function(key, value, obj) {
            obj[key] = {
                startValue: value,
                nodeTrack: [],
                status: false
            }
        }.bind(this));
    }

    Observers.prototype.__observe__ = function(n, o) {
        var templateInstance = this.node.templateInstance,
            that = this;

        forLoop(o.keys, function(key) {
            if (!templateInstance[key].status) {
                that.__createObservers__(that.node, key, that.node.prototype, templateInstance[key]);
                templateInstance[key].status = true;
            }

            if (templateInstance[key]) {
                that.__mapNodes__(n, o, templateInstance[key].nodeTrack);
            }
        });
    };

    Observers.prototype.__mapNodes__ = function(n, o, templateInstance) {
        templateInstance.push({
            node: n,
            bindingObject: o
        });
    };
    Observers.prototype.__destroy__ = function(callback) {};

    Observers.prototype.__createObservers__ = function(tag, key, prototype, templateInstance) {
        var that = this;
        Object.defineProperty(tag, key, {
            get: function() {
                console.log("string or number getter called");
                return prototype[key];
            },
            set: function(val) {
                console.log("string or number setter called");
                that.__Text__Observers__(tag, key, val, prototype, templateInstance);
                prototype[key] = val;
            },
            enumerable: true
        })
    };

    Observers.prototype.__Text__Observers__ = function(tag, key, val, prototype, templateInstance) {
        if (!key)
            return;

        var newValue = val;
        var oldValue = prototype[key];

        if (newValue === oldValue)
            return;

        prototype[key] = newValue;




        templateInstance.nodeTrack.forEach(function(el) {
            var _from = el.bindingObject.keys,
                _with = getValuesFromKeys(_from, prototype),
                raw = el.bindingObject.raw,
                node = el.node;


            node.textContent = setBindingVariables(null, _from, _with, raw);
        });
    };



    /**
     * Base Observer Class
     * Detects the changes over an object
     */

    /**
     * Base Webcomponet Class
     */

    function WebComponent(node, proto) {
        this.initializeComponent(node, proto);

        (function(node) {
            var structure = new Array();
            var getters = new Getters(node);
            var observer = new Observers(node);

            walkNodes(node, function(n) {
                if (!n.processedNode) {
                    var o = new Object();
                    getters.__Filter__Node(n, o, structure);

                    if (keys(o).length) {
                        if (o.textContent)
                            observer.__observe__(n, o.textContent[0]);
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
     * Base Webcomponet Class
     */

    /**
     * Base Getter Class
     * Get every node binding request from template tag
     * Example text binding, event listeners
     */

    function Getters(n) {
        this.node = n;
    }

    Getters.prototype.__Filter__Node = function(n, o) {
        if (n.nodeType === 8)
            return;
        // only textNodes are available here
        // this part is important for text Binding
        if (hasTextContent(n) && n.childNodes.length < 1)
            this.__Getter__TextNodes(n, o);

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
            // else if (n.attributes.length)
            //     this.__Getter__Attributes(n, o);
        }


    }

    Getters.prototype.__Getter__TextNodes = function(n, o, structure) {
        var keys = getBindingVariables(n.textContent);

        if (!keys) return;

        var prototype = this.node.prototype || this.node.host.prototype;

        var setters = new Setters(n);

        var bindingObject = {
            keys: keys,
            bindingType: "textContent",
            raw: n.textContent.trim(),
            values: getValuesFromKeys(keys, prototype, o)
        }

        createBindingObject(o, bindingObject, structure);

        setters.__Setter__TextNodes(n, bindingObject);
    }


    // creates bindingObject from Getters class
    function createBindingObject(o, bindingObject, structure) {
        var bindingType = bindingObject.bindingType;

        if (!o[bindingType])
            o[bindingType] = [];

        o[bindingType].push(bindingObject);
    }


    function getValuesFromKeys(keys, prototype, o) {
        var values = [];

        forEach(keys, function(key, i) {
            if (prototype && prototype[key] && !isObject(prototype[key]))
                values.push(prototype[key]);
        });

        return values;
    }

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

    Setters.prototype.__Setter__TextNodes = function(n, bindingObject, o) {
        var _from = bindingObject.keys,
            _with = bindingObject.values;

        setBindingVariables(n, _from, _with);

        // this.__Setter__MapNodes(n, o, bindingObject);
    };

    Chanters.version = '0.0.5';

    return Chanters;

});
