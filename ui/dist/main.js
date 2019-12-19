!(function(e) {
    function t(t) {
        for (var n, b, s = t[0], o = t[1], j = t[2], $ = 0, l = []; $ < s.length; $++)
            (b = s[$]), Object.prototype.hasOwnProperty.call(r, b) && r[b] && l.push(r[b][0]), (r[b] = 0);
        for (n in o) Object.prototype.hasOwnProperty.call(o, n) && (e[n] = o[n]);
        for (O && O(t); l.length; ) l.shift()();
        return a.push.apply(a, j || []), c();
    }
    function c() {
        for (var e, t = 0; t < a.length; t++) {
            for (var c = a[t], n = !0, s = 1; s < c.length; s++) {
                var o = c[s];
                0 !== r[o] && (n = !1);
            }
            n && (a.splice(t--, 1), (e = b((b.s = c[0]))));
        }
        return e;
    }
    var n = {},
        r = {0: 0},
        a = [];
    function b(t) {
        if (n[t]) return n[t].exports;
        var c = (n[t] = {i: t, l: !1, exports: {}});
        return e[t].call(c.exports, c, c.exports, b), (c.l = !0), c.exports;
    }
    (b.m = e),
        (b.c = n),
        (b.d = function(e, t, c) {
            b.o(e, t) || Object.defineProperty(e, t, {enumerable: !0, get: c});
        }),
        (b.r = function(e) {
            "undefined" != typeof Symbol &&
                Symbol.toStringTag &&
                Object.defineProperty(e, Symbol.toStringTag, {value: "Module"}),
                Object.defineProperty(e, "__esModule", {value: !0});
        }),
        (b.t = function(e, t) {
            if ((1 & t && (e = b(e)), 8 & t)) return e;
            if (4 & t && "object" == typeof e && e && e.__esModule) return e;
            var c = Object.create(null);
            if (
                (b.r(c), Object.defineProperty(c, "default", {enumerable: !0, value: e}), 2 & t && "string" != typeof e)
            )
                for (var n in e)
                    b.d(
                        c,
                        n,
                        function(t) {
                            return e[t];
                        }.bind(null, n)
                    );
            return c;
        }),
        (b.n = function(e) {
            var t =
                e && e.__esModule
                    ? function() {
                          return e.default;
                      }
                    : function() {
                          return e;
                      };
            return b.d(t, "a", t), t;
        }),
        (b.o = function(e, t) {
            return Object.prototype.hasOwnProperty.call(e, t);
        }),
        (b.p = "/");
    var s = (window.webpackJsonp = window.webpackJsonp || []),
        o = s.push.bind(s);
    (s.push = t), (s = s.slice());
    for (var j = 0; j < s.length; j++) t(s[j]);
    var O = o;
    a.push([48, 1]), c();
})({
    32: function(e, t, c) {},
    37: function(e, t, c) {},
    38: function(e, t, c) {},
    44: function(e, t, c) {},
    46: function(e, t, c) {},
    47: function(e, t, c) {},
    48: function(e, t, c) {
        "use strict";
        c.r(t);
        c(32);
        var n = c(0),
            r = c(3),
            a = c(10);
        function b(e) {
            var t, c, r, a, b, s, o, j, O, $, l;
            return {
                c() {
                    ((t = Object(n.q)("h1")).textContent = "About"),
                        (c = Object(n.P)()),
                        ((r = Object(n.q)("p")).innerHTML =
                            '\n\t\t\tWireGuard UI is an <a href="https://embark-studios.com/">Embark Studios</a> Open Source project.\n\t\t\t'),
                        (a = Object(n.P)()),
                        ((b = Object(n.q)("p")).innerHTML =
                            '\n\t\t\tFor contributions and feedback, please see the\n\t\t\t<a href="https://github.com/EmbarkStudios/wireguard-ui">GitHub project</a>.\n\t\t\t'),
                        (s = Object(n.P)()),
                        ((o = Object(n.q)("h2")).textContent = "License"),
                        (j = Object(n.P)()),
                        ((O = Object(n.q)("p")).innerHTML =
                            '\n\t\t\tWireGuard UI is licensed under <a href="https://www.apache.org/licenses/LICENSE-2.0">Apache License, Version 2.0</a>'),
                        ($ = Object(n.P)()),
                        ((l = Object(n.q)("p")).textContent = "Copyright © 2019, Embark Studios AB");
                },
                m(e, i) {
                    Object(n.B)(e, t, i),
                        Object(n.B)(e, c, i),
                        Object(n.B)(e, r, i),
                        Object(n.B)(e, a, i),
                        Object(n.B)(e, b, i),
                        Object(n.B)(e, s, i),
                        Object(n.B)(e, o, i),
                        Object(n.B)(e, j, i),
                        Object(n.B)(e, O, i),
                        Object(n.B)(e, $, i),
                        Object(n.B)(e, l, i);
                },
                p: n.F,
                i: n.F,
                o: n.F,
                d(e) {
                    e &&
                        (Object(n.p)(t),
                        Object(n.p)(c),
                        Object(n.p)(r),
                        Object(n.p)(a),
                        Object(n.p)(b),
                        Object(n.p)(s),
                        Object(n.p)(o),
                        Object(n.p)(j),
                        Object(n.p)(O),
                        Object(n.p)($),
                        Object(n.p)(l));
                }
            };
        }
        class s extends n.a {
            constructor(e) {
                super(), Object(n.A)(this, e, null, b, n.K, []);
            }
        }
        var o = s,
            j = c(12),
            O = c(15),
            $ = c(31),
            l = c(20);
        c(37);
        function i(e) {
            var t;
            return {
                c() {
                    t = Object(n.Q)("edit");
                },
                m(e, c) {
                    Object(n.B)(e, t, c);
                },
                d(e) {
                    e && Object(n.p)(t);
                }
            };
        }
        function u(e) {
            var t;
            return {
                c() {
                    t = Object(n.Q)("Download Config");
                },
                m(e, c) {
                    Object(n.B)(e, t, c);
                },
                d(e) {
                    e && Object(n.p)(t);
                }
            };
        }
        function p(e) {
            var t,
                c = new O.a({props: {$$slots: {default: [u]}, $$scope: {ctx: e}}});
            return {
                c() {
                    c.$$.fragment.c();
                },
                m(e, r) {
                    Object(n.E)(c, e, r), (t = !0);
                },
                p(e, t) {
                    var n = {};
                    e.$$scope && (n.$$scope = {changed: e, ctx: t}), c.$set(n);
                },
                i(e) {
                    t || (Object(n.S)(c.$$.fragment, e), (t = !0));
                },
                o(e) {
                    Object(n.T)(c.$$.fragment, e), (t = !1);
                },
                d(e) {
                    Object(n.n)(c, e);
                }
            };
        }
        function d(e) {
            var t,
                c,
                r,
                a,
                b,
                s,
                o,
                j,
                l,
                u,
                d,
                f,
                m,
                g,
                v,
                h,
                x,
                w,
                y,
                P,
                B = e.dev.Name + "",
                S = e.dev.IP + "",
                q = e.dev.PublicKey + "",
                T = new $.a({props: {class: "float-right material-icons", $$slots: {default: [i]}, $$scope: {ctx: e}}});
            T.$on("click", e.onEdit);
            var E = new O.b({
                props: {
                    href: "/api/v1/users/" + e.user + "/clients/" + e.clientId + "?format=config",
                    variant: "raised",
                    $$slots: {default: [p]},
                    $$scope: {ctx: e}
                }
            });
            return {
                c() {
                    (t = Object(n.q)("div")),
                        T.$$.fragment.c(),
                        (c = Object(n.P)()),
                        (r = Object(n.q)("img")),
                        (b = Object(n.P)()),
                        ((s = Object(n.q)("i")).textContent = "devices"),
                        (o = Object(n.P)()),
                        (j = Object(n.q)("h3")),
                        (l = Object(n.Q)(B)),
                        (u = Object(n.P)()),
                        (d = Object(n.q)("dl")),
                        ((f = Object(n.q)("dt")).textContent = "IP"),
                        (m = Object(n.q)("dd")),
                        (g = Object(n.Q)(S)),
                        ((v = Object(n.q)("dt")).textContent = "Public Key"),
                        (h = Object(n.q)("dd")),
                        (x = Object(n.Q)(q)),
                        (w = Object(n.P)()),
                        (y = Object(n.q)("div")),
                        E.$$.fragment.c(),
                        Object(n.e)(t, "class", "float-right"),
                        Object(n.e)(
                            r,
                            "src",
                            (a = "/api/v1/users/" + e.user + "/clients/" + e.clientId + "?format=qrcode")
                        ),
                        Object(n.e)(r, "class", "qrcode float-right svelte-9q81nd"),
                        Object(n.e)(r, "alt", "Mobile client config"),
                        Object(n.e)(s, "class", "material-icons"),
                        Object(n.e)(s, "aria-hidden", "true"),
                        Object(n.e)(j, "class", "mdc-typography--headline5"),
                        Object(n.e)(y, "class", "download svelte-9q81nd");
                },
                m(e, a) {
                    Object(n.B)(e, t, a),
                        Object(n.E)(T, t, null),
                        Object(n.B)(e, c, a),
                        Object(n.B)(e, r, a),
                        Object(n.B)(e, b, a),
                        Object(n.B)(e, s, a),
                        Object(n.B)(e, o, a),
                        Object(n.B)(e, j, a),
                        Object(n.c)(j, l),
                        Object(n.B)(e, u, a),
                        Object(n.B)(e, d, a),
                        Object(n.c)(d, f),
                        Object(n.c)(d, m),
                        Object(n.c)(m, g),
                        Object(n.c)(d, v),
                        Object(n.c)(d, h),
                        Object(n.c)(h, x),
                        Object(n.B)(e, w, a),
                        Object(n.B)(e, y, a),
                        Object(n.E)(E, y, null),
                        (P = !0);
                },
                p(e, t) {
                    var c = {};
                    e.$$scope && (c.$$scope = {changed: e, ctx: t}),
                        T.$set(c),
                        (P && !e.user) ||
                            a === (a = "/api/v1/users/" + t.user + "/clients/" + t.clientId + "?format=qrcode") ||
                            Object(n.e)(r, "src", a);
                    var b = {};
                    e.user && (b.href = "/api/v1/users/" + t.user + "/clients/" + t.clientId + "?format=config"),
                        e.$$scope && (b.$$scope = {changed: e, ctx: t}),
                        E.$set(b);
                },
                i(e) {
                    P || (Object(n.S)(T.$$.fragment, e), Object(n.S)(E.$$.fragment, e), (P = !0));
                },
                o(e) {
                    Object(n.T)(T.$$.fragment, e), Object(n.T)(E.$$.fragment, e), (P = !1);
                },
                d(e) {
                    e && Object(n.p)(t),
                        Object(n.n)(T),
                        e &&
                            (Object(n.p)(c),
                            Object(n.p)(r),
                            Object(n.p)(b),
                            Object(n.p)(s),
                            Object(n.p)(o),
                            Object(n.p)(j),
                            Object(n.p)(u),
                            Object(n.p)(d),
                            Object(n.p)(w),
                            Object(n.p)(y)),
                        Object(n.n)(E);
                }
            };
        }
        function f(e) {
            var t,
                c = new l.c({
                    props: {
                        elevation: "8",
                        style: "background-color: " + e.color + "; margin: 2em 0;",
                        class: "card",
                        $$slots: {default: [d]},
                        $$scope: {ctx: e}
                    }
                });
            return {
                c() {
                    c.$$.fragment.c();
                },
                m(e, r) {
                    Object(n.E)(c, e, r), (t = !0);
                },
                p(e, t) {
                    var n = {};
                    (e.$$scope || e.user) && (n.$$scope = {changed: e, ctx: t}), c.$set(n);
                },
                i(e) {
                    t || (Object(n.S)(c.$$.fragment, e), (t = !0));
                },
                o(e) {
                    Object(n.T)(c.$$.fragment, e), (t = !1);
                },
                d(e) {
                    Object(n.n)(c, e);
                }
            };
        }
        function m(e, t, c) {
            let {client: n, user: r} = t,
                b = n[0],
                s = n[1];
            for (var o = 0, j = 0; j < s.PrivateKey.length; j++) o = s.PrivateKey.charCodeAt(j) + ((o << 5) - o);
            const O = "hsl(" + (o % 360) + ",50%,95%)";
            return (
                (e.$set = (e) => {
                    "client" in e && c("client", (n = e.client)), "user" in e && c("user", (r = e.user));
                }),
                {
                    client: n,
                    user: r,
                    clientId: b,
                    dev: s,
                    color: O,
                    onEdit: function() {
                        Object(a.d)("/client/" + b, {replace: !0});
                    }
                }
            );
        }
        class g extends n.a {
            constructor(e) {
                super(), Object(n.A)(this, e, m, f, n.K, ["client", "user"]);
            }
        }
        var v = g;
        c(38);
        const {Object: h} = n.y;
        function x(e, t, c) {
            const n = h.create(e);
            return (n.dev = t[c]), n;
        }
        function w(e) {
            var t,
                c = new v({props: {user: e.user, client: e.dev}});
            return {
                c() {
                    c.$$.fragment.c();
                },
                m(e, r) {
                    Object(n.E)(c, e, r), (t = !0);
                },
                p(e, t) {
                    var n = {};
                    e.user && (n.user = t.user), e.clients && (n.client = t.dev), c.$set(n);
                },
                i(e) {
                    t || (Object(n.S)(c.$$.fragment, e), (t = !0));
                },
                o(e) {
                    Object(n.T)(c.$$.fragment, e), (t = !1);
                },
                d(e) {
                    Object(n.n)(c, e);
                }
            };
        }
        function y(e) {
            var t;
            return {
                c() {
                    t = Object(n.Q)("add");
                },
                m(e, c) {
                    Object(n.B)(e, t, c);
                },
                d(e) {
                    e && Object(n.p)(t);
                }
            };
        }
        function P(e) {
            var t,
                c = new j.a({props: {class: "material-icons", $$slots: {default: [y]}, $$scope: {ctx: e}}});
            return {
                c() {
                    c.$$.fragment.c();
                },
                m(e, r) {
                    Object(n.E)(c, e, r), (t = !0);
                },
                p(e, t) {
                    var n = {};
                    e.$$scope && (n.$$scope = {changed: e, ctx: t}), c.$set(n);
                },
                i(e) {
                    t || (Object(n.S)(c.$$.fragment, e), (t = !0));
                },
                o(e) {
                    Object(n.T)(c.$$.fragment, e), (t = !1);
                },
                d(e) {
                    Object(n.n)(c, e);
                }
            };
        }
        function B(e) {
            var t, c, r, a, b, s, o, O, $, l, i, u, p, d, f;
            let m = e.clients,
                g = [];
            for (let t = 0; t < m.length; t += 1) g[t] = w(x(e, m, t));
            const v = (e) =>
                Object(n.T)(g[e], 1, 1, () => {
                    g[e] = null;
                });
            var h = new j.c({props: {color: "primary", $$slots: {default: [P]}, $$scope: {ctx: e}}});
            return (
                h.$on("click", e.handleNewClick),
                {
                    c() {
                        (t = Object(n.q)("div")),
                            (c = Object(n.q)("div")),
                            (r = Object(n.q)("div")),
                            (a = Object(n.q)("h2")),
                            (b = Object(n.Q)("My VPN Clients")),
                            (s = Object(n.q)("small")),
                            (o = Object(n.Q)("(")),
                            (O = Object(n.Q)(e.user)),
                            ($ = Object(n.Q)(")")),
                            (l = Object(n.P)()),
                            ((i = Object(n.q)("div")).innerHTML =
                                '<h3>Instructions</h3> <ol><li><a href="https://www.wireguard.com/install/">Install WireGuard</a></li> <li>Download your WireGuard config</li> <li>Connect to the VPN server</li></ol>'),
                            (u = Object(n.P)());
                        for (let e = 0; e < g.length; e += 1) g[e].c();
                        (p = Object(n.P)()),
                            (d = Object(n.q)("div")),
                            h.$$.fragment.c(),
                            Object(n.e)(s, "class", "mdc-typography--headline5 svelte-o5v00"),
                            Object(n.e)(a, "class", "mdc-typography--headline2 svelte-o5v00"),
                            Object(n.e)(r, "class", "col svelte-o5v00"),
                            Object(n.e)(i, "class", "col help svelte-o5v00"),
                            Object(n.e)(c, "class", "row svelte-o5v00"),
                            Object(n.e)(t, "class", "content svelte-o5v00"),
                            Object(n.e)(d, "class", "newClient svelte-o5v00");
                    },
                    m(e, j) {
                        Object(n.B)(e, t, j),
                            Object(n.c)(t, c),
                            Object(n.c)(c, r),
                            Object(n.c)(r, a),
                            Object(n.c)(a, b),
                            Object(n.c)(a, s),
                            Object(n.c)(s, o),
                            Object(n.c)(s, O),
                            Object(n.c)(s, $),
                            Object(n.c)(c, l),
                            Object(n.c)(c, i),
                            Object(n.B)(e, u, j);
                        for (let t = 0; t < g.length; t += 1) g[t].m(e, j);
                        Object(n.B)(e, p, j), Object(n.B)(e, d, j), Object(n.E)(h, d, null), (f = !0);
                    },
                    p(e, t) {
                        if (((f && !e.user) || Object(n.N)(O, t.user), e.user || e.clients)) {
                            let c;
                            for (m = t.clients, c = 0; c < m.length; c += 1) {
                                const r = x(t, m, c);
                                g[c]
                                    ? (g[c].p(e, r), Object(n.S)(g[c], 1))
                                    : ((g[c] = w(r)), g[c].c(), Object(n.S)(g[c], 1), g[c].m(p.parentNode, p));
                            }
                            for (Object(n.z)(), c = m.length; c < g.length; c += 1) v(c);
                            Object(n.i)();
                        }
                        var c = {};
                        e.$$scope && (c.$$scope = {changed: e, ctx: t}), h.$set(c);
                    },
                    i(e) {
                        if (!f) {
                            for (let e = 0; e < m.length; e += 1) Object(n.S)(g[e]);
                            Object(n.S)(h.$$.fragment, e), (f = !0);
                        }
                    },
                    o(e) {
                        g = g.filter(Boolean);
                        for (let e = 0; e < g.length; e += 1) Object(n.T)(g[e]);
                        Object(n.T)(h.$$.fragment, e), (f = !1);
                    },
                    d(e) {
                        e && (Object(n.p)(t), Object(n.p)(u)),
                            Object(n.o)(g, e),
                            e && (Object(n.p)(p), Object(n.p)(d)),
                            Object(n.n)(h);
                    }
                }
            );
        }
        function S(e, t, c) {
            let {user: n} = t,
                a = "/api/v1/users/" + n + "/clients",
                b = [];
            async function s() {
                const e = await fetch(a);
                c("clients", (b = Object.entries(await e.json()))), console.log("Fetched clients", b);
            }
            return (
                Object(r.d)(s),
                (e.$set = (e) => {
                    "user" in e && c("user", (n = e.user));
                }),
                {
                    user: n,
                    clients: b,
                    handleNewClick: async function(e) {
                        const t = await fetch(a, {method: "POST"}).then(s());
                        let c = await t.json();
                        console.log("New client added", c);
                    }
                }
            );
        }
        class q extends n.a {
            constructor(e) {
                super(), Object(n.A)(this, e, S, B, n.K, ["user"]);
            }
        }
        var T = q,
            E = c(26),
            N = c(27),
            C = c(28),
            Q = c(23),
            I = c.n(Q);
        c(44);
        function k(e) {
            var t;
            return {
                c() {
                    t = Object(n.Q)("arrow_back");
                },
                m(e, c) {
                    Object(n.B)(e, t, c);
                },
                d(e) {
                    e && Object(n.p)(t);
                }
            };
        }
        function _(e) {
            var t,
                c = new j.a({props: {class: "material-icons", $$slots: {default: [k]}, $$scope: {ctx: e}}});
            return {
                c() {
                    c.$$.fragment.c();
                },
                m(e, r) {
                    Object(n.E)(c, e, r), (t = !0);
                },
                p(e, t) {
                    var n = {};
                    e.$$scope && (n.$$scope = {changed: e, ctx: t}), c.$set(n);
                },
                i(e) {
                    t || (Object(n.S)(c.$$.fragment, e), (t = !0));
                },
                o(e) {
                    Object(n.T)(c.$$.fragment, e), (t = !1);
                },
                d(e) {
                    Object(n.n)(c, e);
                }
            };
        }
        function K(e) {
            var t;
            return {
                c() {
                    t = Object(n.Q)("Friendly name of client / device");
                },
                m(e, c) {
                    Object(n.B)(e, t, c);
                },
                d(e) {
                    e && Object(n.p)(t);
                }
            };
        }
        function A(e) {
            var t;
            return {
                c() {
                    t = Object(n.Q)("Notes about the client.");
                },
                m(e, c) {
                    Object(n.B)(e, t, c);
                },
                d(e) {
                    e && Object(n.p)(t);
                }
            };
        }
        function M(e) {
            var t;
            return {
                c() {
                    t = Object(n.Q)("Save Changes");
                },
                m(e, c) {
                    Object(n.B)(e, t, c);
                },
                d(e) {
                    e && Object(n.p)(t);
                }
            };
        }
        function D(e) {
            var t,
                c = new j.b({props: {$$slots: {default: [M]}, $$scope: {ctx: e}}});
            return {
                c() {
                    c.$$.fragment.c();
                },
                m(e, r) {
                    Object(n.E)(c, e, r), (t = !0);
                },
                p(e, t) {
                    var n = {};
                    e.$$scope && (n.$$scope = {changed: e, ctx: t}), c.$set(n);
                },
                i(e) {
                    t || (Object(n.S)(c.$$.fragment, e), (t = !0));
                },
                o(e) {
                    Object(n.T)(c.$$.fragment, e), (t = !1);
                },
                d(e) {
                    Object(n.n)(c, e);
                }
            };
        }
        function L(e) {
            var t;
            return {
                c() {
                    t = Object(n.Q)("Delete Client Config");
                },
                m(e, c) {
                    Object(n.B)(e, t, c);
                },
                d(e) {
                    e && Object(n.p)(t);
                }
            };
        }
        function G(e) {
            var t;
            return {
                c() {
                    t = Object(n.Q)("Are you sure you want to delete this client configuration?");
                },
                m(e, c) {
                    Object(n.B)(e, t, c);
                },
                d(e) {
                    e && Object(n.p)(t);
                }
            };
        }
        function H(e) {
            var t;
            return {
                c() {
                    t = Object(n.Q)("No");
                },
                m(e, c) {
                    Object(n.B)(e, t, c);
                },
                d(e) {
                    e && Object(n.p)(t);
                }
            };
        }
        function W(e) {
            var t,
                c = new j.b({props: {$$slots: {default: [H]}, $$scope: {ctx: e}}});
            return {
                c() {
                    c.$$.fragment.c();
                },
                m(e, r) {
                    Object(n.E)(c, e, r), (t = !0);
                },
                p(e, t) {
                    var n = {};
                    e.$$scope && (n.$$scope = {changed: e, ctx: t}), c.$set(n);
                },
                i(e) {
                    t || (Object(n.S)(c.$$.fragment, e), (t = !0));
                },
                o(e) {
                    Object(n.T)(c.$$.fragment, e), (t = !1);
                },
                d(e) {
                    Object(n.n)(c, e);
                }
            };
        }
        function F(e) {
            var t;
            return {
                c() {
                    t = Object(n.Q)("Yes");
                },
                m(e, c) {
                    Object(n.B)(e, t, c);
                },
                d(e) {
                    e && Object(n.p)(t);
                }
            };
        }
        function V(e) {
            var t,
                c = new j.b({props: {$$slots: {default: [F]}, $$scope: {ctx: e}}});
            return {
                c() {
                    c.$$.fragment.c();
                },
                m(e, r) {
                    Object(n.E)(c, e, r), (t = !0);
                },
                p(e, t) {
                    var n = {};
                    e.$$scope && (n.$$scope = {changed: e, ctx: t}), c.$set(n);
                },
                i(e) {
                    t || (Object(n.S)(c.$$.fragment, e), (t = !0));
                },
                o(e) {
                    Object(n.T)(c.$$.fragment, e), (t = !1);
                },
                d(e) {
                    Object(n.n)(c, e);
                }
            };
        }
        function U(e) {
            var t,
                c,
                r = new O.b({props: {action: "none", $$slots: {default: [W]}, $$scope: {ctx: e}}}),
                a = new O.b({
                    props: {action: "delete", default: !0, use: [E.b], $$slots: {default: [V]}, $$scope: {ctx: e}}
                });
            return {
                c() {
                    r.$$.fragment.c(), (t = Object(n.P)()), a.$$.fragment.c();
                },
                m(e, b) {
                    Object(n.E)(r, e, b), Object(n.B)(e, t, b), Object(n.E)(a, e, b), (c = !0);
                },
                p(e, t) {
                    var c = {};
                    e.$$scope && (c.$$scope = {changed: e, ctx: t}), r.$set(c);
                    var n = {};
                    e.$$scope && (n.$$scope = {changed: e, ctx: t}), a.$set(n);
                },
                i(e) {
                    c || (Object(n.S)(r.$$.fragment, e), Object(n.S)(a.$$.fragment, e), (c = !0));
                },
                o(e) {
                    Object(n.T)(r.$$.fragment, e), Object(n.T)(a.$$.fragment, e), (c = !1);
                },
                d(e) {
                    Object(n.n)(r, e), e && Object(n.p)(t), Object(n.n)(a, e);
                }
            };
        }
        function J(e) {
            var t,
                c,
                r,
                a,
                b = new l.b({props: {id: "delete-title", $$slots: {default: [L]}, $$scope: {ctx: e}}}),
                s = new l.a({props: {id: "delete-content", $$slots: {default: [G]}, $$scope: {ctx: e}}}),
                o = new E.a({props: {$$slots: {default: [U]}, $$scope: {ctx: e}}});
            return {
                c() {
                    (t = Object(n.q)("div")),
                        b.$$.fragment.c(),
                        (c = Object(n.P)()),
                        s.$$.fragment.c(),
                        (r = Object(n.P)()),
                        o.$$.fragment.c(),
                        Object(n.e)(t, "class", "container");
                },
                m(e, j) {
                    Object(n.B)(e, t, j),
                        Object(n.E)(b, t, null),
                        Object(n.c)(t, c),
                        Object(n.E)(s, t, null),
                        Object(n.c)(t, r),
                        Object(n.E)(o, t, null),
                        (a = !0);
                },
                p(e, t) {
                    var c = {};
                    e.$$scope && (c.$$scope = {changed: e, ctx: t}), b.$set(c);
                    var n = {};
                    e.$$scope && (n.$$scope = {changed: e, ctx: t}), s.$set(n);
                    var r = {};
                    e.$$scope && (r.$$scope = {changed: e, ctx: t}), o.$set(r);
                },
                i(e) {
                    a ||
                        (Object(n.S)(b.$$.fragment, e),
                        Object(n.S)(s.$$.fragment, e),
                        Object(n.S)(o.$$.fragment, e),
                        (a = !0));
                },
                o(e) {
                    Object(n.T)(b.$$.fragment, e),
                        Object(n.T)(s.$$.fragment, e),
                        Object(n.T)(o.$$.fragment, e),
                        (a = !1);
                },
                d(e) {
                    e && Object(n.p)(t), Object(n.n)(b), Object(n.n)(s), Object(n.n)(o);
                }
            };
        }
        function R(e) {
            var t;
            return {
                c() {
                    t = Object(n.Q)("Delete Client Config");
                },
                m(e, c) {
                    Object(n.B)(e, t, c);
                },
                d(e) {
                    e && Object(n.p)(t);
                }
            };
        }
        function z(e) {
            var t,
                c = new j.b({props: {$$slots: {default: [R]}, $$scope: {ctx: e}}});
            return {
                c() {
                    c.$$.fragment.c();
                },
                m(e, r) {
                    Object(n.E)(c, e, r), (t = !0);
                },
                p(e, t) {
                    var n = {};
                    e.$$scope && (n.$$scope = {changed: e, ctx: t}), c.$set(n);
                },
                i(e) {
                    t || (Object(n.S)(c.$$.fragment, e), (t = !0));
                },
                o(e) {
                    Object(n.T)(c.$$.fragment, e), (t = !1);
                },
                d(e) {
                    Object(n.n)(c, e);
                }
            };
        }
        function Y(e) {
            var t,
                c,
                r,
                a,
                b,
                s,
                o,
                $,
                l,
                i,
                u,
                p,
                d,
                f,
                m,
                g,
                v,
                h,
                x,
                w,
                y,
                P,
                B,
                S,
                q,
                T,
                Q,
                I,
                k,
                M,
                L,
                G,
                H,
                W,
                F,
                V,
                U,
                R,
                Y,
                X,
                ee = e.client.Name + "",
                te = e.client.IP + "",
                ce = e.client.PrivateKey + "",
                ne = e.client.PublicKey + "",
                re = new j.c({props: {color: "primary", $$slots: {default: [_]}, $$scope: {ctx: e}}});
            function ae(t) {
                e.textfield0_value_binding.call(null, t), (d = !0), Object(n.b)(() => (d = !1));
            }
            re.$on("click", Z);
            let be = {
                input$id: "name",
                variant: "outlined",
                label: "Client Name",
                "input$aria-controls": "client-name",
                "input$aria-describedby": "client-name-help"
            };
            void 0 !== e.clientName && (be.value = e.clientName);
            var se = new N.a({props: be});
            n.g.push(() => Object(n.f)(se, "value", ae));
            var oe = new C.a({props: {id: "client-name-help", $$slots: {default: [K]}, $$scope: {ctx: e}}});
            function je(t) {
                e.textfield1_value_binding.call(null, t), (v = !0), Object(n.b)(() => (v = !1));
            }
            let Oe = {
                input$id: "notes",
                fullwidth: !0,
                textarea: !0,
                label: "Label",
                "input$aria-controls": "client-notes",
                "input$aria-describedby": "client-notes-help"
            };
            void 0 !== e.clientNotes && (Oe.value = e.clientNotes);
            var $e = new N.a({props: Oe});
            n.g.push(() => Object(n.f)($e, "value", je));
            var le = new C.a({props: {id: "client-notes-help", $$slots: {default: [A]}, $$scope: {ctx: e}}}),
                ie = new O.b({props: {variant: "raised", $$slots: {default: [D]}, $$scope: {ctx: e}}});
            let ue = {
                "aria-labelledby": "delete-title",
                "aria-describedby": "delete-content",
                $$slots: {default: [J]},
                $$scope: {ctx: e}
            };
            var pe = new E.c({props: ue});
            e.dialog_binding(pe), pe.$on("MDCDialog:closed", e.deleteHandler);
            var de = new O.b({props: {id: "delete", variant: "raised", $$slots: {default: [z]}, $$scope: {ctx: e}}});
            return (
                de.$on("click", e.click_handler),
                {
                    c() {
                        (t = Object(n.q)("div")),
                            re.$$.fragment.c(),
                            (c = Object(n.P)()),
                            (r = Object(n.q)("h3")),
                            (a = Object(n.Q)("Client Properties ")),
                            (b = Object(n.q)("small")),
                            (s = Object(n.Q)("(")),
                            (o = Object(n.Q)(ee)),
                            ($ = Object(n.Q)(")")),
                            (l = Object(n.P)()),
                            (i = Object(n.q)("div")),
                            (u = Object(n.q)("form")),
                            (p = Object(n.q)("div")),
                            se.$$.fragment.c(),
                            (f = Object(n.P)()),
                            oe.$$.fragment.c(),
                            (m = Object(n.P)()),
                            (g = Object(n.q)("div")),
                            $e.$$.fragment.c(),
                            (h = Object(n.P)()),
                            le.$$.fragment.c(),
                            (x = Object(n.P)()),
                            ie.$$.fragment.c(),
                            (w = Object(n.P)()),
                            (y = Object(n.q)("div")),
                            ((P = Object(n.q)("h3")).textContent = "Additional Properties"),
                            (B = Object(n.P)()),
                            (S = Object(n.q)("dl")),
                            ((q = Object(n.q)("dt")).textContent = "IP Address"),
                            (T = Object(n.q)("dd")),
                            (Q = Object(n.Q)(te)),
                            ((I = Object(n.q)("dt")).textContent = "Private Key"),
                            (k = Object(n.q)("dd")),
                            (M = Object(n.Q)(ce)),
                            ((L = Object(n.q)("dt")).textContent = "Public Key"),
                            (G = Object(n.q)("dd")),
                            (H = Object(n.Q)(ne)),
                            (W = Object(n.P)()),
                            (F = Object(n.q)("div")),
                            ((V = Object(n.q)("h3")).textContent = "Danger Zone"),
                            (U = Object(n.P)()),
                            pe.$$.fragment.c(),
                            (R = Object(n.P)()),
                            de.$$.fragment.c(),
                            Object(n.e)(t, "class", "back svelte-101labk"),
                            Object(n.e)(b, "class", "text-muted"),
                            Object(n.e)(r, "class", "mdc-typography--headline3"),
                            Object(n.e)(p, "class", "margins"),
                            Object(n.e)(g, "class", "margins"),
                            Object(n.e)(i, "class", "container"),
                            Object(n.e)(P, "class", "mdc-typography--headline5"),
                            Object(n.e)(y, "class", "container"),
                            Object(n.e)(V, "class", "mdc-typography--headline4"),
                            Object(n.e)(F, "class", "container"),
                            (X = Object(n.D)(u, "submit", Object(n.I)(e.handleSubmit)));
                    },
                    m(e, j) {
                        Object(n.B)(e, t, j),
                            Object(n.E)(re, t, null),
                            Object(n.B)(e, c, j),
                            Object(n.B)(e, r, j),
                            Object(n.c)(r, a),
                            Object(n.c)(r, b),
                            Object(n.c)(b, s),
                            Object(n.c)(b, o),
                            Object(n.c)(b, $),
                            Object(n.B)(e, l, j),
                            Object(n.B)(e, i, j),
                            Object(n.c)(i, u),
                            Object(n.c)(u, p),
                            Object(n.E)(se, p, null),
                            Object(n.c)(p, f),
                            Object(n.E)(oe, p, null),
                            Object(n.c)(u, m),
                            Object(n.c)(u, g),
                            Object(n.E)($e, g, null),
                            Object(n.c)(g, h),
                            Object(n.E)(le, g, null),
                            Object(n.c)(u, x),
                            Object(n.E)(ie, u, null),
                            Object(n.B)(e, w, j),
                            Object(n.B)(e, y, j),
                            Object(n.c)(y, P),
                            Object(n.c)(y, B),
                            Object(n.c)(y, S),
                            Object(n.c)(S, q),
                            Object(n.c)(S, T),
                            Object(n.c)(T, Q),
                            Object(n.c)(S, I),
                            Object(n.c)(S, k),
                            Object(n.c)(k, M),
                            Object(n.c)(S, L),
                            Object(n.c)(S, G),
                            Object(n.c)(G, H),
                            Object(n.B)(e, W, j),
                            Object(n.B)(e, F, j),
                            Object(n.c)(F, V),
                            Object(n.c)(F, U),
                            Object(n.E)(pe, F, null),
                            Object(n.c)(F, R),
                            Object(n.E)(de, F, null),
                            (Y = !0);
                    },
                    p(e, t) {
                        var c = {};
                        e.$$scope && (c.$$scope = {changed: e, ctx: t}),
                            re.$set(c),
                            (Y && !e.client) || ee === (ee = t.client.Name + "") || Object(n.N)(o, ee);
                        var r = {};
                        !d && e.clientName && (r.value = t.clientName), se.$set(r);
                        var a = {};
                        e.$$scope && (a.$$scope = {changed: e, ctx: t}), oe.$set(a);
                        var b = {};
                        !v && e.clientNotes && (b.value = t.clientNotes), $e.$set(b);
                        var s = {};
                        e.$$scope && (s.$$scope = {changed: e, ctx: t}), le.$set(s);
                        var j = {};
                        e.$$scope && (j.$$scope = {changed: e, ctx: t}),
                            ie.$set(j),
                            (Y && !e.client) || te === (te = t.client.IP + "") || Object(n.N)(Q, te),
                            (Y && !e.client) || ce === (ce = t.client.PrivateKey + "") || Object(n.N)(M, ce),
                            (Y && !e.client) || ne === (ne = t.client.PublicKey + "") || Object(n.N)(H, ne);
                        var O = {};
                        e.$$scope && (O.$$scope = {changed: e, ctx: t}), pe.$set(O);
                        var $ = {};
                        e.$$scope && ($.$$scope = {changed: e, ctx: t}), de.$set($);
                    },
                    i(e) {
                        Y ||
                            (Object(n.S)(re.$$.fragment, e),
                            Object(n.S)(se.$$.fragment, e),
                            Object(n.S)(oe.$$.fragment, e),
                            Object(n.S)($e.$$.fragment, e),
                            Object(n.S)(le.$$.fragment, e),
                            Object(n.S)(ie.$$.fragment, e),
                            Object(n.S)(pe.$$.fragment, e),
                            Object(n.S)(de.$$.fragment, e),
                            (Y = !0));
                    },
                    o(e) {
                        Object(n.T)(re.$$.fragment, e),
                            Object(n.T)(se.$$.fragment, e),
                            Object(n.T)(oe.$$.fragment, e),
                            Object(n.T)($e.$$.fragment, e),
                            Object(n.T)(le.$$.fragment, e),
                            Object(n.T)(ie.$$.fragment, e),
                            Object(n.T)(pe.$$.fragment, e),
                            Object(n.T)(de.$$.fragment, e),
                            (Y = !1);
                    },
                    d(a) {
                        a && Object(n.p)(t),
                            Object(n.n)(re),
                            a && (Object(n.p)(c), Object(n.p)(r), Object(n.p)(l), Object(n.p)(i)),
                            Object(n.n)(se),
                            Object(n.n)(oe),
                            Object(n.n)($e),
                            Object(n.n)(le),
                            Object(n.n)(ie),
                            a && (Object(n.p)(w), Object(n.p)(y), Object(n.p)(W), Object(n.p)(F)),
                            e.dialog_binding(null),
                            Object(n.n)(pe),
                            Object(n.n)(de),
                            X();
                    }
                }
            );
        }
        function Z(e) {
            Object(a.d)("/", {replace: !0});
        }
        function X(e, t, c) {
            let {clientId: b} = t;
            const s = "/api/v1/users/" + I()().get("wguser", {fromRes: !0}) + "/clients/" + b;
            let o,
                j = {},
                O = "",
                $ = "";
            Object(r.d)(async function() {
                const e = await fetch(s);
                c("client", (j = await e.json())),
                    c("clientName", (O = j.Name)),
                    c("clientNotes", ($ = j.Notes)),
                    console.log("Fetched client", j);
            });
            return (
                (e.$set = (e) => {
                    "clientId" in e && c("clientId", (b = e.clientId));
                }),
                {
                    clientId: b,
                    client: j,
                    clientName: O,
                    clientNotes: $,
                    deleteDialog: o,
                    handleSubmit: async function(e) {
                        c("client", (j.Name = O), j), c("client", (j.Notes = $), j);
                        const t = await fetch(s, {
                            method: "PUT",
                            headers: {"Content-Type": "application/json"},
                            body: JSON.stringify(j)
                        });
                        c("client", (j = await t.json())),
                            Object(a.d)("/", {replace: !0}),
                            console.log("Saved changes", t);
                    },
                    deleteHandler: async function(e) {
                        switch (e.detail.action) {
                            case "delete":
                                const e = await fetch(s, {method: "DELETE"});
                                await e, Object(a.d)("/", {replace: !0});
                        }
                    },
                    textfield0_value_binding: function(e) {
                        (O = e), c("clientName", O);
                    },
                    textfield1_value_binding: function(e) {
                        ($ = e), c("clientNotes", $);
                    },
                    dialog_binding: function(e) {
                        n.g[e ? "unshift" : "push"](() => {
                            c("deleteDialog", (o = e));
                        });
                    },
                    click_handler: () => o.open()
                }
            );
        }
        class ee extends n.a {
            constructor(e) {
                super(), Object(n.A)(this, e, X, Y, n.K, ["clientId"]);
            }
        }
        var te = ee,
            ce = c(19);
        n.a;
        c(46);
        function ne(e) {
            var t;
            return {
                c() {
                    t = Object(n.Q)("WireGuard VPN");
                },
                m(e, c) {
                    Object(n.B)(e, t, c);
                },
                d(e) {
                    e && Object(n.p)(t);
                }
            };
        }
        function re(e) {
            var t,
                c = new ce.c({props: {$$slots: {default: [ne]}, $$scope: {ctx: e}}});
            return {
                c() {
                    c.$$.fragment.c();
                },
                m(e, r) {
                    Object(n.E)(c, e, r), (t = !0);
                },
                p(e, t) {
                    var n = {};
                    e.$$scope && (n.$$scope = {changed: e, ctx: t}), c.$set(n);
                },
                i(e) {
                    t || (Object(n.S)(c.$$.fragment, e), (t = !0));
                },
                o(e) {
                    Object(n.T)(c.$$.fragment, e), (t = !1);
                },
                d(e) {
                    Object(n.n)(c, e);
                }
            };
        }
        function ae(e) {
            var t, c, r;
            return {
                c() {
                    (t = Object(n.q)("small")),
                        (c = Object(n.Q)("Logged in as ")),
                        (r = Object(n.Q)(e.user)),
                        Object(n.e)(t, "class", "user svelte-1bvmsl0");
                },
                m(e, a) {
                    Object(n.B)(e, t, a), Object(n.c)(t, c), Object(n.c)(t, r);
                },
                p(e, t) {
                    e.user && Object(n.N)(r, t.user);
                },
                d(e) {
                    e && Object(n.p)(t);
                }
            };
        }
        function be(e) {
            var t,
                c,
                r = new ce.b({props: {$$slots: {default: [re]}, $$scope: {ctx: e}}}),
                a = new ce.b({props: {align: "end", toolbar: !0, $$slots: {default: [ae]}, $$scope: {ctx: e}}});
            return {
                c() {
                    r.$$.fragment.c(), (t = Object(n.P)()), a.$$.fragment.c();
                },
                m(e, b) {
                    Object(n.E)(r, e, b), Object(n.B)(e, t, b), Object(n.E)(a, e, b), (c = !0);
                },
                p(e, t) {
                    var c = {};
                    e.$$scope && (c.$$scope = {changed: e, ctx: t}), r.$set(c);
                    var n = {};
                    (e.$$scope || e.user) && (n.$$scope = {changed: e, ctx: t}), a.$set(n);
                },
                i(e) {
                    c || (Object(n.S)(r.$$.fragment, e), Object(n.S)(a.$$.fragment, e), (c = !0));
                },
                o(e) {
                    Object(n.T)(r.$$.fragment, e), Object(n.T)(a.$$.fragment, e), (c = !1);
                },
                d(e) {
                    Object(n.n)(r, e), e && Object(n.p)(t), Object(n.n)(a, e);
                }
            };
        }
        function se(e) {
            var t,
                c = new ce.a({props: {$$slots: {default: [be]}, $$scope: {ctx: e}}});
            return {
                c() {
                    c.$$.fragment.c();
                },
                m(e, r) {
                    Object(n.E)(c, e, r), (t = !0);
                },
                p(e, t) {
                    var n = {};
                    (e.$$scope || e.user) && (n.$$scope = {changed: e, ctx: t}), c.$set(n);
                },
                i(e) {
                    t || (Object(n.S)(c.$$.fragment, e), (t = !0));
                },
                o(e) {
                    Object(n.T)(c.$$.fragment, e), (t = !1);
                },
                d(e) {
                    Object(n.n)(c, e);
                }
            };
        }
        function oe(e) {
            var t,
                c = new ce.d({
                    props: {variant: "static", color: "primary", $$slots: {default: [se]}, $$scope: {ctx: e}}
                });
            return {
                c() {
                    c.$$.fragment.c();
                },
                m(e, r) {
                    Object(n.E)(c, e, r), (t = !0);
                },
                p(e, t) {
                    var n = {};
                    (e.$$scope || e.user) && (n.$$scope = {changed: e, ctx: t}), c.$set(n);
                },
                i(e) {
                    t || (Object(n.S)(c.$$.fragment, e), (t = !0));
                },
                o(e) {
                    Object(n.T)(c.$$.fragment, e), (t = !1);
                },
                d(e) {
                    Object(n.n)(c, e);
                }
            };
        }
        function je(e, t, c) {
            let {user: n} = t;
            return (
                (e.$set = (e) => {
                    "user" in e && c("user", (n = e.user));
                }),
                {user: n}
            );
        }
        class Oe extends n.a {
            constructor(e) {
                super(), Object(n.A)(this, e, je, oe, n.K, ["user"]);
            }
        }
        var $e = Oe;
        c(47);
        function le(e) {
            var t,
                c = new T({props: {user: e.user}});
            return {
                c() {
                    c.$$.fragment.c();
                },
                m(e, r) {
                    Object(n.E)(c, e, r), (t = !0);
                },
                p(e, t) {
                    var n = {};
                    e.user && (n.user = t.user), c.$set(n);
                },
                i(e) {
                    t || (Object(n.S)(c.$$.fragment, e), (t = !0));
                },
                o(e) {
                    Object(n.T)(c.$$.fragment, e), (t = !1);
                },
                d(e) {
                    Object(n.n)(c, e);
                }
            };
        }
        function ie(e) {
            var t,
                c,
                r,
                b,
                s,
                j,
                O = new $e({props: {user: e.user}}),
                $ = new a.b({props: {path: "client/:clientId", component: te}}),
                l = new a.b({props: {path: "about", component: o}}),
                i = new a.b({props: {path: "/", $$slots: {default: [le]}, $$scope: {ctx: e}}});
            return {
                c() {
                    O.$$.fragment.c(),
                        (t = Object(n.P)()),
                        (c = Object(n.q)("main")),
                        (r = Object(n.q)("div")),
                        $.$$.fragment.c(),
                        (b = Object(n.P)()),
                        l.$$.fragment.c(),
                        (s = Object(n.P)()),
                        i.$$.fragment.c(),
                        Object(n.e)(c, "role", "main"),
                        Object(n.e)(c, "class", "container svelte-vt2udd");
                },
                m(e, a) {
                    Object(n.E)(O, e, a),
                        Object(n.B)(e, t, a),
                        Object(n.B)(e, c, a),
                        Object(n.c)(c, r),
                        Object(n.E)($, r, null),
                        Object(n.c)(r, b),
                        Object(n.E)(l, r, null),
                        Object(n.c)(r, s),
                        Object(n.E)(i, r, null),
                        (j = !0);
                },
                p(e, t) {
                    var c = {};
                    e.user && (c.user = t.user), O.$set(c);
                    var n = {};
                    (e.$$scope || e.user) && (n.$$scope = {changed: e, ctx: t}), i.$set(n);
                },
                i(e) {
                    j ||
                        (Object(n.S)(O.$$.fragment, e),
                        Object(n.S)($.$$.fragment, e),
                        Object(n.S)(l.$$.fragment, e),
                        Object(n.S)(i.$$.fragment, e),
                        (j = !0));
                },
                o(e) {
                    Object(n.T)(O.$$.fragment, e),
                        Object(n.T)($.$$.fragment, e),
                        Object(n.T)(l.$$.fragment, e),
                        Object(n.T)(i.$$.fragment, e),
                        (j = !1);
                },
                d(e) {
                    Object(n.n)(O, e),
                        e && (Object(n.p)(t), Object(n.p)(c)),
                        Object(n.n)($),
                        Object(n.n)(l),
                        Object(n.n)(i);
                }
            };
        }
        function ue(e) {
            var t,
                c,
                r,
                b,
                s,
                o = new a.c({props: {url: e.url, $$slots: {default: [ie]}, $$scope: {ctx: e}}});
            return {
                c() {
                    (t = Object(n.P)()),
                        (c = Object(n.q)("div")),
                        o.$$.fragment.c(),
                        (r = Object(n.P)()),
                        ((b = Object(n.q)("footer")).innerHTML =
                            '<p>\n\t\t\t      Powered by <a href="https://github.com/EmbarkStudios/wireguard-ui">WireGuard UI</a>.\n\t\t\t    </p> <p>\n\t\t\t      Copyright © 2019 <a href="https://embark-studios.com">Embark Studios</a>.\n\t\t\t    </p>'),
                        (document.title = "WireGuard VPN"),
                        Object(n.e)(b, "class", "svelte-vt2udd"),
                        Object(n.e)(c, "class", "mdc-typography");
                },
                m(e, a) {
                    Object(n.B)(e, t, a),
                        Object(n.B)(e, c, a),
                        Object(n.E)(o, c, null),
                        Object(n.c)(c, r),
                        Object(n.c)(c, b),
                        (s = !0);
                },
                p(e, t) {
                    var c = {};
                    e.url && (c.url = t.url), (e.$$scope || e.user) && (c.$$scope = {changed: e, ctx: t}), o.$set(c);
                },
                i(e) {
                    s || (Object(n.S)(o.$$.fragment, e), (s = !0));
                },
                o(e) {
                    Object(n.T)(o.$$.fragment, e), (s = !1);
                },
                d(e) {
                    e && (Object(n.p)(t), Object(n.p)(c)), Object(n.n)(o);
                }
            };
        }
        function pe(e, t, c) {
            const n = I()();
            let {user: r = n.get("wguser", {fromRes: !0}) || "anonymous", url: a = ""} = t;
            return (
                (e.$set = (e) => {
                    "user" in e && c("user", (r = e.user)), "url" in e && c("url", (a = e.url));
                }),
                {user: r, url: a}
            );
        }
        class de extends n.a {
            constructor(e) {
                super(), Object(n.A)(this, e, pe, ue, n.K, ["user", "url"]);
            }
        }
        const fe = new de({target: document.body, props: {name: "WireGuard VPN"}});
        t.default = fe;
    }
});
//# sourceMappingURL=main.js.map
