"use strict";
function _typeof(o) {
    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
            return typeof o
        }
        : function(o) {
            return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o
        }
        ,
        _typeof(o)
}
!function(o, t) {
    "object" === ("undefined" == typeof exports ? "undefined" : _typeof(exports)) && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (o = o || self,
        o.cocoMessage = t())
}(void 0, function() {
    function o(o, t) {
        var e = document.createElement("div");
        for (var n in o) {
            var s = o[n];
            "className" == n ? (n = "class",
                e.setAttribute(n, s)) : "_" == n[0] && e.addEventListener(n.slice(1), s)
        }
        if ("string" == typeof t)
            e.innerHTML = t;
        else if ("object" == _typeof(t) && t.tagName)
            e.appendChild(t);
        else if (t)
            for (var i = 0; i < t.length; i++) {
                var r = t[i];
                e.appendChild(r)
            }
        return e
    }
    function t(o, t) {
        for (var e in t)
            o.style[e] = t[e];
        "" === o.getAttribute("style") && o.removeAttribute("style")
    }
    function e(o, t) {
        var e = o.className || "";
        if (!n(e, t)) {
            var s = e.split(/\s+/);
            s.push(t),
                o.className = s.join(" ")
        }
    }
    function n(o, t) {
        return o.indexOf(t) > -1
    }
    function s(o, t) {
        var e = o.className || "";
        if (n(e, t)) {
            var s = e.split(/\s+/)
                , i = s.indexOf(t);
            s.splice(i, 1),
                o.className = s.join(" ")
        }
        "" === o.className && o.removeAttribute("class")
    }
    function i() {
        return r(arguments, "info")
    }
    function r(o, t) {
        var e = {};
        for (var n in h)
            e[n] = h[n];
        for (var s = 0; s < o.length; s++) {
            var i = o[s];
            void 0 !== i && ("string" == typeof i || "object" == _typeof(i) ? e.msg = i : "boolean" == typeof i ? e.showClose = i : "function" == typeof i ? e.onClose = i : "number" == typeof i && (e.duration = i))
        }
        return e.type = t,
            a(e)
    }
    function a(e) {
        var n = e.type
            , i = e.duration
            , r = e.msg
            , a = e.showClose
            , d = e.onClose
            , g = 0 === i
            , p = l();
        "loading" == n && (r = "" === r ? "正在加载" : r,
            g = a,
            i = 0);
        var h = o({
            className: "coco-msg-wrapper"
        }, [o({
            className: "coco-msg coco-msg-fade-in ".concat(n)
        }, [o({
            className: "coco-msg-icon"
        }, p[n]), o({
            className: "coco-msg-content"
        }, r), o({
            className: "coco-msg-wait ".concat(g ? "coco-msg-pointer" : "coco-msg-wait-hidden"),
            _click: function() {
                f(h, d)
            }
        }, c(g) || "")])]);
        return 0 !== i && setTimeout(function() {
            f(h, d)
        }, i),
        m.children.length || document.body.appendChild(m),
            m.appendChild(h),
            t(h, {
                height: h.offsetHeight + "px"
            }),
            setTimeout(function() {
                s(h.children[0], "coco-msg-fade-in")
            }, 300),
            function() {
                f(h, d)
            }
    }
    function c(o) {
        return o ? '<svg class="coco-msg-close" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5514"><path d="M810 274l-238 238 238 238-60 60-238-238-238 238-60-60 238-238-238-238 60-60 238 238 238-238z" p-id="5515"></path></svg>' : ""
    }
    function f(o, n) {
        o && (t(o, {
            padding: 0,
            height: 0
        }),
            e(o.children[0], "coco-msg-fade-out"),
        n && n(),
            setTimeout(function() {
                if (o) {
                    for (var t = !1, e = 0; e < m.children.length; e++)
                        m.children[e] === o && (t = !0);
                    t && d(o),
                        o = null,
                    m.children.length || t && d(m)
                }
            }, 300))
    }
    function l() {
        return {
            info: '\n    <svg  viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3250"><path d="M469.333333 341.333333h85.333334v469.333334H469.333333z" fill="#ffffff" p-id="3251"></path><path d="M469.333333 213.333333h85.333334v85.333334H469.333333z" fill="#ffffff" p-id="3252"></path><path d="M384 341.333333h170.666667v85.333334H384z" fill="#ffffff" p-id="3253"></path><path d="M384 725.333333h256v85.333334H384z" fill="#ffffff" p-id="3254"></path></svg>\n    ',
            success: '\n    <svg  viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1807"><path d="M455.42 731.04c-8.85 0-17.75-3.05-24.99-9.27L235.14 553.91c-16.06-13.81-17.89-38.03-4.09-54.09 13.81-16.06 38.03-17.89 54.09-4.09l195.29 167.86c16.06 13.81 17.89 38.03 4.09 54.09-7.58 8.83-18.31 13.36-29.1 13.36z" p-id="1808" fill="#ffffff"></path><path d="M469.89 731.04c-8.51 0-17.07-2.82-24.18-8.6-16.43-13.37-18.92-37.53-5.55-53.96L734.1 307.11c13.37-16.44 37.53-18.92 53.96-5.55 16.43 13.37 18.92 37.53 5.55 53.96L499.67 716.89c-7.58 9.31-18.64 14.15-29.78 14.15z" p-id="1809" fill="#ffffff"></path></svg>\n    ',
            warning: '\n    <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="18912"><path d="M468.114286 621.714286c7.314286 21.942857 21.942857 36.571429 43.885714 36.571428s36.571429-14.628571 43.885714-36.571428L585.142857 219.428571c0-43.885714-36.571429-73.142857-73.142857-73.142857-43.885714 0-73.142857 36.571429-73.142857 80.457143l29.257143 394.971429zM512 731.428571c-43.885714 0-73.142857 29.257143-73.142857 73.142858s29.257143 73.142857 73.142857 73.142857 73.142857-29.257143 73.142857-73.142857-29.257143-73.142857-73.142857-73.142858z" p-id="18913" fill="#ffffff"></path></svg>\n    ',
            error: '\n    <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5514"><path d="M810 274l-238 238 238 238-60 60-238-238-238 238-60-60 238-238-238-238 60-60 238 238 238-238z" p-id="5515" fill="#ffffff"></path></svg>\n    ',
            loading: '\n    <div class="coco-msg_loading">\n    <svg class="coco-msg-circular" viewBox="25 25 50 50">\n      <circle class="coco-msg-path" cx="50" cy="50" r="20" fill="none" stroke-width="4" stroke-miterlimit="10"/>\n    </svg>\n    </div>\n    '
        }
    }
    function d(o) {
        o && o.parentNode.removeChild(o)
    }
    function g() {
        for (var o = 0; o < m.children.length; o++) {
            var t = m.children[o];
            f(t)
        }
    }
    function p() {
        var o = document;
        if (o && o.head) {
            var t = o.head
                , e = o.createElement("style")
                , n = ".coco-msg-stage *{box-sizing:border-box}.coco-msg-stage{position:fixed;top:20px;left:50%;width:auto;transform:translate(-50%,0);z-index:3000;padding-top:constant(safe-area-inset-top);padding-top:env(safe-area-inset-top)}.coco-msg-wrapper{position:relative;left:50%;transform:translate(-50%,0);transition:height .35s ease-out,padding .35s ease-out;padding:8px 0}.coco-msg{padding:10px 16px;border-radius:7px;position:relative;left:50%;transform:translate(-50%,0);display:inline-flex;align-items:center;box-shadow:0 4px 16px rgba(15,15,15,.15);color:rgba(44,44,44,.9);background-color:rgba(255,255,255,1);}.dark .coco-msg{color:rgba(255,255,255,.9);background-color:rgba(36,36,36,.95);box-shadow:0 0 1px 0 rgba(55,55,55,.3)}.coco-msg-icon{position:relative;width:16px;height:16px;border-radius:100px;display:flex;justify-content:center;align-items:center}.coco-msg-icon svg{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:12px;height:12px}.coco-msg-wait{width:20px;height:20px;position:relative;display:inline-flex;justify-content:center;align-items:center;margin-left:10px}.coco-msg-wait:active svg{transform:scale(.7)}.coco-msg-wait svg{transition:.12s ease-out;fill:currentColor}.coco-msg-close{width:14px;height:14px}.coco-msg-content{margin-left:10px;text-align:left;font-size:14px;font-weight:400;word-break:keep-all;line-height:1.57143;display:inline-block}.coco-msg.info .coco-msg-icon{background-color:#3491fa}.coco-msg.success .coco-msg-icon{background-color:#00b42a}.coco-msg.warning .coco-msg-icon{background-color:#f7ba1e}.coco-msg.error .coco-msg-icon{background-color:#f53f3f}.dark .coco-msg.info .coco-msg-icon{background-color:#1d4dd2}.dark .coco-msg.success .coco-msg-icon{background-color:#129a37}.dark .coco-msg.warning .coco-msg-icon{background-color:#cc961f}.dark .coco-msg.error .coco-msg-icon{background-color:#cb2e34}.dark .coco-msg .coco-msg-icon path{fill:rgba(36,36,36,.95)}.coco-msg_loading{flex-shrink:0;width:20px;height:20px;position:relative}.coco-msg-circular{-webkit-animation:coco-msg-rotate 2s linear infinite both;animation:coco-msg-rotate 2s linear infinite both;transform-origin:center center;height:20px!important;width:20px!important;color:#3491fa;margin-top:-1px}.dark .coco-msg-circular{color:#1d4dd2}.coco-msg-path{stroke-dasharray:1,200;stroke-dashoffset:0;stroke:currentColor;-webkit-animation:coco-msg-dash 1.5s ease-in-out infinite;animation:coco-msg-dash 1.5s ease-in-out infinite;stroke-linecap:round}@-webkit-keyframes coco-msg-rotate{100%{transform:translate(-50%,-50%) rotate(360deg)}}@keyframes coco-msg-rotate{100%{transform:translate(-50%,-50%) rotate(360deg)}}@-webkit-keyframes coco-msg-dash{0%{stroke-dasharray:1,200;stroke-dashoffset:0}50%{stroke-dasharray:89,200;stroke-dashoffset:-35px}100%{stroke-dasharray:89,200;stroke-dashoffset:-124px}}@keyframes coco-msg-dash{0%{stroke-dasharray:1,200;stroke-dashoffset:0}50%{stroke-dasharray:89,200;stroke-dashoffset:-35px}100%{stroke-dasharray:89,200;stroke-dashoffset:-124px}}.coco-msg-pointer{cursor:pointer}.coco-msg-wait-hidden{display:none}.coco-msg-fade-in{-webkit-animation:coco-msg-fade .22s ease-out both;animation:coco-msg-fade .22s ease-out both}.coco-msg-fade-out{animation:coco-msg-fade .22s linear reverse both}@-webkit-keyframes coco-msg-fade{0%{opacity:0;transform:translate(-50%,-80%)}to{opacity:1;transform:translate(-50%,0)}}@keyframes coco-msg-fade{0%{opacity:0;transform:translate(-50%,-80%)}to{opacity:1;transform:translate(-50%,0)}}";
            e.innerHTML = n,
                t.appendChild(e)
        }
    }
    if ("undefined" != typeof window) {
        var m = o({
            className: "coco-msg-stage"
        })
            , h = {
            msg: "",
            duration: 2e3,
            showClose: !1
        }
            , u = {
            info: function() {
                return r(arguments, "info")
            },
            success: function() {
                return r(arguments, "success")
            },
            warning: function() {
                return r(arguments, "warning")
            },
            error: function() {
                return r(arguments, "error")
            },
            loading: function() {
                return r(arguments, "loading")
            },
            destroyAll: function() {
                g()
            },
            config: function(o) {
                for (var t in o)
                    Object.hasOwnProperty.call(o, t) && void 0 !== o[t] && (h[t] = o[t])
            }
        };
        for (var v in u)
            i[v] = u[v];
        return p(),
            i
    }
});
