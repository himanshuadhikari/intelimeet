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
        if (!arr)
            return;

        if (isArray(arr))
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] && typeof callback === "function")
                    callback(arr[i], i);
            }
        else if (isObject(arr))
            Object.keys(arr).forEach(function(key, index, object) {
                if (arr[key] && typeof callback === "function")
                    callback(key, arr[key], index);
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

    function setBindingVariables(textContent, from, With) {
        var str = textContent;
        for (var i = 0; i < from.length; i++) {
            str = str.replace(new RegExp('{{' + from[i] + '}}', 'gi'), With[i]);
        }

        return str;
    }

    function addEventListener(n, eventName, callback) {
        n.addEventListener(eventName, callback);
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

    function cloneHTMLNodes(n) {
        var cloneNode = createHTMLElement(n.nodeName);
        cloneNode.innerHTML = n.innerHTML;
        return cloneNode;
    }

    function cloneObject(obj) {
        if (isObject(obj))
            return JSON.parse(JSON.stringify(obj));
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

    Chanters.init = function(name, prototype) {
        var node = document.currentScript.parentNode;

        var webComponent = new WebComponent(node, prototype);
        // console.log(webComponent.templateInstance);

        // node.parentNode.replaceChild(webComponent, node);
        debugger;
        if (webComponent.onReady)
            webComponent.onReady();
    }


    /**
     * ChantersJs constructor function
     */


    /**
     * Base Observer Class
     * Detects the changes over an object
     */

    Observers.prototype.__destroy__ = function(callback) {};



    function Observers(webComponent, prototype) {
        this.mapper = {};
        this.prototype = prototype;
        this.webComponent = webComponent;
        this.__cloneWebCompnent__(webComponent);
    }

    Observers.prototype.__cloneWebCompnent__ = function(webComponent) {
        var proto = cloneObject(this.prototype);
        var prototype = this.prototype;

        forLoop(proto, function(key) {
            webComponent[key] = proto[key];
        });

        forLoop(prototype, function(key) {
            if (isFunction(prototype[key]))
                webComponent[key] = prototype[key];
        })
    }

    // Note :: at a time only one binding type will be here 
    // means if a div have 

    Observers.prototype.__observe__ = function(n, nodeObject) {
        console.log(n, nodeObject);
    }

    /**
     * Base Observer Class
     * Detects the changes over an object
     */

    /**
     * Base WebComponent Class
     */

    function WebComponent(webComponent, prototype) {
        this.initializeComponent(webComponent, prototype);

        (function(webComponent) {
            var observer = new Observers(webComponent, prototype);

            webComponent.templateInstance = new Object();

            walkNodes(webComponent, function(n) {
                var nodeObject = new Object();

                new Getters(n, nodeObject, webComponent, prototype);

                if (keys(nodeObject).length) {
                    new Setters(n, nodeObject, webComponent, prototype);
                    observer.__observe__(n, nodeObject);
                }

            });

            // observer.__destroy__();


        })(this.node);

        return this.node;
    }


    WebComponent.prototype.initializeComponent = function(node, proto) {
        var template = node.querySelector("template");
        if (!template) return;

        this.node = createHTMLElement(getNodeName(node));
        this.node.appendChild(document.importNode(template.content, true));
    }



    /**
     * Base WebComponent Class
     */


    /**
     * Base Setters Class
     * Get every node binding request from template tag
     * Example text binding, event listeners
     */
    // todo :: refactor below code
    function Setters(n, nodeObject, webComponent, prototype) {
        this.webComponent = webComponent;
        this.prototype = prototype;

        this.__Init__(n, nodeObject);
    }

    Setters.prototype.__Init__ = function(n, nodeObject) {
        var that = this;

        forLoop(nodeObject, function(bindingType, item) {
            if (isArray(item))
                forLoop(item, function(bindingObject) {
                    if (bindingType === "TextContent")
                        that.__SetterTextNodes__(n, bindingObject);
                });
        })

    }

    Setters.prototype.__SetterTextNodes__ = function(n, bindingObject) {
        var _from = bindingObject.keys,
            _with = bindingObject.values;

        n.textContent = setBindingVariables(n.textContent, _from, _with);
    };

    /**
     * Base Setters Class
     * Get every node binding request from template tag
     * Example text binding, event listeners
     */


    /**
     * Base Getter Class
     * Get every node binding request from template tag
     * Example text binding, event listeners
     */

    // todo :: refactor below code
    function Getters(n, nodeObject, webComponent, prototype) {
        this.webComponent = webComponent;
        this.prototype = prototype;
        this.__FilterNode__(n, nodeObject);
    }

    Getters.prototype.__FilterNode__ = function(n, nodeObject) {
        if (n.nodeType === 8)
            return; // ignore comment nodes

        // only textNodes are available here
        // this part is important for text Binding
        if (hasTextContent(n) && n.childNodes.length < 1)
            this.__GetterTextNodes__(n, nodeObject);


        // non-textNodes
        // this part is important for attributes Binding and template repeat and conditions
        else if (n.nodeType === 1) {
            // if (n.nodeName === "TEMPLATE") {
            //     if (n.getAttribute("repeat"))
            //         this.__Getter__Template(n, webComponent)
            //     else if (n.getAttribute("if"))
            //         console.log("do if binding here");
            // } else 
            if (n.attributes.length)
                this.__GetterAttributes__(n, nodeObject);

            // // this section is for attribute binding such as events and binding attribute with scope object 
            // // node type===1

        }


    }


    Getters.prototype.__GetterAttributes__ = function(n, nodeObject) {
        var webComponent = this.webComponent;
        var prototype = this.prototype;

        if (n.nodeName === "INPUT" && n.value.indexOf("{{") !== -1) {
            // this.__Getter__Input(n, webComponent, setter);
        }
        attributeIterator(n, prototype, nodeObject, webComponent, function(bindingObject) {
            createBindingObject(nodeObject, bindingObject);
        });



    }

    function attributeIterator(n, prototype, nodeObject, webComponent, callback) {
        if (!n.attributes)
            return;

        forLoop(n.attributes, function(index, attr) {
            if (attr.value.indexOf("{{") !== -1) {
                var _keys = getBindingVariables(attr.value);

                if (attr.name.indexOf("on-") !== -1) {
                    // var obj = attributeIterator.__CreateEvent__Object(attr, _keys, webComponent);

                    // if (isFunction(callback) && keys(obj).length)
                    //     callback(obj);
                } else {

                    var obj = attributeIterator.__CreateAttribute__Object(attr, _keys, prototype, n, nodeObject, webComponent);

                    if (isFunction(callback) && keys(obj).length)
                        callback(obj);
                }





            } else if (attr.name === "repeat") {
                console.log("template", attr, n);
            }
        })
    }

    attributeIterator.__CreateAttribute__Object = function(attr, keys, prototype, n, nodeObject, webComponent) {
        var values;
        if (n)
            values = getValuesFromKeys(keys, prototype, nodeObject, n, webComponent); // for second level
        else
            values = getValuesFromKeys(keys, prototype); // for first level



        var obj = {
            bindingType: "Attribute",
            raw: attr.value,
            keys: keys,
            values: values,
            attrName: attr.name
        }

        return obj;
    }

    Getters.prototype.__GetterTextNodes__ = function(n, nodeObject) {
        // if (n.processedNode)
        // debugger;


        var keys = getBindingVariables(n.textContent),
            prototype = this.prototype,
            templateInstance = this.webComponent.templateInstance;

        if (!keys) return;

        var bindingObject = {
            keys: keys,
            bindingType: "TextContent",
            raw: n.textContent.trim(),
            values: getValuesFromKeys(keys, prototype, nodeObject, n, this.webComponent)
        }
        createBindingObject(nodeObject, bindingObject);
    }

    function getValuesFromKeys(keys, prototype, nodeObject, n, webComponent) {
        var values = [];
        var templateInstance = webComponent.templateInstance;

        forLoop(keys, function(key, i) {
            values.push(byString(prototype, key, nodeObject, n, templateInstance));
        });

        return values;
    }

    function byString(prototype, s, bindingObject, node, templateInstance) {
        s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
        s = s.replace(/^\./, ''); // strip a leading dot
        var a = s.split('.');


        for (var i = 0, n = a.length; i < n; ++i) {
            var k = a[i];

            if (k in prototype) {

                if ((isString(prototype[k]) || isNumber(prototype[k])) && bindingObject) {
                    bindingObject.obj = prototype;
                    mapNodes(node, bindingObject, templateInstance, k);
                    // bindingObject.templateInstance = templateInstance[k];
                }

                if (isObject(prototype[k])) {
                    if (!templateInstance[k])
                        templateInstance[k] = {};

                    templateInstance = templateInstance[k];
                }

                prototype = prototype[k];
            } else {
                return;
            }
        }
        return prototype;
    }

    function mapNodes(n, bindingObject, templateInstance, key) {
        if (!templateInstance[key]) {
            templateInstance[key] = [];
        }

        templateInstance[key].push({
            node: n,
            bindingObject: bindingObject
        });
    };

    // creates bindingObject from Getters class
    function createBindingObject(o, bindingObject) {
        var bindingType = bindingObject.bindingType;

        if (!o[bindingType])
            o[bindingType] = [];

        o[bindingType].push(bindingObject);
    }



    return Chanters;

});
