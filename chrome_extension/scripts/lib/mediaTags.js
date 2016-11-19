(function(v) { "object" === typeof exports && "undefined" !== typeof module ? module.exports = v() : "function" === typeof define && define.amd ? define([], v) : ("undefined" !== typeof window ? window : "undefined" !== typeof global ? global : "undefined" !== typeof self ? self : this).jsmediatags = v() })(function() {
    return function f(m, l, k) {
        function g(a, b) {
            if (!l[a]) {
                if (!m[a]) {
                    var e = "function" == typeof require && require;
                    if (!b && e) return e(a, !0);
                    if (d) return d(a, !0);
                    e = Error("Cannot find module '" + a + "'");
                    throw e.code = "MODULE_NOT_FOUND", e;
                }
                e = l[a] = { exports: {} };
                m[a][0].call(e.exports, function(b) {
                    var e = m[a][1][b];
                    return g(e ? e : b)
                }, e, e.exports, f, m, l, k)
            }
            return l[a].exports
        }
        for (var d = "function" == typeof require && require, a = 0; a < k.length; a++) g(k[a]);
        return g
    }({
        1: [function(f, m, l) {}, {}],
        2: [function(f, m, l) { m.exports = XMLHttpRequest }, {}],
        3: [function(f, m, l) {
            function k(d, a) {
                if ("function" !== typeof a && null !== a) throw new TypeError("Super expression must either be null or a function, not " + typeof a);
                d.prototype = Object.create(a && a.prototype, {
                    constructor: {
                        value: d,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                });
                a && (Object.setPrototypeOf ? Object.setPrototypeOf(d, a) : d.__proto__ = a)
            }
            var g = function() {
                function d(a, c) {
                    for (var b = 0; b < c.length; b++) {
                        var e = c[b];
                        e.enumerable = e.enumerable || !1;
                        e.configurable = !0;
                        "value" in e && (e.writable = !0);
                        Object.defineProperty(a, e.key, e)
                    }
                }
                return function(a, c, b) {
                    c && d(a.prototype, c);
                    b && d(a, b);
                    return a
                }
            }();
            f = function(d) {
                function a(c) {
                    if (!(this instanceof a)) throw new TypeError("Cannot call a class as a function");
                    var b;
                    b = Object.getPrototypeOf(a).call(this);
                    if (!this) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    b = !b || "object" !== typeof b && "function" !== typeof b ? this : b;
                    b._array = c;
                    b._size = c.length;
                    b._isInitialized = !0;
                    return b
                }
                k(a, d);
                g(a, [{ key: "init", value: function(a) { setTimeout(a.onSuccess, 0) } }, { key: "loadRange", value: function(a, b) { setTimeout(b.onSuccess, 0) } }, {
                    key: "getByteAt",
                    value: function(a) {
                        return this._array[a]
                    }
                }], [{
                    key: "canReadFile",
                    value: function(a) {
                        return Array.isArray(a) || "function" === typeof Buffer && Buffer.isBuffer(a)
                    }
                }]);
                return a
            }(f("./MediaFileReader"));
            m.exports = f
        }, { "./MediaFileReader": 10 }],
        4: [function(f, m, l) {
            function k(a, c) {
                if ("function" !== typeof c && null !== c) throw new TypeError("Super expression must either be null or a function, not " + typeof c);
                a.prototype = Object.create(c && c.prototype, { constructor: { value: a, enumerable: !1, writable: !0, configurable: !0 } });
                c && (Object.setPrototypeOf ? Object.setPrototypeOf(a, c) : a.__proto__ = c)
            }
            var g = function() {
                    function a(a, b) {
                        for (var e = 0; e < b.length; e++) {
                            var h = b[e];
                            h.enumerable = h.enumerable ||
                                !1;
                            h.configurable = !0;
                            "value" in h && (h.writable = !0);
                            Object.defineProperty(a, h.key, h)
                        }
                    }
                    return function(c, b, e) {
                        b && a(c.prototype, b);
                        e && a(c, e);
                        return c
                    }
                }(),
                d = f("./ChunkedFileData");
            f = function(a) {
                function c(b) {
                    if (!(this instanceof c)) throw new TypeError("Cannot call a class as a function");
                    var a;
                    a = Object.getPrototypeOf(c).call(this);
                    if (!this) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    a = !a || "object" !== typeof a && "function" !== typeof a ? this : a;
                    a._blob = b;
                    a._fileData =
                        new d;
                    return a
                }
                k(c, a);
                g(c, [{
                    key: "_init",
                    value: function(b) {
                        this._size = this._blob.size;
                        setTimeout(b.onSuccess, 1)
                    }
                }, {
                    key: "loadRange",
                    value: function(b, a) {
                        var h = this,
                            c = (this._blob.slice || this._blob.mozSlice || this._blob.webkitSlice).call(this._blob, b[0], b[1] + 1),
                            d = new FileReader;
                        d.onloadend = function(c) {
                            c = new Uint8Array(d.result);
                            h._fileData.addData(b[0], c);
                            a.onSuccess()
                        };
                        d.onerror = d.onabort = function(b) {
                            if (a.onError) a.onError({ type: "blob", info: d.error })
                        };
                        d.readAsArrayBuffer(c)
                    }
                }, {
                    key: "getByteAt",
                    value: function(b) {
                        return this._fileData.getByteAt(b)
                    }
                }], [{
                    key: "canReadFile",
                    value: function(b) {
                        return "undefined" !== typeof Blob && b instanceof Blob || "undefined" !== typeof File && b instanceof File
                    }
                }]);
                return c
            }(f("./MediaFileReader"));
            m.exports = f
        }, { "./ChunkedFileData": 5, "./MediaFileReader": 10 }],
        5: [function(f, m, l) {
            var k = function() {
                function g(d, a) {
                    for (var c = 0; c < a.length; c++) {
                        var b = a[c];
                        b.enumerable = b.enumerable || !1;
                        b.configurable = !0;
                        "value" in b && (b.writable = !0);
                        Object.defineProperty(d, b.key, b)
                    }
                }
                return function(d, a, c) {
                    a && g(d.prototype, a);
                    c && g(d, c);
                    return d
                }
            }();
            f = function() {
                function g() {
                    if (!(this instanceof g)) throw new TypeError("Cannot call a class as a function");
                    this._fileData = []
                }
                k(g, null, [{
                    key: "NOT_FOUND",
                    get: function() {
                        return -1
                    }
                }]);
                k(g, [{
                    key: "addData",
                    value: function(d, a) {
                        var c = d + a.length - 1,
                            b = this._getChunkRange(d, c);
                        if (-1 === b.startIx) this._fileData.splice(b.insertIx || 0, 0, { offset: d, data: a });
                        else {
                            var e = this._fileData[b.startIx],
                                h = this._fileData[b.endIx],
                                c = c < h.offset + h.data.length - 1,
                                n = { offset: Math.min(d, e.offset), data: a };
                            d > e.offset && (e = this._sliceData(e.data,
                                0, d - e.offset), n.data = this._concatData(e, a));
                            c && (e = this._sliceData(n.data, 0, h.offset - n.offset), n.data = this._concatData(e, h.data));
                            this._fileData.splice(b.startIx, b.endIx - b.startIx + 1, n)
                        }
                    }
                }, {
                    key: "_concatData",
                    value: function(d, a) {
                        if ("undefined" !== typeof ArrayBuffer && ArrayBuffer.isView(d)) {
                            var c = new d.constructor(d.length + a.length);
                            c.set(d, 0);
                            c.set(a, d.length);
                            return c
                        }
                        return d.concat(a)
                    }
                }, {
                    key: "_sliceData",
                    value: function(d, a, c) {
                        return d.slice ? d.slice(a, c) : d.subarray(a, c)
                    }
                }, {
                    key: "_getChunkRange",
                    value: function(d,
                        a) {
                        for (var c = -1, b = -1, e = 0, h = 0; h < this._fileData.length; h++, e = h) {
                            var n = this._fileData[h].offset,
                                p = n + this._fileData[h].data.length;
                            if (a < n - 1) break;
                            if (d <= p + 1 && a >= n - 1) {
                                c = h;
                                break
                            }
                        }
                        if (-1 === c) return { startIx: -1, endIx: -1, insertIx: e };
                        for (h = c; h < this._fileData.length && !(n = this._fileData[h].offset, p = n + this._fileData[h].data.length, a >= n - 1 && (b = h), a <= p + 1); h++); - 1 === b && (b = c);
                        return { startIx: c, endIx: b }
                    }
                }, {
                    key: "hasDataRange",
                    value: function(d, a) {
                        for (var c = 0; c < this._fileData.length; c++) {
                            var b = this._fileData[c];
                            if (a < b.offset) break;
                            if (d >= b.offset && a < b.offset + b.data.length) return !0
                        }
                        return !1
                    }
                }, {
                    key: "getByteAt",
                    value: function(d) {
                        for (var a, c = 0; c < this._fileData.length; c++) {
                            if (!this._fileData[c].data.length)
                                return;
                            var b = this._fileData[c].offset,
                                e = b + this._fileData[c].data.length - 1;
                            if (d >= b && d <= e) {
                                a = this._fileData[c];
                                break
                            }
                        }
                        if (a) return a.data[d - a.offset];
                        throw Error("Offset " + d + " hasn't been loaded yet.");
                    }
                }]);
                return g
            }();
            m.exports = f
        }, {}],
        6: [function(f, m, l) {
            function k(a, c) {
                if ("function" !== typeof c && null !== c) throw new TypeError("Super expression must either be null or a function, not " +
                    typeof c);
                a.prototype = Object.create(c && c.prototype, { constructor: { value: a, enumerable: !1, writable: !0, configurable: !0 } });
                c && (Object.setPrototypeOf ? Object.setPrototypeOf(a, c) : a.__proto__ = c)
            }
            var g = function() {
                function a(a, b) {
                    for (var e = 0; e < b.length; e++) {
                        var h = b[e];
                        h.enumerable = h.enumerable || !1;
                        h.configurable = !0;
                        "value" in h && (h.writable = !0);
                        Object.defineProperty(a, h.key, h)
                    }
                }
                return function(c, b, e) {
                    b && a(c.prototype, b);
                    e && a(c, e);
                    return c
                }
            }();
            l = f("./MediaTagReader");
            f("./MediaFileReader");
            f = function(a) {
                function c() {
                    if (!(this instanceof c)) throw new TypeError("Cannot call a class as a function");
                    var b = Object.getPrototypeOf(c).apply(this, arguments);
                    if (!this) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !b || "object" !== typeof b && "function" !== typeof b ? this : b
                }
                k(c, a);
                g(c, [{
                    key: "_loadData",
                    value: function(b, a) {
                        var c = b.getSize();
                        b.loadRange([c - 128, c - 1], a)
                    }
                }, {
                    key: "_parseData",
                    value: function(b, a) {
                        var c = b.getSize() - 128,
                            n = b.getStringWithCharsetAt(c + 3, 30).toString(),
                            p = b.getStringWithCharsetAt(c + 33,
                                30).toString(),
                            t = b.getStringWithCharsetAt(c + 63, 30).toString(),
                            g = b.getStringWithCharsetAt(c + 93, 4).toString(),
                            u = b.getByteAt(c + 97 + 28),
                            f = b.getByteAt(c + 97 + 29);
                        if (0 == u && 0 != f) var u = "1.1",
                            w = b.getStringWithCharsetAt(c + 97, 28).toString();
                        else u = "1.0", w = b.getStringWithCharsetAt(c + 97, 30).toString(), f = 0;
                        c = b.getByteAt(c + 97 + 30);
                        n = { type: "ID3", version: u, tags: { title: n, artist: p, album: t, year: g, comment: w, genre: 255 > c ? d[c] : "" } };
                        f && (n.tags.track = f);
                        return n
                    }
                }], [{
                    key: "getTagIdentifierByteRange",
                    value: function() {
                        return {
                            offset: -128,
                            length: 128
                        }
                    }
                }, {
                    key: "canReadTagFormat",
                    value: function(b) {
                        return "TAG" === String.fromCharCode.apply(String, b.slice(0, 3))
                    }
                }]);
                return c
            }(l);
            var d = "Blues;Classic Rock;Country;Dance;Disco;Funk;Grunge;Hip-Hop;Jazz;Metal;New Age;Oldies;Other;Pop;R&B;Rap;Reggae;Rock;Techno;Industrial;Alternative;Ska;Death Metal;Pranks;Soundtrack;Euro-Techno;Ambient;Trip-Hop;Vocal;Jazz+Funk;Fusion;Trance;Classical;Instrumental;Acid;House;Game;Sound Clip;Gospel;Noise;AlternRock;Bass;Soul;Punk;Space;Meditative;Instrumental Pop;Instrumental Rock;Ethnic;Gothic;Darkwave;Techno-Industrial;Electronic;Pop-Folk;Eurodance;Dream;Southern Rock;Comedy;Cult;Gangsta;Top 40;Christian Rap;Pop/Funk;Jungle;Native American;Cabaret;New Wave;Psychadelic;Rave;Showtunes;Trailer;Lo-Fi;Tribal;Acid Punk;Acid Jazz;Polka;Retro;Musical;Rock & Roll;Hard Rock;Folk;Folk-Rock;National Folk;Swing;Fast Fusion;Bebob;Latin;Revival;Celtic;Bluegrass;Avantgarde;Gothic Rock;Progressive Rock;Psychedelic Rock;Symphonic Rock;Slow Rock;Big Band;Chorus;Easy Listening;Acoustic;Humour;Speech;Chanson;Opera;Chamber Music;Sonata;Symphony;Booty Bass;Primus;Porn Groove;Satire;Slow Jam;Club;Tango;Samba;Folklore;Ballad;Power Ballad;Rhythmic Soul;Freestyle;Duet;Punk Rock;Drum Solo;Acapella;Euro-House;Dance Hall".split(";");
            m.exports = f
        }, { "./MediaFileReader": 10, "./MediaTagReader": 11 }],
        7: [function(f, m, l) {
            function k(a) {
                var c;
                switch (a) {
                    case 0:
                        c = "iso-8859-1";
                        break;
                    case 1:
                        c = "utf-16";
                        break;
                    case 2:
                        c = "utf-16be";
                        break;
                    case 3:
                        c = "utf-8"
                }
                return c
            }
            f("./MediaFileReader");
            var g = {
                APIC: function(a, c, b, e, h) {
                    h = h || "3";
                    e = a;
                    var n = k(b.getByteAt(a));
                    switch (h) {
                        case "2":
                            h = b.getStringAt(a + 1, 3);
                            a += 4;
                            break;
                        case "3":
                        case "4":
                            h = b.getStringWithCharsetAt(a + 1, c - 1);
                            a += 1 + h.bytesReadCount;
                            break;
                        default:
                            throw Error("Couldn't read ID3v2 major version.");
                    }
                    var p =
                        b.getByteAt(a, 1),
                        p = d[p],
                        n = b.getStringWithCharsetAt(a + 1, c - (a - e) - 1, n);
                    a += 1 + n.bytesReadCount;
                    return { format: h.toString(), type: p, description: n.toString(), data: b.getBytesAt(a, e + c - a) }
                },
                COMM: function(a, c, b, e, h) {
                    var n = a,
                        d = k(b.getByteAt(a));
                    e = b.getStringAt(a + 1, 3);
                    h = b.getStringWithCharsetAt(a + 4, c - 4, d);
                    a += 4 + h.bytesReadCount;
                    a = b.getStringWithCharsetAt(a, n + c - a, d);
                    return { language: e, short_description: h.toString(), text: a.toString() }
                }
            };
            g.COM = g.COMM;
            g.PIC = function(a, c, b, e, h) {
                return g.APIC(a, c, b, e, "2")
            };
            g.PCNT = function(a,
                c, b, e, h) {
                return b.getLongAt(a, !1)
            };
            g.CNT = g.PCNT;
            g["T*"] = function(a, c, b, e, h) {
                e = k(b.getByteAt(a));
                return b.getStringWithCharsetAt(a + 1, c - 1, e).toString()
            };
            g["W*"] = function(a, c, b, e, h) {
                e = k(b.getByteAt(a));
                return void 0 !== e ? b.getStringWithCharsetAt(a + 1, c - 1, e).toString() : b.getStringWithCharsetAt(a, c, e).toString()
            };
            g.TCON = function(a, c, b, e) {
                return g["T*"].apply(this, arguments).replace(/^\(\d+\)/, "")
            };
            g.TCO = g.TCON;
            g.USLT = function(a, c, b, e, h) {
                var n = a,
                    d = k(b.getByteAt(a));
                e = b.getStringAt(a + 1, 3);
                h = b.getStringWithCharsetAt(a +
                    4, c - 4, d);
                a += 4 + h.bytesReadCount;
                a = b.getStringWithCharsetAt(a, n + c - a, d);
                return { language: e, descriptor: h.toString(), lyrics: a.toString() }
            };
            g.ULT = g.USLT;
            var d = "Other;32x32 pixels 'file icon' (PNG only);Other file icon;Cover (front);Cover (back);Leaflet page;Media (e.g. label side of CD);Lead artist/lead performer/soloist;Artist/performer;Conductor;Band/Orchestra;Composer;Lyricist/text writer;Recording Location;During recording;During performance;Movie/video screen capture;A bright coloured fish;Illustration;Band/artist logotype;Publisher/Studio logotype".split(";");
            m.exports = {
                getFrameReaderFunction: function(a) {
                    return a in g ? g[a] : "T" === a[0] ? g["T*"] : "W" === a[0] ? g["W*"] : null
                }
            }
        }, { "./MediaFileReader": 10 }],
        8: [function(f, m, l) {
            function k(b, a) {
                if ("function" !== typeof a && null !== a) throw new TypeError("Super expression must either be null or a function, not " + typeof a);
                b.prototype = Object.create(a && a.prototype, { constructor: { value: b, enumerable: !1, writable: !0, configurable: !0 } });
                a && (Object.setPrototypeOf ? Object.setPrototypeOf(b, a) : b.__proto__ = a)
            }
            var g = function() {
                function b(a,
                    c) {
                    for (var e = 0; e < c.length; e++) {
                        var d = c[e];
                        d.enumerable = d.enumerable || !1;
                        d.configurable = !0;
                        "value" in d && (d.writable = !0);
                        Object.defineProperty(a, d.key, d)
                    }
                }
                return function(a, c, d) {
                    c && b(a.prototype, c);
                    d && b(a, d);
                    return a
                }
            }();
            l = f("./MediaTagReader");
            f("./MediaFileReader");
            var d = f("./ArrayFileReader"),
                a = f("./ID3v2FrameReader");
            f = function(e) {
                function h() {
                    if (!(this instanceof h)) throw new TypeError("Cannot call a class as a function");
                    var b = Object.getPrototypeOf(h).apply(this, arguments);
                    if (!this) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !b || "object" !== typeof b && "function" !== typeof b ? this : b
                }
                k(h, e);
                g(h, [{ key: "_loadData", value: function(b, a) { b.loadRange([6, 9], { onSuccess: function() { b.loadRange([0, 10 + b.getSynchsafeInteger32At(6) - 1], a) }, onError: a.onError }) } }, {
                    key: "_parseData",
                    value: function(a, c) {
                        var e = 0,
                            h = a.getByteAt(e + 3);
                        if (4 < h) return { type: "ID3", version: ">2.4", tags: {} };
                        var d = a.getByteAt(e + 4),
                            f = a.isBitSetAt(e + 5, 7),
                            g = a.isBitSetAt(e + 5, 6),
                            x = a.isBitSetAt(e + 5, 5),
                            k = a.getSynchsafeInteger32At(e + 6),
                            e = e + 10;
                        if (g) var m = a.getLongAt(e, !0),
                            e = e +
                            (m + 4);
                        var h = { type: "ID3", version: "2." + h + "." + d, major: h, revision: d, flags: { unsynchronisation: f, extended_header: g, experimental_indicator: x, footer_present: !1 }, size: k, tags: {} },
                            e = this._readFrames(e, k - 10, a, h, c),
                            l;
                        for (l in b) b.hasOwnProperty(l) && (k = this._getFrameData(e, b[l])) && (h.tags[l] = k);
                        for (var q in e) e.hasOwnProperty(q) && (h.tags[q] = e[q]);
                        return h
                    }
                }, {
                    key: "_getUnsyncFileReader",
                    value: function(b, a, c) {
                        b = b.getBytesAt(a, c);
                        for (a = 0; a < b.length - 1; a++) 255 === b[a] && 0 === b[a + 1] && b.splice(a + 1, 1);
                        return new d(b)
                    }
                }, {
                    key: "_readFrames",
                    value: function(b, c, e, h, d) {
                        var g = {};
                        for (d && (d = this._expandShortcutTags(d)); b < c;) {
                            var f = this._readFrameHeader(e, b, h),
                                k = f.id;
                            if (0 === f.size) break;
                            if (!k) break;
                            var l = f.flags,
                                m = f.size,
                                r = b + f.headerSize,
                                q = e;
                            b += f.headerSize + f.size;
                            if (!d || -1 !== d.indexOf(k)) {
                                if (h.flags.unsynchronisation || l && l.format.unsynchronisation) q = this._getUnsyncFileReader(q, r, m), r = 0, m = q.getSize();
                                l && l.format.data_length_indicator && (r += 4, m -= 4);
                                l = (f = a.getFrameReaderFunction(k)) ? f(r, m, q, l) : null;
                                r = this._getFrameDescription(k);
                                m = {
                                    id: k,
                                    size: m,
                                    description: r,
                                    data: l
                                };
                                k in g ? (g[k].id && (g[k] = [g[k]]), g[k].push(m)) : g[k] = m
                            }
                        }
                        return g
                    }
                }, {
                    key: "_readFrameHeader",
                    value: function(b, a, c) {
                        c = c.major;
                        var e = null;
                        switch (c) {
                            case 2:
                                var h = b.getStringAt(a, 3),
                                    d = b.getInteger24At(a + 3, !0),
                                    f = 6;
                                break;
                            case 3:
                                h = b.getStringAt(a, 4);
                                d = b.getLongAt(a + 4, !0);
                                f = 10;
                                break;
                            case 4:
                                h = b.getStringAt(a, 4), d = b.getSynchsafeInteger32At(a + 4), f = 10
                        }
                        h && 2 < c && (e = this._readFrameFlags(b, a + 8));
                        return { id: h || "", size: d || 0, headerSize: f || 0, flags: e }
                    }
                }, {
                    key: "_readFrameFlags",
                    value: function(b, a) {
                        return {
                            message: {
                                tag_alter_preservation: b.isBitSetAt(a,
                                    6),
                                file_alter_preservation: b.isBitSetAt(a, 5),
                                read_only: b.isBitSetAt(a, 4)
                            },
                            format: { grouping_identity: b.isBitSetAt(a + 1, 7), compression: b.isBitSetAt(a + 1, 3), encryption: b.isBitSetAt(a + 1, 2), unsynchronisation: b.isBitSetAt(a + 1, 1), data_length_indicator: b.isBitSetAt(a + 1, 0) }
                        }
                    }
                }, {
                    key: "_getFrameData",
                    value: function(b, a) {
                        for (var c = 0, e; e = a[c]; c++)
                            if (e in b) return b[e].data
                    }
                }, {
                    key: "_getFrameDescription",
                    value: function(b) {
                        return b in c ? c[b] : "Unknown"
                    }
                }, {
                    key: "getShortcuts",
                    value: function() {
                        return b
                    }
                }], [{
                    key: "getTagIdentifierByteRange",
                    value: function() {
                        return { offset: 0, length: 10 }
                    }
                }, {
                    key: "canReadTagFormat",
                    value: function(b) {
                        return "ID3" === String.fromCharCode.apply(String, b.slice(0, 3))
                    }
                }]);
                return h
            }(l);
            var c = {
                    BUF: "Recommended buffer size",
                    CNT: "Play counter",
                    COM: "Comments",
                    CRA: "Audio encryption",
                    CRM: "Encrypted meta frame",
                    ETC: "Event timing codes",
                    EQU: "Equalization",
                    GEO: "General encapsulated object",
                    IPL: "Involved people list",
                    LNK: "Linked information",
                    MCI: "Music CD Identifier",
                    MLL: "MPEG location lookup table",
                    PIC: "Attached picture",
                    POP: "Popularimeter",
                    REV: "Reverb",
                    RVA: "Relative volume adjustment",
                    SLT: "Synchronized lyric/text",
                    STC: "Synced tempo codes",
                    TAL: "Album/Movie/Show title",
                    TBP: "BPM (Beats Per Minute)",
                    TCM: "Composer",
                    TCO: "Content type",
                    TCR: "Copyright message",
                    TDA: "Date",
                    TDY: "Playlist delay",
                    TEN: "Encoded by",
                    TFT: "File type",
                    TIM: "Time",
                    TKE: "Initial key",
                    TLA: "Language(s)",
                    TLE: "Length",
                    TMT: "Media type",
                    TOA: "Original artist(s)/performer(s)",
                    TOF: "Original filename",
                    TOL: "Original Lyricist(s)/text writer(s)",
                    TOR: "Original release year",
                    TOT: "Original album/Movie/Show title",
                    TP1: "Lead artist(s)/Lead performer(s)/Soloist(s)/Performing group",
                    TP2: "Band/Orchestra/Accompaniment",
                    TP3: "Conductor/Performer refinement",
                    TP4: "Interpreted, remixed, or otherwise modified by",
                    TPA: "Part of a set",
                    TPB: "Publisher",
                    TRC: "ISRC (International Standard Recording Code)",
                    TRD: "Recording dates",
                    TRK: "Track number/Position in set",
                    TSI: "Size",
                    TSS: "Software/hardware and settings used for encoding",
                    TT1: "Content group description",
                    TT2: "Title/Songname/Content description",
                    TT3: "Subtitle/Description refinement",
                    TXT: "Lyricist/text writer",
                    TXX: "User defined text information frame",
                    TYE: "Year",
                    UFI: "Unique file identifier",
                    ULT: "Unsychronized lyric/text transcription",
                    WAF: "Official audio file webpage",
                    WAR: "Official artist/performer webpage",
                    WAS: "Official audio source webpage",
                    WCM: "Commercial information",
                    WCP: "Copyright/Legal information",
                    WPB: "Publishers official webpage",
                    WXX: "User defined URL link frame",
                    AENC: "Audio encryption",
                    APIC: "Attached picture",
                    ASPI: "Audio seek point index",
                    COMM: "Comments",
                    COMR: "Commercial frame",
                    ENCR: "Encryption method registration",
                    EQU2: "Equalisation (2)",
                    EQUA: "Equalization",
                    ETCO: "Event timing codes",
                    GEOB: "General encapsulated object",
                    GRID: "Group identification registration",
                    IPLS: "Involved people list",
                    LINK: "Linked information",
                    MCDI: "Music CD identifier",
                    MLLT: "MPEG location lookup table",
                    OWNE: "Ownership frame",
                    PRIV: "Private frame",
                    PCNT: "Play counter",
                    POPM: "Popularimeter",
                    POSS: "Position synchronisation frame",
                    RBUF: "Recommended buffer size",
                    RVA2: "Relative volume adjustment (2)",
                    RVAD: "Relative volume adjustment",
                    RVRB: "Reverb",
                    SEEK: "Seek frame",
                    SYLT: "Synchronized lyric/text",
                    SYTC: "Synchronized tempo codes",
                    TALB: "Album/Movie/Show title",
                    TBPM: "BPM (beats per minute)",
                    TCOM: "Composer",
                    TCON: "Content type",
                    TCOP: "Copyright message",
                    TDAT: "Date",
                    TDLY: "Playlist delay",
                    TDRC: "Recording time",
                    TDRL: "Release time",
                    TDTG: "Tagging time",
                    TENC: "Encoded by",
                    TEXT: "Lyricist/Text writer",
                    TFLT: "File type",
                    TIME: "Time",
                    TIPL: "Involved people list",
                    TIT1: "Content group description",
                    TIT2: "Title/songname/content description",
                    TIT3: "Subtitle/Description refinement",
                    TKEY: "Initial key",
                    TLAN: "Language(s)",
                    TLEN: "Length",
                    TMCL: "Musician credits list",
                    TMED: "Media type",
                    TMOO: "Mood",
                    TOAL: "Original album/movie/show title",
                    TOFN: "Original filename",
                    TOLY: "Original lyricist(s)/text writer(s)",
                    TOPE: "Original artist(s)/performer(s)",
                    TORY: "Original release year",
                    TOWN: "File owner/licensee",
                    TPE1: "Lead performer(s)/Soloist(s)",
                    TPE2: "Band/orchestra/accompaniment",
                    TPE3: "Conductor/performer refinement",
                    TPE4: "Interpreted, remixed, or otherwise modified by",
                    TPOS: "Part of a set",
                    TPRO: "Produced notice",
                    TPUB: "Publisher",
                    TRCK: "Track number/Position in set",
                    TRDA: "Recording dates",
                    TRSN: "Internet radio station name",
                    TRSO: "Internet radio station owner",
                    TSOA: "Album sort order",
                    TSOP: "Performer sort order",
                    TSOT: "Title sort order",
                    TSIZ: "Size",
                    TSRC: "ISRC (international standard recording code)",
                    TSSE: "Software/Hardware and settings used for encoding",
                    TSST: "Set subtitle",
                    TYER: "Year",
                    TXXX: "User defined text information frame",
                    UFID: "Unique file identifier",
                    USER: "Terms of use",
                    USLT: "Unsychronized lyric/text transcription",
                    WCOM: "Commercial information",
                    WCOP: "Copyright/Legal information",
                    WOAF: "Official audio file webpage",
                    WOAR: "Official artist/performer webpage",
                    WOAS: "Official audio source webpage",
                    WORS: "Official internet radio station homepage",
                    WPAY: "Payment",
                    WPUB: "Publishers official webpage",
                    WXXX: "User defined URL link frame"
                },
                b = {
                    title: ["TIT2", "TT2"],
                    artist: ["TPE1", "TP1"],
                    album: ["TALB", "TAL"],
                    year: ["TYER", "TYE"],
                    comment: ["COMM", "COM"],
                    track: ["TRCK", "TRK"],
                    genre: ["TCON", "TCO"],
                    picture: ["APIC", "PIC"],
                    lyrics: ["USLT",
                        "ULT"
                    ]
                };
            m.exports = f
        }, { "./ArrayFileReader": 3, "./ID3v2FrameReader": 7, "./MediaFileReader": 10, "./MediaTagReader": 11 }],
        9: [function(f, m, l) {
            function k(b, a) {
                if ("function" !== typeof a && null !== a) throw new TypeError("Super expression must either be null or a function, not " + typeof a);
                b.prototype = Object.create(a && a.prototype, { constructor: { value: b, enumerable: !1, writable: !0, configurable: !0 } });
                a && (Object.setPrototypeOf ? Object.setPrototypeOf(b, a) : b.__proto__ = a)
            }
            var g = function() {
                function b(b, a) {
                    for (var c = 0; c < a.length; c++) {
                        var d =
                            a[c];
                        d.enumerable = d.enumerable || !1;
                        d.configurable = !0;
                        "value" in d && (d.writable = !0);
                        Object.defineProperty(b, d.key, d)
                    }
                }
                return function(a, c, d) {
                    c && b(a.prototype, c);
                    d && b(a, d);
                    return a
                }
            }();
            l = f("./MediaTagReader");
            f("./MediaFileReader");
            f = function(b) {
                function e() {
                    if (!(this instanceof e)) throw new TypeError("Cannot call a class as a function");
                    var b = Object.getPrototypeOf(e).apply(this, arguments);
                    if (!this) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !b || "object" !==
                        typeof b && "function" !== typeof b ? this : b
                }
                k(e, b);
                g(e, [{
                    key: "_loadData",
                    value: function(b, a) {
                        var c = this;
                        b.loadRange([0, 16], { onSuccess: function() { c._loadAtom(b, 0, "", a) }, onError: a.onError })
                    }
                }, {
                    key: "_loadAtom",
                    value: function(b, a, c, e) {
                        if (a >= b.getSize()) e.onSuccess();
                        else {
                            var d = this,
                                f = b.getLongAt(a, !0);
                            if (0 == f || isNaN(f)) e.onSuccess();
                            else {
                                var g = b.getStringAt(a + 4, 4);
                                if (this._isContainerAtom(g)) {
                                    "meta" == g && (a += 4);
                                    var k = (c ? c + "." : "") + g;
                                    "moov.udta.meta.ilst" === k ? b.loadRange([a, a + f], e) : b.loadRange([a + 8, a + 8 + 8], {
                                        onSuccess: function() {
                                            d._loadAtom(b,
                                                a + 8, k, e)
                                        },
                                        onError: e.onError
                                    })
                                } else b.loadRange([a + f, a + f + 8], { onSuccess: function() { d._loadAtom(b, a + f, c, e) }, onError: e.onError })
                            }
                        }
                    }
                }, {
                    key: "_isContainerAtom",
                    value: function(b) {
                        return 0 <= ["moov", "udta", "meta", "ilst"].indexOf(b)
                    }
                }, {
                    key: "_canReadAtom",
                    value: function(b) {
                        return "----" !== b
                    }
                }, {
                    key: "_parseData",
                    value: function(b, a) {
                        var e = {};
                        a = this._expandShortcutTags(a);
                        this._readAtom(e, b, 0, b.getSize(), a);
                        for (var d in c)
                            if (c.hasOwnProperty(d)) {
                                var f = e[c[d]];
                                f && (e[d] = "track" === d ? f.data.track : f.data)
                            }
                        return {
                            type: "MP4",
                            ftyp: b.getStringAt(8, 4),
                            version: b.getLongAt(12, !0),
                            tags: e
                        }
                    }
                }, {
                    key: "_readAtom",
                    value: function(b, a, c, e, d, f, g) {
                        g = void 0 === g ? "" : g + "  ";
                        for (var k = c; k < c + e;) {
                            var m = a.getLongAt(k, !0);
                            if (0 == m) break;
                            var l = a.getStringAt(k + 4, 4);
                            if (this._isContainerAtom(l)) {
                                "meta" == l && (k += 4);
                                this._readAtom(b, a, k + 8, m - 8, d, (f ? f + "." : "") + l, g);
                                break
                            }(!d || 0 <= d.indexOf(l)) && "moov.udta.meta.ilst" === f && this._canReadAtom(l) && (b[l] = this._readMetadataAtom(a, k));
                            k += m
                        }
                    }
                }, {
                    key: "_readMetadataAtom",
                    value: function(b, c) {
                        var e = b.getLongAt(c, !0),
                            f =
                            b.getStringAt(c + 4, 4),
                            g = b.getInteger24At(c + 16 + 1, !0),
                            g = d[g],
                            k;
                        if ("trkn" == f) k = { track: b.getByteAt(c + 16 + 11), total: b.getByteAt(c + 16 + 13) };
                        else {
                            var l = c + 24,
                                m = e - 24;
                            switch (g) {
                                case "text":
                                    k = b.getStringWithCharsetAt(l, m, "utf-8").toString();
                                    break;
                                case "uint8":
                                    k = b.getShortAt(l, !1);
                                    break;
                                case "jpeg":
                                case "png":
                                    k = { format: "image/" + g, data: b.getBytesAt(l, m) }
                            }
                        }
                        return { id: f, size: e, description: a[f] || "Unknown", data: k }
                    }
                }, {
                    key: "getShortcuts",
                    value: function() {
                        return c
                    }
                }], [{
                    key: "getTagIdentifierByteRange",
                    value: function() {
                        return {
                            offset: 0,
                            length: 16
                        }
                    }
                }, {
                    key: "canReadTagFormat",
                    value: function(b) {
                        return "ftyp" === String.fromCharCode.apply(String, b.slice(4, 8))
                    }
                }]);
                return e
            }(l);
            var d = { 0: "uint8", 1: "text", 13: "jpeg", 14: "png", 21: "uint8" },
                a = {
                    "\u00a9alb": "Album",
                    "\u00a9ART": "Artist",
                    aART: "Album Artist",
                    "\u00a9day": "Release Date",
                    "\u00a9nam": "Title",
                    "\u00a9gen": "Genre",
                    gnre: "Genre",
                    trkn: "Track Number",
                    "\u00a9wrt": "Composer",
                    "\u00a9too": "Encoding Tool",
                    "\u00a9enc": "Encoded By",
                    cprt: "Copyright",
                    covr: "Cover Art",
                    "\u00a9grp": "Grouping",
                    keyw: "Keywords",
                    "\u00a9lyr": "Lyrics",
                    "\u00a9cmt": "Comment",
                    tmpo: "Tempo",
                    cpil: "Compilation",
                    disk: "Disc Number",
                    tvsh: "TV Show Name",
                    tven: "TV Episode ID",
                    tvsn: "TV Season",
                    tves: "TV Episode",
                    tvnn: "TV Network",
                    desc: "Description",
                    ldes: "Long Description",
                    sonm: "Sort Name",
                    soar: "Sort Artist",
                    soaa: "Sort Album",
                    soco: "Sort Composer",
                    sosn: "Sort Show",
                    purd: "Purchase Date",
                    pcst: "Podcast",
                    purl: "Podcast URL",
                    catg: "Category",
                    hdvd: "HD Video",
                    stik: "Media Type",
                    rtng: "Content Rating",
                    pgap: "Gapless Playback",
                    apID: "Purchase Account",
                    sfID: "Country Code"
                },
                c = { title: "\u00a9nam", artist: "\u00a9ART", album: "\u00a9alb", year: "\u00a9day", comment: "\u00a9cmt", track: "trkn", genre: "\u00a9gen", picture: "covr", lyrics: "\u00a9lyr" };
            m.exports = f
        }, { "./MediaFileReader": 10, "./MediaTagReader": 11 }],
        10: [function(f, m, l) {
                var k = function() {
                        function d(a, c) {
                            for (var b = 0; b < c.length; b++) {
                                var e = c[b];
                                e.enumerable = e.enumerable || !1;
                                e.configurable = !0;
                                "value" in e && (e.writable = !0);
                                Object.defineProperty(a, e.key, e)
                            }
                        }
                        return function(a, c, b) {
                            c && d(a.prototype, c);
                            b && d(a, b);
                            return a
                        }
                    }(),
                    g = f("./StringUtils");
                f = function() {
                    function d() {
                        if (!(this instanceof d)) throw new TypeError("Cannot call a class as a function");
                        this._isInitialized = !1;
                        this._size = 0
                    }
                    k(d, [{
                        key: "init",
                        value: function(a) {
                            var c = this;
                            if (this._isInitialized) setTimeout(a.onSuccess, 1);
                            else return this._init({
                                onSuccess: function() {
                                    c._isInitialized = !0;
                                    a.onSuccess()
                                },
                                onError: a.onError
                            })
                        }
                    }, {
                        key: "_init",
                        value: function(a) {
                            throw Error("Must implement init function");
                        }
                    }, {
                        key: "loadRange",
                        value: function(a, c) {
                            throw Error("Must implement loadRange function");
                        }
                    }, {
                        key: "getSize",
                        value: function() {
                            if (!this._isInitialized) throw Error("init() must be called first.");
                            return this._size
                        }
                    }, {
                        key: "getByteAt",
                        value: function(a) {
                            throw Error("Must implement getByteAt function");
                        }
                    }, {
                        key: "getBytesAt",
                        value: function(a, c) {
                            for (var b = Array(c), e = 0; e < c; e++) b[e] = this.getByteAt(a + e);
                            return b
                        }
                    }, {
                        key: "isBitSetAt",
                        value: function(a, c) {
                            return 0 != (this.getByteAt(a) & 1 << c)
                        }
                    }, {
                        key: "getSByteAt",
                        value: function(a) {
                            a = this.getByteAt(a);
                            return 127 < a ? a - 256 : a
                        }
                    }, {
                        key: "getShortAt",
                        value: function(a,
                            c) {
                            var b = c ? (this.getByteAt(a) << 8) + this.getByteAt(a + 1) : (this.getByteAt(a + 1) << 8) + this.getByteAt(a);
                            0 > b && (b += 65536);
                            return b
                        }
                    }, {
                        key: "getSShortAt",
                        value: function(a, c) {
                            var b = this.getShortAt(a, c);
                            return 32767 < b ? b - 65536 : b
                        }
                    }, {
                        key: "getLongAt",
                        value: function(a, c) {
                            var b = this.getByteAt(a),
                                e = this.getByteAt(a + 1),
                                d = this.getByteAt(a + 2),
                                f = this.getByteAt(a + 3),
                                b = c ? (((b << 8) + e << 8) + d << 8) + f : (((f << 8) + d << 8) + e << 8) + b;
                            0 > b && (b += 4294967296);
                            return b
                        }
                    }, {
                        key: "getSLongAt",
                        value: function(a, c) {
                            var b = this.getLongAt(a, c);
                            return 2147483647 <
                                b ? b - 4294967296 : b
                        }
                    }, {
                        key: "getInteger24At",
                        value: function(a, c) {
                            var b = this.getByteAt(a),
                                e = this.getByteAt(a + 1),
                                d = this.getByteAt(a + 2),
                                b = c ? ((b << 8) + e << 8) + d : ((d << 8) + e << 8) + b;
                            0 > b && (b += 16777216);
                            return b
                        }
                    }, {
                        key: "getStringAt",
                        value: function(a, c) {
                            for (var b = [], e = a, d = 0; e < a + c; e++, d++) b[d] = String.fromCharCode(this.getByteAt(e));
                            return b.join("")
                        }
                    }, {
                        key: "getStringWithCharsetAt",
                        value: function(a, c, b) {
                            a = this.getBytesAt(a, c);
                            switch ((b || "").toLowerCase()) {
                                case "utf-16":
                                case "utf-16le":
                                case "utf-16be":
                                    b = g.readUTF16String(a,
                                        "utf-16be" === b);
                                    break;
                                case "utf-8":
                                    b = g.readUTF8String(a);
                                    break;
                                default:
                                    b = g.readNullTerminatedString(a)
                            }
                            return b
                        }
                    }, {
                        key: "getCharAt",
                        value: function(a) {
                            return String.fromCharCode(this.getByteAt(a))
                        }
                    }, {
                        key: "getSynchsafeInteger32At",
                        value: function(a) {
                            var c = this.getByteAt(a),
                                b = this.getByteAt(a + 1),
                                e = this.getByteAt(a + 2);
                            return this.getByteAt(a + 3) & 127 | (e & 127) << 7 | (b & 127) << 14 | (c & 127) << 21
                        }
                    }], [{
                        key: "canReadFile",
                        value: function(a) {
                            throw Error("Must implement canReadFile function");
                        }
                    }]);
                    return d
                }();
                m.exports = f
            },
            { "./StringUtils": 12 }
        ],
        11: [function(f, m, l) {
            var k = function() {
                function f(d, a) {
                    for (var c = 0; c < a.length; c++) {
                        var b = a[c];
                        b.enumerable = b.enumerable || !1;
                        b.configurable = !0;
                        "value" in b && (b.writable = !0);
                        Object.defineProperty(d, b.key, b)
                    }
                }
                return function(d, a, c) {
                    a && f(d.prototype, a);
                    c && f(d, c);
                    return d
                }
            }();
            f("./MediaFileReader");
            f = function() {
                function f(d) {
                    if (!(this instanceof f)) throw new TypeError("Cannot call a class as a function");
                    this._mediaFileReader = d;
                    this._tags = null
                }
                k(f, [{
                    key: "setTagsToRead",
                    value: function(d) {
                        this._tags =
                            d;
                        return this
                    }
                }, {
                    key: "read",
                    value: function(d) {
                        var a = this;
                        this._mediaFileReader.init({
                            onSuccess: function() {
                                a._loadData(a._mediaFileReader, {
                                    onSuccess: function() {
                                        var c = a._parseData(a._mediaFileReader, a._tags);
                                        d.onSuccess(c)
                                    },
                                    onError: d.onError
                                })
                            },
                            onError: d.onError
                        })
                    }
                }, {
                    key: "getShortcuts",
                    value: function() {
                        return {}
                    }
                }, {
                    key: "_loadData",
                    value: function(d, a) {
                        throw Error("Must implement _loadData function");
                    }
                }, {
                    key: "_parseData",
                    value: function(d, a) {
                        throw Error("Must implement _parseData function");
                    }
                }, {
                    key: "_expandShortcutTags",
                    value: function(d) {
                        if (!d) return null;
                        for (var a = [], c = this.getShortcuts(), b = 0, e; e = d[b]; b++) a = a.concat(c[e] || [e]);
                        return a
                    }
                }], [{
                    key: "getTagIdentifierByteRange",
                    value: function() {
                        throw Error("Must implement");
                    }
                }, {
                    key: "canReadTagFormat",
                    value: function(d) {
                        throw Error("Must implement");
                    }
                }]);
                return f
            }();
            m.exports = f
        }, { "./MediaFileReader": 10 }],
        12: [function(f, m, l) {
            var k = function() {
                    function d(a, c) {
                        for (var b = 0; b < c.length; b++) {
                            var e = c[b];
                            e.enumerable = e.enumerable || !1;
                            e.configurable = !0;
                            "value" in e && (e.writable = !0);
                            Object.defineProperty(a, e.key, e)
                        }
                    }
                    return function(a, c, b) {
                        c && d(a.prototype, c);
                        b && d(a, b);
                        return a
                    }
                }(),
                g = function() {
                    function d(a, c) {
                        if (!(this instanceof d)) throw new TypeError("Cannot call a class as a function");
                        this._value = a;
                        this.bytesReadCount = c;
                        this.length = a.length
                    }
                    k(d, [{
                        key: "toString",
                        value: function() {
                            return this._value
                        }
                    }]);
                    return d
                }();
            m.exports = {
                readUTF16String: function(d, a, c) {
                    var b = 0,
                        e = 1,
                        h = 0;
                    c = Math.min(c || d.length, d.length);
                    254 == d[0] && 255 == d[1] ? (a = !0, b = 2) : 255 == d[0] && 254 == d[1] && (a = !1, b = 2);
                    a && (e =
                        0, h = 1);
                    a = [];
                    for (var f = 0; b < c; f++) {
                        var k = d[b + e],
                            l = (k << 8) + d[b + h],
                            b = b + 2;
                        if (0 == l) break;
                        else 216 > k || 224 <= k ? a[f] = String.fromCharCode(l) : (k = (d[b + e] << 8) + d[b + h], b += 2, a[f] = String.fromCharCode(l, k))
                    }
                    return new g(a.join(""), b)
                },
                readUTF8String: function(d, a) {
                    var c = 0;
                    a = Math.min(a || d.length, d.length);
                    239 == d[0] && 187 == d[1] && 191 == d[2] && (c = 3);
                    for (var b = [], e = 0; c < a; e++) {
                        var h = d[c++];
                        if (0 == h) break;
                        else if (128 > h) b[e] = String.fromCharCode(h);
                        else if (194 <= h && 224 > h) {
                            var f = d[c++];
                            b[e] = String.fromCharCode(((h & 31) << 6) + (f & 63))
                        } else if (224 <=
                            h && 240 > h) {
                            var f = d[c++],
                                k = d[c++];
                            b[e] = String.fromCharCode(((h & 255) << 12) + ((f & 63) << 6) + (k & 63))
                        } else if (240 <= h && 245 > h) {
                            var f = d[c++],
                                k = d[c++],
                                l = d[c++],
                                h = ((h & 7) << 18) + ((f & 63) << 12) + ((k & 63) << 6) + (l & 63) - 65536;
                            b[e] = String.fromCharCode((h >> 10) + 55296, (h & 1023) + 56320)
                        }
                    }
                    return new g(b.join(""), c)
                },
                readNullTerminatedString: function(d, a) {
                    var c = [];
                    a = a || d.length;
                    for (var b = 0; b < a;) {
                        var e = d[b++];
                        if (0 == e) break;
                        c[b - 1] = String.fromCharCode(e)
                    }
                    return new g(c.join(""), b)
                }
            }
        }, {}],
        13: [function(f, m, l) {
            function k(a, c) {
                if ("function" !==
                    typeof c && null !== c) throw new TypeError("Super expression must either be null or a function, not " + typeof c);
                a.prototype = Object.create(c && c.prototype, { constructor: { value: a, enumerable: !1, writable: !0, configurable: !0 } });
                c && (Object.setPrototypeOf ? Object.setPrototypeOf(a, c) : a.__proto__ = c)
            }
            var g = function() {
                    function a(a, b) {
                        for (var e = 0; e < b.length; e++) {
                            var d = b[e];
                            d.enumerable = d.enumerable || !1;
                            d.configurable = !0;
                            "value" in d && (d.writable = !0);
                            Object.defineProperty(a, d.key, d)
                        }
                    }
                    return function(c, b, e) {
                        b && a(c.prototype,
                            b);
                        e && a(c, e);
                        return c
                    }
                }(),
                d = f("./ChunkedFileData");
            l = function(a) {
                function c(b) {
                    if (!(this instanceof c)) throw new TypeError("Cannot call a class as a function");
                    var a;
                    a = Object.getPrototypeOf(c).call(this);
                    if (!this) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    a = !a || "object" !== typeof a && "function" !== typeof a ? this : a;
                    a._url = b;
                    a._fileData = new d;
                    return a
                }
                k(c, a);
                g(c, [{ key: "_init", value: function(b) { c._config.avoidHeadRequests ? this._fetchSizeWithGetRequest(b) : this._fetchSizeWithHeadRequest(b) } }, {
                    key: "_fetchSizeWithHeadRequest",
                    value: function(b) {
                        var a = this;
                        this._makeXHRRequest("HEAD", null, {
                            onSuccess: function(c) {
                                (c = a._parseContentLength(c)) ? (a._size = c, b.onSuccess()) : a._fetchSizeWithGetRequest(b)
                            },
                            onError: b.onError
                        })
                    }
                }, {
                    key: "_fetchSizeWithGetRequest",
                    value: function(b) {
                        var a = this,
                            c = this._roundRangeToChunkMultiple([0, 0]);
                        this._makeXHRRequest("GET", c, {
                            onSuccess: function(c) {
                                var d = a._parseContentRange(c);
                                c = a._getXhrResponseContent(c);
                                if (d) {
                                    if (null == d.instanceLength) {
                                        a._fetchEntireFile(b);
                                        return
                                    }
                                    a._size =
                                        d.instanceLength
                                } else a._size = c.length;
                                a._fileData.addData(0, c);
                                b.onSuccess()
                            },
                            onError: b.onError
                        })
                    }
                }, {
                    key: "_fetchEntireFile",
                    value: function(b) {
                        var a = this;
                        this._makeXHRRequest("GET", null, {
                            onSuccess: function(c) {
                                c = a._getXhrResponseContent(c);
                                a._size = c.length;
                                a._fileData.addData(0, c);
                                b.onSuccess()
                            },
                            onError: b.onError
                        })
                    }
                }, {
                    key: "_getXhrResponseContent",
                    value: function(a) {
                        return a.responseBody || a.responseText || ""
                    }
                }, {
                    key: "_parseContentLength",
                    value: function(a) {
                        a = this._getResponseHeader(a, "Content-Length");
                        return null == a ? a : parseInt(a, 10)
                    }
                }, {
                    key: "_parseContentRange",
                    value: function(a) {
                        if (a = this._getResponseHeader(a, "Content-Range")) {
                            var c = a.match(/bytes (\d+)-(\d+)\/(?:(\d+)|\*)/i);
                            if (!c) throw Error("FIXME: Unknown Content-Range syntax: ", a);
                            return { firstBytePosition: parseInt(c[1], 10), lastBytePosition: parseInt(c[2], 10), instanceLength: c[3] ? parseInt(c[3], 10) : null }
                        }
                        return null
                    }
                }, {
                    key: "loadRange",
                    value: function(a, c) {
                        var d = this;
                        d._fileData.hasDataRange(a[0], Math.min(d._size, a[1])) ? setTimeout(c.onSuccess, 1) :
                            (a = this._roundRangeToChunkMultiple(a), a[1] = Math.min(d._size, a[1]), this._makeXHRRequest("GET", a, {
                                onSuccess: function(f) {
                                    f = d._getXhrResponseContent(f);
                                    d._fileData.addData(a[0], f);
                                    c.onSuccess()
                                },
                                onError: c.onError
                            }))
                    }
                }, {
                    key: "_roundRangeToChunkMultiple",
                    value: function(a) {
                        return [a[0], a[0] + 1024 * Math.ceil((a[1] - a[0] + 1) / 1024) - 1]
                    }
                }, {
                    key: "_makeXHRRequest",
                    value: function(a, d, f) {
                        var g = this._createXHRObject(),
                            k = function() {
                                if (200 === g.status || 206 === g.status) f.onSuccess(g);
                                else if (f.onError) f.onError({
                                    type: "xhr",
                                    info: "Unexpected HTTP status " +
                                        g.status + ".",
                                    xhr: g
                                });
                                g = null
                            };
                        "undefined" !== typeof g.onload ? (g.onload = k, g.onerror = function() {
                            if (f.onError) f.onError({ type: "xhr", info: "Generic XHR error, check xhr object.", xhr: g })
                        }) : g.onreadystatechange = function() { 4 === g.readyState && k() };
                        c._config.timeoutInSec && (g.timeout = 1E3 * c._config.timeoutInSec, g.ontimeout = function() {
                            if (f.onError) f.onError({ type: "xhr", info: "Timeout after " + g.timeout / 1E3 + "s. Use jsmediatags.Config.setXhrTimeout to override.", xhr: g })
                        });
                        g.open(a, this._url);
                        g.overrideMimeType("text/plain; charset=x-user-defined");
                        d && this._setRequestHeader(g, "Range", "bytes=" + d[0] + "-" + d[1]);
                        this._setRequestHeader(g, "If-Modified-Since", "Sat, 01 Jan 1970 00:00:00 GMT");
                        g.send(null)
                    }
                }, { key: "_setRequestHeader", value: function(a, d, f) { 0 > c._config.disallowedXhrHeaders.indexOf(d.toLowerCase()) && a.setRequestHeader(d, f) } }, {
                    key: "_hasResponseHeader",
                    value: function(a, c) {
                        var d = a.getAllResponseHeaders();
                        if (!d) return !1;
                        for (var d = d.split("\r\n"), f = [], g = 0; g < d.length; g++) f[g] = d[g].split(":")[0].toLowerCase();
                        return 0 <= f.indexOf(c.toLowerCase())
                    }
                }, {
                    key: "_getResponseHeader",
                    value: function(a, c) {
                        return this._hasResponseHeader(a, c) ? a.getResponseHeader(c) : null
                    }
                }, {
                    key: "getByteAt",
                    value: function(a) {
                        return this._fileData.getByteAt(a).charCodeAt(0) & 255
                    }
                }, {
                    key: "_createXHRObject",
                    value: function() {
                        if ("undefined" === typeof window) return new(f("xhr2").XMLHttpRequest);
                        if (window.XMLHttpRequest) return new window.XMLHttpRequest;
                        throw Error("XMLHttpRequest is not supported");
                    }
                }], [{
                    key: "canReadFile",
                    value: function(a) {
                        return "string" === typeof a && /^[a-z]+:\/\//i.test(a)
                    }
                }, {
                    key: "setConfig",
                    value: function(a) {
                        for (var c in a) a.hasOwnProperty(c) && (this._config[c] = a[c]);
                        a = this._config.disallowedXhrHeaders;
                        for (c = 0; c < a.length; c++) a[c] = a[c].toLowerCase()
                    }
                }]);
                return c
            }(f("./MediaFileReader"));
            l._config = { avoidHeadRequests: !1, disallowedXhrHeaders: [], timeoutInSec: 30 };
            m.exports = l
        }, { "./ChunkedFileData": 5, "./MediaFileReader": 10, xhr2: 2 }],
        14: [function(f, m, l) {
            function k(a, b) {
                if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function");
            }
            var g = function() {
                function a(b,
                    c) {
                    for (var d = 0; d < c.length; d++) {
                        var e = c[d];
                        e.enumerable = e.enumerable || !1;
                        e.configurable = !0;
                        "value" in e && (e.writable = !0);
                        Object.defineProperty(b, e.key, e)
                    }
                }
                return function(b, c, d) {
                    c && a(b.prototype, c);
                    d && a(b, d);
                    return b
                }
            }();
            f("./MediaFileReader");
            l = f("./NodeFileReader");
            var d = f("./XhrFileReader"),
                a = f("./BlobFileReader"),
                c = f("./ArrayFileReader");
            f("./MediaTagReader");
            var b = f("./ID3v1TagReader"),
                e = f("./ID3v2TagReader");
            f = f("./MP4TagReader");
            var h = [],
                n = [],
                p = function() {
                    function a(b) {
                        k(this, a);
                        this._file = b
                    }
                    g(a, [{
                        key: "setTagsToRead",
                        value: function(a) {
                            this._tagsToRead = a;
                            return this
                        }
                    }, {
                        key: "setFileReader",
                        value: function(a) {
                            this._fileReader = a;
                            return this
                        }
                    }, {
                        key: "setTagReader",
                        value: function(a) {
                            this._tagReader = a;
                            return this
                        }
                    }, {
                        key: "read",
                        value: function(a) {
                            var b = new(this._getFileReader())(this._file),
                                c = this;
                            b.init({
                                onSuccess: function() {
                                    c._getTagReader(b, {
                                        onSuccess: function(d) {
                                            (new d(b)).setTagsToRead(c._tagsToRead).read(a)
                                        },
                                        onError: a.onError
                                    })
                                },
                                onError: a.onError
                            })
                        }
                    }, {
                        key: "_getFileReader",
                        value: function() {
                            return this._fileReader ?
                                this._fileReader : this._findFileReader()
                        }
                    }, {
                        key: "_findFileReader",
                        value: function() {
                            for (var a = 0; a < h.length; a++)
                                if (h[a].canReadFile(this._file)) return h[a];
                            throw Error("No suitable file reader found for ", this._file);
                        }
                    }, {
                        key: "_getTagReader",
                        value: function(a, b) {
                            if (this._tagReader) {
                                var c = this._tagReader;
                                setTimeout(function() { b.onSuccess(c) }, 1)
                            } else this._findTagReader(a, b)
                        }
                    }, {
                        key: "_findTagReader",
                        value: function(a, b) {
                            for (var c = [], d = [], e = a.getSize(), f = 0; f < n.length; f++) {
                                var g = n[f].getTagIdentifierByteRange();
                                0 <= g.offset && g.offset < e / 2 || 0 > g.offset && g.offset < -e / 2 ? c.push(n[f]) : d.push(n[f])
                            }
                            var h = !1,
                                f = {
                                    onSuccess: function() {
                                        if (h) {
                                            for (var c = 0; c < n.length; c++) {
                                                var d = n[c].getTagIdentifierByteRange(),
                                                    d = a.getBytesAt(0 <= d.offset ? d.offset : d.offset + e, d.length);
                                                if (n[c].canReadTagFormat(d)) {
                                                    b.onSuccess(n[c]);
                                                    return
                                                }
                                            }
                                            if (b.onError) b.onError({ type: "tagFormat", info: "No suitable tag reader found" })
                                        } else h = !0
                                    },
                                    onError: b.onError
                                };
                            this._loadTagIdentifierRanges(a, c, f);
                            this._loadTagIdentifierRanges(a, d, f)
                        }
                    }, {
                        key: "_loadTagIdentifierRanges",
                        value: function(a, b, c) {
                            if (0 === b.length) setTimeout(c.onSuccess, 1);
                            else {
                                for (var d = [Number.MAX_VALUE, 0], e = a.getSize(), f = 0; f < b.length; f++) {
                                    var g = b[f].getTagIdentifierByteRange(),
                                        h = 0 <= g.offset ? g.offset : g.offset + e,
                                        g = h + g.length - 1;
                                    d[0] = Math.min(h, d[0]);
                                    d[1] = Math.max(g, d[1])
                                }
                                a.loadRange(d, c)
                            }
                        }
                    }]);
                    return a
                }(),
                t = function() {
                    function a() { k(this, a) }
                    g(a, null, [{
                        key: "addFileReader",
                        value: function(b) {
                            h.push(b);
                            return a
                        }
                    }, {
                        key: "addTagReader",
                        value: function(b) {
                            n.push(b);
                            return a
                        }
                    }, {
                        key: "removeTagReader",
                        value: function(b) {
                            b =
                                n.indexOf(b);
                            0 <= b && n.splice(b, 1);
                            return a
                        }
                    }, { key: "EXPERIMENTAL_avoidHeadRequests", value: function() { d.setConfig({ avoidHeadRequests: !0 }) } }, { key: "setDisallowedXhrHeaders", value: function(a) { d.setConfig({ disallowedXhrHeaders: a }) } }, { key: "setXhrTimeoutInSec", value: function(a) { d.setConfig({ timeoutInSec: a }) } }]);
                    return a
                }();
            t.addFileReader(d).addFileReader(a).addFileReader(c).addTagReader(e).addTagReader(b).addTagReader(f);
            "undefined" !== typeof process && t.addFileReader(l);
            m.exports = {
                read: function(a, b) {
                    (new p(a)).read(b)
                },
                Reader: p,
                Config: t
            }
        }, { "./ArrayFileReader": 3, "./BlobFileReader": 4, "./ID3v1TagReader": 6, "./ID3v2TagReader": 8, "./MP4TagReader": 9, "./MediaFileReader": 10, "./MediaTagReader": 11, "./NodeFileReader": 1, "./XhrFileReader": 13 }]
    }, {}, [14])(14)
});
