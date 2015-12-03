/* Copyright (c) Microsoft, Inc. All rights reserved. See License.txt in the project root for license information.*/
(function (a) {
    function b(a) {
        return a && a.Object === Object ? a : null
    }

    var c = {
        "function": !0,
        object: !0
    }, d = c[typeof exports] && exports && !exports.nodeType ? exports : null, e = c[typeof module] && module && !module.nodeType ? module : null, f = b(d && e && "object" == typeof global && global), g = b(c[typeof self] && self), h = b(c[typeof window] && window), i = (e && e.exports === d ? d : null, b(c[typeof this] && this)), j = f || h !== (i && i.window) && h || g || i || Function("return this")();
    "function" == typeof define && define.amd ? define(["rx"], function (b, c) {
        return a(j, c, b)
    }) : "object" == typeof module && module && module.exports === d ? module.exports = a(j, module.exports, require("rx")) : j.Rx = a(j, {}, j.Rx)
}).call(this, function (a, b, c, d) {
    function e(a) {
        return function () {
            try {
                return a.apply(this, arguments)
            } catch (b) {
                return B.e = b, B
            }
        }
    }

    function f(a) {
        if (!z(a))throw new TypeError("fn must be a function");
        return e(a)
    }

    function g(a, b, c, d) {
        this._e = a, this._n = b, this._fn = c, this._u = d, this._e.addEventListener(this._n, this._fn, this._u), this.isDisposed = !1
    }

    function h(a, b, c, d) {
        if (a.addEventListener)return new g(a, b, c, d);
        throw new Error("No listener found")
    }

    function i(a, b, c, d) {
        var e = new s, f = Object.prototype.toString;
        if ("[object NodeList]" === f.call(a) || "[object HTMLCollection]" === f.call(a))for (var g = 0, j = a.length; j > g; g++)e.add(i(a.item(g), b, c, d)); else a && e.add(h(a, b, c, d));
        return e
    }

    function j() {
        if (a.XMLHttpRequest)return new a.XMLHttpRequest;
        var b;
        try {
            for (var c = ["Msxml2.XMLHTTP", "Microsoft.XMLHTTP", "Msxml2.XMLHTTP.4.0"], d = 0; 3 > d; d++)try {
                if (b = c[d], new a.ActiveXObject(b))break
            } catch (e) {
            }
            return new a.ActiveXObject(b)
        } catch (e) {
            throw new Error("XMLHttpRequest is not supported by your browser")
        }
    }

    function k() {
        var b = new a.XMLHttpRequest;
        if ("withCredentials" in b)return b.withCredentials = !0, b;
        if (a.XDomainRequest)return new XDomainRequest;
        throw new Error("CORS is not supported by your browser")
    }

    function l(a, b, c) {
        var d = "response" in b ? b.response : b.responseText;
        return d = "json" === c.responseType ? JSON.parse(d) : d, {
            response: d,
            status: b.status,
            responseType: b.responseType,
            xhr: b,
            originalEvent: a
        }
    }

    function m(a, b, c) {
        return {type: c, status: b.status, xhr: b, originalEvent: a}
    }

    function n(a, b, c, d) {
        a && (b && (b.onNext(), b.onCompleted()), c ? a.close(c, d) : a.close())
    }

    function o(b) {
        var c = a.MutationObserver || a.WebKitMutationObserver;
        return new c(b)
    }

    var p = (c.Observable, c.ObservableBase), q = c.internals.AbstractObserver, r = (c.Observer.create, c.Observable.create, c.Disposable.create, c.Disposable), s = c.CompositeDisposable, t = c.BinaryDisposable, u = c.SingleAssignmentDisposable, v = c.Subject, w = c.Scheduler, x = c.DOM = {}, y = {}.hasOwnProperty, z = (c.helpers.noop, c.helpers.isFunction), A = c.internals.inherits, B = {e: {}};
    g.prototype.dispose = function () {
        this.isDisposed || (this.isDisposed = !0, this._e.removeEventListener(this._n, this._fn, this._u))
    };
    var C = function (a) {
        function b(b, c, d, e) {
            this._e = b, this._n = c, this._fn = d, this._uc = e, a.call(this)
        }

        function c(a, b) {
            return function () {
                var c = arguments[0];
                return b && (c = f(b).apply(null, arguments), c === B) ? a.onError(c.e) : void a.onNext(c)
            }
        }

        return A(b, a), b.prototype.subscribeCore = function (a) {
            return i(this._e, this._n, c(a, this._fn), this._uc)
        }, b
    }(p), D = x.fromEvent = function (a, b, c, d) {
        var e = z(c) ? c : null;
        return "boolean" == typeof c && (d = c), "undefined" == typeof d && (d = !1), new C(a, b, e, d).publish().refCount()
    };
    !function () {
        var b = "blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu input";
        a.PointerEvent && (b += " pointerdown pointerup pointermove pointerover pointerout pointerenter pointerleave"), a.TouchEvent && (b += " touchstart touchend touchmove touchcancel"), b = b.split(" ");
        for (var c = 0, d = b.length; d > c; c++)!function (a) {
            x[a] = function (b, c, d) {
                return D(b, a, c, d)
            }
        }(b[c])
    }();
    var E = function (b) {
        function c() {
            b.call(this)
        }

        function d(a) {
            return function () {
                a.onNext(), a.onCompleted()
            }
        }

        function e(b, c) {
            this._o = b, this._fn = c, this._addedHandlers = !1, this.isDisposed = !1, "complete" === a.document.readyState ? setTimeout(this._fn, 0) : (this._addedHandlers = !0, a.document.addEventListener("DOMContentLoaded", this._fn, !1))
        }

        return A(c, b), c.prototype.subscribeCore = function (a) {
            return new e(a, d(a))
        }, e.prototype.dispose = function () {
            this.isDisposed || (this.isDisposed = !0, a.document.removeEventListener("DOMContentLoaded", this._fn, !1))
        }, c
    }(p);
    x.ready = function () {
        return new E
    };
    var F = function (b) {
        function c(a) {
            this._settings = a, b.call(this)
        }

        function d(a, b) {
            this._state = a, this._xhr = b, this.isDisposed = !1
        }

        return A(c, b), c.prototype.subscribeCore = function (b) {
            var c, e = {isDone: !1}, f = this._settings, g = f.normalizeError, h = f.normalizeSuccess, i = function (a, c) {
                var d = 1223 === a.status ? 204 : a.status;
                d >= 200 && 300 >= d || 0 === d || "" === d ? (b.onNext(h(c, a, f)), b.onCompleted()) : b.onError(f.normalizeError(c, a, "error")), e.isDone = !0
            };
            try {
                c = f.createXHR()
            } catch (j) {
                return b.onError(j)
            }
            try {
                f.user ? c.open(f.method, f.url, f.async, f.user, f.password) : c.open(f.method, f.url, f.async);
                var k = f.headers;
                for (var l in k)y.call(k, l) && c.setRequestHeader(l, k[l]);
                c.timeout = f.timeout, c.ontimeout = function (a) {
                    f.progressObserver && f.progressObserver.onError(a), b.onError(g(a, c, "timeout"))
                }, c.upload || !("withCredentials" in c) && a.XDomainRequest ? (c.onload = function (a) {
                    f.progressObserver && (f.progressObserver.onNext(a), f.progressObserver.onCompleted()), i(c, a)
                }, f.progressObserver && (c.onprogress = function (a) {
                    f.progressObserver.onNext(a)
                }), c.onerror = function (a) {
                    f.progressObserver && f.progressObserver.onError(a), b.onError(g(a, c, "error")), e.isDone = !0
                }, c.onabort = function (a) {
                    f.progressObserver && f.progressObserver.onError(a), b.onError(g(a, c, "abort")), e.isDone = !0
                }) : c.onreadystatechange = function (a) {
                    4 === c.readyState && i(c, a)
                };
                var m = f.headers["Content-Type"] || f.headers["Content-type"] || f.headers["content-type"];
                if (f.hasContent && "application/x-www-form-urlencoded" === m && "string" != typeof f.body) {
                    var n = [];
                    for (var o in f.body)y.call(f.body, o) && n.push(o + "=" + f.body[o]);
                    f.body = n.join("&")
                }
                c.send(f.hasContent && f.body || null)
            } catch (p) {
                b.onError(p)
            }
            return new d(e, c)
        }, d.prototype.dispose = function () {
            this.isDisposed || (this.isDisposed = !0, this._state.isDone || 4 === this._xhr.readyState || this._xhr.abort())
        }, c
    }(p), G = x.ajax = function (a) {
        var b = {
            method: "GET",
            crossDomain: !1,
            async: !0,
            headers: {},
            responseType: "text",
            timeout: 0,
            createXHR: function () {
                return this.crossDomain ? k() : j()
            },
            normalizeError: m,
            normalizeSuccess: l
        };
        if ("string" == typeof a)b.url = a; else for (var c in a)y.call(a, c) && (b[c] = a[c]);
        return b.crossDomain || b.headers["X-Requested-With"] || (b.headers["X-Requested-With"] = "XMLHttpRequest"), b.hasContent = b.body !== d, new F(b)
    };
    x.post = function (a, b) {
        var c;
        return "string" == typeof a ? c = {
            url: a,
            body: b,
            method: "POST"
        } : "object" == typeof a && (c = a, c.method = "POST"), G(c)
    }, x.get = function (a) {
        var b;
        return "string" == typeof a ? b = {url: a} : "object" == typeof a && (b = a), G(b)
    }, x.getJSON = function (b) {
        if (!a.JSON && "function" != typeof a.JSON.parse)throw new TypeError("JSON is not supported in your runtime.");
        return G({url: b, responseType: "json"}).map(function (a) {
            return a.response
        })
    };
    var H = function () {
        var b = "document" in a && a.document.createElement("div");
        return function (a) {
            b.appendChild(a), b.innerHTML = ""
        }
    }(), I = function (b) {
        function c(a) {
            this._settings = a, b.call(this)
        }

        function d(a) {
            this._script = a, this.isDisposed = !1
        }

        return A(c, b), c.id = 0, c.prototype.subscribeCore = function (b) {
            var e = {
                jsonp: "JSONPCallback",
                async: !0,
                jsonpCallback: "rxjsjsonpCallbackscallback_" + (c.id++).toString(36)
            };
            if ("string" == typeof this._settings)e.url = this._settings; else for (var f in this._settings)y.call(this._settings, f) && (e[f] = this._settings[f]);
            var g = a.document.createElement("script");
            g.type = "text/javascript", g.async = e.async, g.src = e.url.replace(e.jsonp, e.jsonpCallback), a[e.jsonpCallback] = function (b) {
                a[e.jsonpCallback].called = !0, a[e.jsonpCallback].data = b
            };
            var h = function (c) {
                "load" !== c.type || a[e.jsonpCallback].called || (c = {type: "error"});
                var d = "error" === c.type ? 400 : 200, f = a[e.jsonpCallback].data;
                200 === d ? (b.onNext({
                    status: d,
                    responseType: "jsonp",
                    response: f,
                    originalEvent: c
                }), b.onCompleted()) : b.onError({type: "error", status: d, originalEvent: c})
            };
            g.onload = g.onreadystatechanged = g.onerror = h;
            var i = a.document.getElementsByTagName("head")[0] || a.document.documentElement;
            return i.insertBefore(g, i.firstChild), new d(g)
        }, d.prototype.dispose = function () {
            this.isDisposed || (this.isDisposed = !0, this._script.onload = this._script.onreadystatechanged = this._script.onerror = null, H(this._script), this._script = null)
        }, c
    }(p);
    x.jsonpRequest = function (a) {
        return new I(a)
    };
    var J = function (a) {
        function b(b, c, d, e, f) {
            this._state = b, this._url = c, this._protocol = d, this._open = e, this._close = f, a.call(this)
        }

        function c(a, b) {
            return function c(d) {
                a.onNext(d), a.onCompleted(), b.removeEventListener("open", c, !1)
            }
        }

        function d(a) {
            return function (b) {
                a.onNext(b)
            }
        }

        function e(a) {
            return function (b) {
                a.onError(b)
            }
        }

        function f(a) {
            return function (b) {
                return 1e3 === b.code && b.wasClean ? void a.onCompleted() : a.onError(b)
            }
        }

        function g(a, b, c, d, e) {
            this._socket = a, this._msgFn = b, this._errFn = c, this._closeFn = d, this._close = e, this.isDisposed = !1
        }

        return A(b, a), g.prototype.dispose = function () {
            this.isDisposed || (this.isDisposed = !0, n(this._socket, this._close), this._socket.removeEventListener("message", this._msgFn, !1), this._socket.removeEventListener("error", this._errFn, !1), this._socket.removeEventListener("close", this._closeFn, !1))
        }, b.prototype.subscribeCore = function (a) {
            this._state.socket = this._protocol ? new WebSocket(this._url, this._protocol) : new WebSocket(this._url);
            var b = c(this._open, this._state.socket), h = d(a), i = e(a), j = f(a);
            return this._open && this._state.socket.addEventListener("open", b, !1), this._state.socket.addEventListener("message", h, !1), this._state.socket.addEventListener("error", i, !1), this._state.socket.addEventListener("close", j, !1), new g(this._state.socket, h, i, j, this._close)
        }, b
    }(p), K = function (a) {
        function b(b, c) {
            this._state = b, this._close = c, a.call(this)
        }

        return A(b, a), b.prototype.next = function (a) {
            this._state.socket && this._state.socket.readyState === WebSocket.OPEN && this._state.socket.send(a)
        }, b.prototype.error = function (a) {
            if (!a.code)throw new Error('no code specified. be sure to pass { code: ###, reason: "" } to onError()');
            n(this._state.socket, this._close, a.code, a.reason || "")
        }, b.prototype.completed = function () {
            n(this._state.socket, this._close, 1e3, "")
        }, b
    }(q);
    x.fromWebSocket = function (a, b, c, d) {
        if (!WebSocket)throw new TypeError("WebSocket not implemented in your runtime.");
        var e = {socket: null};
        return v.create(new K(e, d), new J(e, a, b, c, d))
    };
    var L = function (a) {
        function b(b) {
            this._state = b, a.call(this)
        }

        return A(b, a), b.prototype.next = function (a) {
            this._state.worker && this._state.worker.postMessage(a)
        }, b.prototype.error = function (a) {
            throw a
        }, b.prototype.completed = function () {
        }, b
    }(q), M = function (b) {
        function c(a, c) {
            this._state = a, this._url = c, b.call(this)
        }

        function d(a) {
            return function (b) {
                a.onNext(b)
            }
        }

        function e(a) {
            return function (b) {
                a.onError(b)
            }
        }

        function f(a, b, c) {
            this._w = a, this._msgFn = b, this._errFn = c, this.isDisposed = !1
        }

        return A(c, b), f.prototype.dispose = function () {
            this.isDisposed || (this.isDisposed = !0, this._w.terminate(), this._w.removeEventListener("message", this._msgFn, !1), this._w.removeEventListener("error", this._errFn, !1))
        }, c.prototype.subscribeCore = function (b) {
            this._state.worker = new a.Worker(this._url);
            var c = d(b), g = e(b);
            return this._state.worker.addEventListener("message", c, !1), this._state.worker.addEventListener("error", g, !1), new f(this._state.worker, c, g)
        }, c
    }(p);
    x.fromWorker = function (b) {
        if (!a.Worker)throw new TypeError("Worker not implemented in your runtime.");
        var c = {worker: null};
        return v.create(new L(c), new M(c, b))
    };
    var N = function (a) {
        function b(b, c) {
            this._target = b, this._options = c, a.call(this)
        }

        function c(a) {
            this._m = a, this.isDisposed = !1
        }

        return A(b, a), c.prototype.dispose = function () {
            this.isDisposed || (this.isDisposed = !0, this._m.disconnect())
        }, b.prototype.subscribeCore = function (a) {
            var b = o(function (b) {
                a.onNext(b)
            });
            return b.observe(this._target, this._options), new c(b)
        }, b
    }(p);
    x.fromMutationObserver = function (b, c) {
        if (!a.MutationObserver && !a.WebKitMutationObserver)throw new TypeError("MutationObserver not implemented in your runtime.");
        return new N(b, c)
    };
    var O = function (b) {
        function c(a) {
            this._opts = a, b.call(this)
        }

        return A(c, b), c.prototype.subscribeCore = function (b) {
            a.navigator.geolocation.getCurrentPosition(function (a) {
                b.onNext(a), b.onCompleted()
            }, function (a) {
                b.onError(a)
            }, this._opts)
        }, c
    }(p), P = function (b) {
        function c(a) {
            this._opts = a, b.call(this)
        }

        function d(a) {
            this._id = a, this.isDisposed = !1
        }

        return A(c, b), d.prototype.dispose = function () {
            this.isDisposed || (this.isDisposed = !0, a.navigator.geolocation.clearWatch(this._id))
        }, c.prototype.subscribeCore = function (b) {
            var c = a.navigator.geolocation.watchPosition(function (a) {
                b.onNext(a)
            }, function (a) {
                b.onError(a)
            }, this._opts);
            return new d(c)
        }, c
    }(p);
    c.DOM.geolocation = {
        getCurrentPosition: function (b) {
            if (!a.navigator && !a.navigation.geolocation)throw new TypeError("geolocation not available");
            return new O(b)
        }, watchPosition: function (b) {
            if (!a.navigator && !a.navigation.geolocation)throw new TypeError("geolocation not available");
            return new P(b).publish().refCount()
        }
    };
    var Q = function (b) {
        function c(a, c, d, e) {
            this._readerFn = a, this._file = c, this._progressObserver = d, this._encoding = e, b.call(this)
        }

        function d(a, b) {
            return function (c) {
                b && b.onCompleted(), a.onNext(c.target.result), a.onCompleted()
            }
        }

        function e(a) {
            return function (b) {
                a.onError(b.target.error)
            }
        }

        function f(a) {
            return function (b) {
                a.onNext(b)
            }
        }

        function g(a, b, c, d, e) {
            this._r = a, this._po = b, this._lFn = c, this._eFn = d, this._pFn = e, this.isDisposed = !1
        }

        return A(c, b), g.prototype.dispose = function () {
            this.isDisposed || (this.isDisposed = !0, this._r.readyState === a.FileReader.LOADING && this._r.abort(), this._r.removeEventListener("load", this._lFn, !1), this._r.removeEventListener("error", this._eFn, !1), this._po && this._r.removeEventListener("progress", this._pFn, !1))
        }, c.prototype.subscribeCore = function (b) {
            var c = new a.FileReader, h = d(b, this._progressObserver), i = e(b), j = f(this._progressObserver);
            return c.addEventListener("load", h, !1), c.addEventListener("error", i, !1), this._progressObserver && c.addEventListener("progress", j, !1), c[this._readerFn](this._file, this._encoding), new g(c, this._progressObserver, h, i, j)
        }, c
    }(p);
    x.fromReader = function (b, c) {
        if (!a.FileReader)throw new TypeError("FileReader not implemented in your runtime.");
        return {
            asArrayBuffer: function () {
                return new Q("readAsArrayBuffer", b, c)
            }, asBinaryString: function () {
                return new Q("readAsBinaryString", b, c)
            }, asDataURL: function () {
                return new Q("readAsDataURL", b, c)
            }, asText: function (a) {
                return new Q("readAsText", b, c, a)
            }
        }
    };
    var R = function (a) {
        function b(b, c) {
            this._url = b, this._open = c, a.call(this)
        }

        function c(a, b) {
            return function c(d) {
                a.onNext(d), a.onCompleted(), b.removeEventListener("open", c, !1)
            }
        }

        function d(a) {
            return function (b) {
                b.readyState === EventSource.CLOSED ? a.onCompleted() : a.onError(b)
            }
        }

        function e(a) {
            return function (b) {
                a.onNext(b.data)
            }
        }

        function f(a, b, c) {
            this._s = a, this._errFn = b, this._msgFn = c, this.isDisposed = !1
        }

        return A(b, a), f.prototype.dispose = function () {
            this.isDisposed || (this._s.removeEventListener("error", this._errFn, !1), this._s.removeEventListener("message", this._msgFn, !1), this._s.close())
        }, b.prototype.subscribeCore = function (a) {
            var b = new EventSource(this._url), g = c(this._open, b), h = d(a), i = e(a);
            return this._open && b.addEventListener("open", g, !1), b.addEventListener("error", h, !1), b.addEventListener("message", i, !1), new f(b, h, i)
        }, b
    }(p);
    x.fromEventSource = function (b, c) {
        if (!a.EventSource)throw new TypeError("EventSource not implemented in your runtime.");
        return new R(b, c)
    };
    var S, T;
    return a.requestAnimationFrame ? (S = a.requestAnimationFrame, T = a.cancelAnimationFrame) : a.mozRequestAnimationFrame ? (S = a.mozRequestAnimationFrame, T = a.mozCancelAnimationFrame) : a.webkitRequestAnimationFrame ? (S = a.webkitRequestAnimationFrame, T = a.webkitCancelAnimationFrame) : a.msRequestAnimationFrame ? (S = a.msRequestAnimationFrame, T = a.msCancelAnimationFrame) : a.oRequestAnimationFrame ? (S = a.oRequestAnimationFrame, T = a.oCancelAnimationFrame) : (S = function (b) {
        a.setTimeout(b, 1e3 / 60)
    }, T = a.clearTimeout), w.requestAnimationFrame = function () {
        var b = function (b) {
            function c() {
                b.call(this)
            }

            function d(a, b, c, d) {
                return function () {
                    !a.isDisposed && a.setDisposable(r._fixup(b(c, d)))
                }
            }

            function e(a, b) {
                this._id = b, this._method = a, this.isDisposed = !1
            }

            return A(c, b), e.prototype.dispose = function () {
                this.isDisposed || (this.isDisposed = !0, this._method.call(null, this._id))
            }, c.prototype.schedule = function (a, b) {
                var c = new u, f = S(d(c, b, this, a));
                return new t(c, new e(T, f))
            }, c.prototype._scheduleFuture = function (b, c, f) {
                if (0 === c)return this.schedule(b, f);
                var g = new u, h = a.setTimeout(d(g, f, this, b), c);
                return new t(g, new e(a.clearTimeout, h))
            }, c
        }(w);
        return new b
    }(), w.microtask = function () {
        function b(a) {
            delete h[a]
        }

        function c(d) {
            if (i)a.setTimeout(function () {
                c(d)
            }, 0); else {
                var e = h[d];
                if (e) {
                    i = !0;
                    try {
                        e()
                    } catch (f) {
                        throw f
                    } finally {
                        b(d), i = !1
                    }
                }
            }
        }

        function d() {
            if (!a.postMessage || a.importScripts)return !1;
            var b = !1, c = a.onmessage;
            return a.onmessage = function () {
                b = !0
            }, a.postMessage("", "*"), a.onmessage = c, b
        }

        function e(a) {
            "string" == typeof a.data && a.data.substring(0, n.length) === n && c(a.data.substring(n.length))
        }

        var f, g = 1, h = {}, i = !1, j = a.MutationObserver || a.WebKitMutationObserver;
        if (j) {
            var k = "drainqueue_", l = new j(function (a) {
                a.forEach(function (a) {
                    c(a.attributeName.substring(k.length))
                })
            }), m = a.document.createElement("div");
            l.observe(m, {attributes: !0}), a.addEventListener("unload", function () {
                l.disconnect(), l = null
            }, !1), f = function (a) {
                var b = g++;
                return h[b] = a, m.setAttribute(k + b, "drainQueue"), b
            }
        } else if ("function" == typeof a.setImmediate)f = function (b) {
            var d = g++;
            return h[d] = b, a.setImmediate(function () {
                c(d)
            }), d
        }; else if (d()) {
            var n = "ms.rx.schedule" + Math.random();
            a.addEventListener ? a.addEventListener("message", e, !1) : a.attachEvent && a.attachEvent("onmessage", e), f = function (b) {
                var c = g++;
                return h[c] = b, a.postMessage(n + c, "*"), c
            }
        } else if (a.MessageChannel) {
            var o = new a.MessageChannel;
            o.port1.onmessage = function (a) {
                c(a.data)
            }, f = function (a) {
                var b = g++;
                return h[b] = a, o.port2.postMessage(b), b
            }
        } else f = "document" in a && "onreadystatechange" in a.document.createElement("script") ? function (b) {
            var d = a.document.createElement("script"), e = g++;
            return h[e] = b, d.onreadystatechange = function () {
                c(e), d.onreadystatechange = null, d.parentNode.removeChild(d), d = null
            }, a.document.documentElement.appendChild(d), e
        } : function (b) {
            var d = g++;
            return h[d] = b, a.setTimeout(function () {
                c(d)
            }, 0), d
        };
        var p = function (c) {
            function d() {
                c.call(this)
            }

            function e(a, b, c, d) {
                return function () {
                    !a.isDisposed && a.setDisposable(r._fixup(b(c, d)))
                }
            }

            function g(a, b) {
                this._id = b, this._method = a, this.isDisposed = !1
            }

            return A(d, c), g.prototype.dispose = function () {
                this.isDisposed || (this.isDisposed = !0, this._method.call(null, this._id))
            }, d.prototype.schedule = function (a, c) {
                var d = new u, h = f(e(d, c, this, a));
                return new t(d, new g(b, h))
            }, d.prototype._scheduleFuture = function (b, c, d) {
                if (0 === c)return this.schedule(b, d);
                var f = new u, h = a.setTimeout(e(f, d, this, b), c);
                return new t(f, new g(a.clearTimeout, h))
            }, d
        }(w);
        return new p
    }(), c
});
//# sourceMappingURL=rx.dom.map