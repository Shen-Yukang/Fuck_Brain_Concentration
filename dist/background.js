var Ie = Object.defineProperty;
var Re = (r, e, t) => e in r ? Ie(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t;
var H = (r, e, t) => Re(r, typeof e != "symbol" ? e + "" : e, t);
var se = { exports: {} }, Oe = se.exports, we;
function De() {
  return we || (we = 1, function(r, e) {
    (function(t, o) {
      o(r);
    })(typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : Oe, function(t) {
      if (!(globalThis.chrome && globalThis.chrome.runtime && globalThis.chrome.runtime.id))
        throw new Error("This script should only be loaded in a browser extension.");
      if (globalThis.browser && globalThis.browser.runtime && globalThis.browser.runtime.id)
        t.exports = globalThis.browser;
      else {
        const o = "The message port closed before a response was received.", i = (a) => {
          const c = {
            alarms: {
              clear: {
                minArgs: 0,
                maxArgs: 1
              },
              clearAll: {
                minArgs: 0,
                maxArgs: 0
              },
              get: {
                minArgs: 0,
                maxArgs: 1
              },
              getAll: {
                minArgs: 0,
                maxArgs: 0
              }
            },
            bookmarks: {
              create: {
                minArgs: 1,
                maxArgs: 1
              },
              get: {
                minArgs: 1,
                maxArgs: 1
              },
              getChildren: {
                minArgs: 1,
                maxArgs: 1
              },
              getRecent: {
                minArgs: 1,
                maxArgs: 1
              },
              getSubTree: {
                minArgs: 1,
                maxArgs: 1
              },
              getTree: {
                minArgs: 0,
                maxArgs: 0
              },
              move: {
                minArgs: 2,
                maxArgs: 2
              },
              remove: {
                minArgs: 1,
                maxArgs: 1
              },
              removeTree: {
                minArgs: 1,
                maxArgs: 1
              },
              search: {
                minArgs: 1,
                maxArgs: 1
              },
              update: {
                minArgs: 2,
                maxArgs: 2
              }
            },
            browserAction: {
              disable: {
                minArgs: 0,
                maxArgs: 1,
                fallbackToNoCallback: !0
              },
              enable: {
                minArgs: 0,
                maxArgs: 1,
                fallbackToNoCallback: !0
              },
              getBadgeBackgroundColor: {
                minArgs: 1,
                maxArgs: 1
              },
              getBadgeText: {
                minArgs: 1,
                maxArgs: 1
              },
              getPopup: {
                minArgs: 1,
                maxArgs: 1
              },
              getTitle: {
                minArgs: 1,
                maxArgs: 1
              },
              openPopup: {
                minArgs: 0,
                maxArgs: 0
              },
              setBadgeBackgroundColor: {
                minArgs: 1,
                maxArgs: 1,
                fallbackToNoCallback: !0
              },
              setBadgeText: {
                minArgs: 1,
                maxArgs: 1,
                fallbackToNoCallback: !0
              },
              setIcon: {
                minArgs: 1,
                maxArgs: 1
              },
              setPopup: {
                minArgs: 1,
                maxArgs: 1,
                fallbackToNoCallback: !0
              },
              setTitle: {
                minArgs: 1,
                maxArgs: 1,
                fallbackToNoCallback: !0
              }
            },
            browsingData: {
              remove: {
                minArgs: 2,
                maxArgs: 2
              },
              removeCache: {
                minArgs: 1,
                maxArgs: 1
              },
              removeCookies: {
                minArgs: 1,
                maxArgs: 1
              },
              removeDownloads: {
                minArgs: 1,
                maxArgs: 1
              },
              removeFormData: {
                minArgs: 1,
                maxArgs: 1
              },
              removeHistory: {
                minArgs: 1,
                maxArgs: 1
              },
              removeLocalStorage: {
                minArgs: 1,
                maxArgs: 1
              },
              removePasswords: {
                minArgs: 1,
                maxArgs: 1
              },
              removePluginData: {
                minArgs: 1,
                maxArgs: 1
              },
              settings: {
                minArgs: 0,
                maxArgs: 0
              }
            },
            commands: {
              getAll: {
                minArgs: 0,
                maxArgs: 0
              }
            },
            contextMenus: {
              remove: {
                minArgs: 1,
                maxArgs: 1
              },
              removeAll: {
                minArgs: 0,
                maxArgs: 0
              },
              update: {
                minArgs: 2,
                maxArgs: 2
              }
            },
            cookies: {
              get: {
                minArgs: 1,
                maxArgs: 1
              },
              getAll: {
                minArgs: 1,
                maxArgs: 1
              },
              getAllCookieStores: {
                minArgs: 0,
                maxArgs: 0
              },
              remove: {
                minArgs: 1,
                maxArgs: 1
              },
              set: {
                minArgs: 1,
                maxArgs: 1
              }
            },
            devtools: {
              inspectedWindow: {
                eval: {
                  minArgs: 1,
                  maxArgs: 2,
                  singleCallbackArg: !1
                }
              },
              panels: {
                create: {
                  minArgs: 3,
                  maxArgs: 3,
                  singleCallbackArg: !0
                },
                elements: {
                  createSidebarPane: {
                    minArgs: 1,
                    maxArgs: 1
                  }
                }
              }
            },
            downloads: {
              cancel: {
                minArgs: 1,
                maxArgs: 1
              },
              download: {
                minArgs: 1,
                maxArgs: 1
              },
              erase: {
                minArgs: 1,
                maxArgs: 1
              },
              getFileIcon: {
                minArgs: 1,
                maxArgs: 2
              },
              open: {
                minArgs: 1,
                maxArgs: 1,
                fallbackToNoCallback: !0
              },
              pause: {
                minArgs: 1,
                maxArgs: 1
              },
              removeFile: {
                minArgs: 1,
                maxArgs: 1
              },
              resume: {
                minArgs: 1,
                maxArgs: 1
              },
              search: {
                minArgs: 1,
                maxArgs: 1
              },
              show: {
                minArgs: 1,
                maxArgs: 1,
                fallbackToNoCallback: !0
              }
            },
            extension: {
              isAllowedFileSchemeAccess: {
                minArgs: 0,
                maxArgs: 0
              },
              isAllowedIncognitoAccess: {
                minArgs: 0,
                maxArgs: 0
              }
            },
            history: {
              addUrl: {
                minArgs: 1,
                maxArgs: 1
              },
              deleteAll: {
                minArgs: 0,
                maxArgs: 0
              },
              deleteRange: {
                minArgs: 1,
                maxArgs: 1
              },
              deleteUrl: {
                minArgs: 1,
                maxArgs: 1
              },
              getVisits: {
                minArgs: 1,
                maxArgs: 1
              },
              search: {
                minArgs: 1,
                maxArgs: 1
              }
            },
            i18n: {
              detectLanguage: {
                minArgs: 1,
                maxArgs: 1
              },
              getAcceptLanguages: {
                minArgs: 0,
                maxArgs: 0
              }
            },
            identity: {
              launchWebAuthFlow: {
                minArgs: 1,
                maxArgs: 1
              }
            },
            idle: {
              queryState: {
                minArgs: 1,
                maxArgs: 1
              }
            },
            management: {
              get: {
                minArgs: 1,
                maxArgs: 1
              },
              getAll: {
                minArgs: 0,
                maxArgs: 0
              },
              getSelf: {
                minArgs: 0,
                maxArgs: 0
              },
              setEnabled: {
                minArgs: 2,
                maxArgs: 2
              },
              uninstallSelf: {
                minArgs: 0,
                maxArgs: 1
              }
            },
            notifications: {
              clear: {
                minArgs: 1,
                maxArgs: 1
              },
              create: {
                minArgs: 1,
                maxArgs: 2
              },
              getAll: {
                minArgs: 0,
                maxArgs: 0
              },
              getPermissionLevel: {
                minArgs: 0,
                maxArgs: 0
              },
              update: {
                minArgs: 2,
                maxArgs: 2
              }
            },
            pageAction: {
              getPopup: {
                minArgs: 1,
                maxArgs: 1
              },
              getTitle: {
                minArgs: 1,
                maxArgs: 1
              },
              hide: {
                minArgs: 1,
                maxArgs: 1,
                fallbackToNoCallback: !0
              },
              setIcon: {
                minArgs: 1,
                maxArgs: 1
              },
              setPopup: {
                minArgs: 1,
                maxArgs: 1,
                fallbackToNoCallback: !0
              },
              setTitle: {
                minArgs: 1,
                maxArgs: 1,
                fallbackToNoCallback: !0
              },
              show: {
                minArgs: 1,
                maxArgs: 1,
                fallbackToNoCallback: !0
              }
            },
            permissions: {
              contains: {
                minArgs: 1,
                maxArgs: 1
              },
              getAll: {
                minArgs: 0,
                maxArgs: 0
              },
              remove: {
                minArgs: 1,
                maxArgs: 1
              },
              request: {
                minArgs: 1,
                maxArgs: 1
              }
            },
            runtime: {
              getBackgroundPage: {
                minArgs: 0,
                maxArgs: 0
              },
              getPlatformInfo: {
                minArgs: 0,
                maxArgs: 0
              },
              openOptionsPage: {
                minArgs: 0,
                maxArgs: 0
              },
              requestUpdateCheck: {
                minArgs: 0,
                maxArgs: 0
              },
              sendMessage: {
                minArgs: 1,
                maxArgs: 3
              },
              sendNativeMessage: {
                minArgs: 2,
                maxArgs: 2
              },
              setUninstallURL: {
                minArgs: 1,
                maxArgs: 1
              }
            },
            sessions: {
              getDevices: {
                minArgs: 0,
                maxArgs: 1
              },
              getRecentlyClosed: {
                minArgs: 0,
                maxArgs: 1
              },
              restore: {
                minArgs: 0,
                maxArgs: 1
              }
            },
            storage: {
              local: {
                clear: {
                  minArgs: 0,
                  maxArgs: 0
                },
                get: {
                  minArgs: 0,
                  maxArgs: 1
                },
                getBytesInUse: {
                  minArgs: 0,
                  maxArgs: 1
                },
                remove: {
                  minArgs: 1,
                  maxArgs: 1
                },
                set: {
                  minArgs: 1,
                  maxArgs: 1
                }
              },
              managed: {
                get: {
                  minArgs: 0,
                  maxArgs: 1
                },
                getBytesInUse: {
                  minArgs: 0,
                  maxArgs: 1
                }
              },
              sync: {
                clear: {
                  minArgs: 0,
                  maxArgs: 0
                },
                get: {
                  minArgs: 0,
                  maxArgs: 1
                },
                getBytesInUse: {
                  minArgs: 0,
                  maxArgs: 1
                },
                remove: {
                  minArgs: 1,
                  maxArgs: 1
                },
                set: {
                  minArgs: 1,
                  maxArgs: 1
                }
              }
            },
            tabs: {
              captureVisibleTab: {
                minArgs: 0,
                maxArgs: 2
              },
              create: {
                minArgs: 1,
                maxArgs: 1
              },
              detectLanguage: {
                minArgs: 0,
                maxArgs: 1
              },
              discard: {
                minArgs: 0,
                maxArgs: 1
              },
              duplicate: {
                minArgs: 1,
                maxArgs: 1
              },
              executeScript: {
                minArgs: 1,
                maxArgs: 2
              },
              get: {
                minArgs: 1,
                maxArgs: 1
              },
              getCurrent: {
                minArgs: 0,
                maxArgs: 0
              },
              getZoom: {
                minArgs: 0,
                maxArgs: 1
              },
              getZoomSettings: {
                minArgs: 0,
                maxArgs: 1
              },
              goBack: {
                minArgs: 0,
                maxArgs: 1
              },
              goForward: {
                minArgs: 0,
                maxArgs: 1
              },
              highlight: {
                minArgs: 1,
                maxArgs: 1
              },
              insertCSS: {
                minArgs: 1,
                maxArgs: 2
              },
              move: {
                minArgs: 2,
                maxArgs: 2
              },
              query: {
                minArgs: 1,
                maxArgs: 1
              },
              reload: {
                minArgs: 0,
                maxArgs: 2
              },
              remove: {
                minArgs: 1,
                maxArgs: 1
              },
              removeCSS: {
                minArgs: 1,
                maxArgs: 2
              },
              sendMessage: {
                minArgs: 2,
                maxArgs: 3
              },
              setZoom: {
                minArgs: 1,
                maxArgs: 2
              },
              setZoomSettings: {
                minArgs: 1,
                maxArgs: 2
              },
              update: {
                minArgs: 1,
                maxArgs: 2
              }
            },
            topSites: {
              get: {
                minArgs: 0,
                maxArgs: 0
              }
            },
            webNavigation: {
              getAllFrames: {
                minArgs: 1,
                maxArgs: 1
              },
              getFrame: {
                minArgs: 1,
                maxArgs: 1
              }
            },
            webRequest: {
              handlerBehaviorChanged: {
                minArgs: 0,
                maxArgs: 0
              }
            },
            windows: {
              create: {
                minArgs: 0,
                maxArgs: 1
              },
              get: {
                minArgs: 1,
                maxArgs: 2
              },
              getAll: {
                minArgs: 0,
                maxArgs: 1
              },
              getCurrent: {
                minArgs: 0,
                maxArgs: 1
              },
              getLastFocused: {
                minArgs: 0,
                maxArgs: 1
              },
              remove: {
                minArgs: 1,
                maxArgs: 1
              },
              update: {
                minArgs: 2,
                maxArgs: 2
              }
            }
          };
          if (Object.keys(c).length === 0)
            throw new Error("api-metadata.json has not been included in browser-polyfill");
          class n extends WeakMap {
            constructor(d, m = void 0) {
              super(m), this.createItem = d;
            }
            get(d) {
              return this.has(d) || this.set(d, this.createItem(d)), super.get(d);
            }
          }
          const f = (g) => g && typeof g == "object" && typeof g.then == "function", s = (g, d) => (...m) => {
            a.runtime.lastError ? g.reject(new Error(a.runtime.lastError.message)) : d.singleCallbackArg || m.length <= 1 && d.singleCallbackArg !== !1 ? g.resolve(m[0]) : g.resolve(m);
          }, l = (g) => g == 1 ? "argument" : "arguments", A = (g, d) => function(h, ...S) {
            if (S.length < d.minArgs)
              throw new Error(`Expected at least ${d.minArgs} ${l(d.minArgs)} for ${g}(), got ${S.length}`);
            if (S.length > d.maxArgs)
              throw new Error(`Expected at most ${d.maxArgs} ${l(d.maxArgs)} for ${g}(), got ${S.length}`);
            return new Promise((x, w) => {
              if (d.fallbackToNoCallback)
                try {
                  h[g](...S, s({
                    resolve: x,
                    reject: w
                  }, d));
                } catch (u) {
                  console.warn(`${g} API method doesn't seem to support the callback parameter, falling back to call it without a callback: `, u), h[g](...S), d.fallbackToNoCallback = !1, d.noCallback = !0, x();
                }
              else d.noCallback ? (h[g](...S), x()) : h[g](...S, s({
                resolve: x,
                reject: w
              }, d));
            });
          }, y = (g, d, m) => new Proxy(d, {
            apply(h, S, x) {
              return m.call(S, g, ...x);
            }
          });
          let M = Function.call.bind(Object.prototype.hasOwnProperty);
          const N = (g, d = {}, m = {}) => {
            let h = /* @__PURE__ */ Object.create(null), S = {
              has(w, u) {
                return u in g || u in h;
              },
              get(w, u, b) {
                if (u in h)
                  return h[u];
                if (!(u in g))
                  return;
                let E = g[u];
                if (typeof E == "function")
                  if (typeof d[u] == "function")
                    E = y(g, g[u], d[u]);
                  else if (M(m, u)) {
                    let q = A(u, m[u]);
                    E = y(g, g[u], q);
                  } else
                    E = E.bind(g);
                else if (typeof E == "object" && E !== null && (M(d, u) || M(m, u)))
                  E = N(E, d[u], m[u]);
                else if (M(m, "*"))
                  E = N(E, d[u], m["*"]);
                else
                  return Object.defineProperty(h, u, {
                    configurable: !0,
                    enumerable: !0,
                    get() {
                      return g[u];
                    },
                    set(q) {
                      g[u] = q;
                    }
                  }), E;
                return h[u] = E, E;
              },
              set(w, u, b, E) {
                return u in h ? h[u] = b : g[u] = b, !0;
              },
              defineProperty(w, u, b) {
                return Reflect.defineProperty(h, u, b);
              },
              deleteProperty(w, u) {
                return Reflect.deleteProperty(h, u);
              }
            }, x = Object.create(g);
            return new Proxy(x, S);
          }, v = (g) => ({
            addListener(d, m, ...h) {
              d.addListener(g.get(m), ...h);
            },
            hasListener(d, m) {
              return d.hasListener(g.get(m));
            },
            removeListener(d, m) {
              d.removeListener(g.get(m));
            }
          }), B = new n((g) => typeof g != "function" ? g : function(m) {
            const h = N(m, {}, {
              getContent: {
                minArgs: 0,
                maxArgs: 0
              }
            });
            g(h);
          }), K = new n((g) => typeof g != "function" ? g : function(m, h, S) {
            let x = !1, w, u = new Promise((J) => {
              w = function(_) {
                x = !0, J(_);
              };
            }), b;
            try {
              b = g(m, h, w);
            } catch (J) {
              b = Promise.reject(J);
            }
            const E = b !== !0 && f(b);
            if (b !== !0 && !E && !x)
              return !1;
            const q = (J) => {
              J.then((_) => {
                S(_);
              }, (_) => {
                let ue;
                _ && (_ instanceof Error || typeof _.message == "string") ? ue = _.message : ue = "An unexpected error occurred", S({
                  __mozWebExtensionPolyfillReject__: !0,
                  message: ue
                });
              }).catch((_) => {
                console.error("Failed to send onMessage rejected reply", _);
              });
            };
            return q(E ? b : u), !0;
          }), p = ({
            reject: g,
            resolve: d
          }, m) => {
            a.runtime.lastError ? a.runtime.lastError.message === o ? d() : g(new Error(a.runtime.lastError.message)) : m && m.__mozWebExtensionPolyfillReject__ ? g(new Error(m.message)) : d(m);
          }, P = (g, d, m, ...h) => {
            if (h.length < d.minArgs)
              throw new Error(`Expected at least ${d.minArgs} ${l(d.minArgs)} for ${g}(), got ${h.length}`);
            if (h.length > d.maxArgs)
              throw new Error(`Expected at most ${d.maxArgs} ${l(d.maxArgs)} for ${g}(), got ${h.length}`);
            return new Promise((S, x) => {
              const w = p.bind(null, {
                resolve: S,
                reject: x
              });
              h.push(w), m.sendMessage(...h);
            });
          }, Le = {
            devtools: {
              network: {
                onRequestFinished: v(B)
              }
            },
            runtime: {
              onMessage: v(K),
              onMessageExternal: v(K),
              sendMessage: P.bind(null, "sendMessage", {
                minArgs: 1,
                maxArgs: 3
              })
            },
            tabs: {
              sendMessage: P.bind(null, "sendMessage", {
                minArgs: 2,
                maxArgs: 3
              })
            }
          }, de = {
            clear: {
              minArgs: 1,
              maxArgs: 1
            },
            get: {
              minArgs: 1,
              maxArgs: 1
            },
            set: {
              minArgs: 1,
              maxArgs: 1
            }
          };
          return c.privacy = {
            network: {
              "*": de
            },
            services: {
              "*": de
            },
            websites: {
              "*": de
            }
          }, N(a, Le, c);
        };
        t.exports = i(chrome);
      }
    });
  }(se)), se.exports;
}
De();
var U;
(function(r) {
  r.Local = "local", r.Sync = "sync", r.Managed = "managed", r.Session = "session";
})(U || (U = {}));
var ye;
(function(r) {
  r.ExtensionPagesOnly = "TRUSTED_CONTEXTS", r.ExtensionPagesAndContentScripts = "TRUSTED_AND_UNTRUSTED_CONTEXTS";
})(ye || (ye = {}));
const T = globalThis.chrome, be = async (r, e) => {
  const t = (i) => typeof i == "function", o = (i) => i instanceof Promise;
  return t(r) ? (o(r), r(e)) : r;
};
let Ue = !1;
function Ce(r) {
  if (T && T.storage[r] === void 0)
    throw new Error(`Check your storage permission in manifest.json: ${r} is not defined`);
}
function F(r, e, t) {
  var B, K;
  let o = null, i = !1, a = [];
  const c = (t == null ? void 0 : t.storageEnum) ?? U.Local, n = (t == null ? void 0 : t.liveUpdate) ?? !1, f = ((B = t == null ? void 0 : t.serialization) == null ? void 0 : B.serialize) ?? ((p) => p), s = ((K = t == null ? void 0 : t.serialization) == null ? void 0 : K.deserialize) ?? ((p) => p);
  Ue === !1 && c === U.Session && (t == null ? void 0 : t.sessionAccessForContentScripts) === !0 && (Ce(c), T == null || T.storage[c].setAccessLevel({
    accessLevel: ye.ExtensionPagesAndContentScripts
  }).catch((p) => {
    console.warn(p), console.warn("Please call setAccessLevel into different context, like a background script.");
  }), Ue = !0);
  const l = async () => {
    Ce(c);
    const p = await (T == null ? void 0 : T.storage[c].get([r]));
    return p ? s(p[r]) ?? e : e;
  }, A = () => {
    a.forEach((p) => p());
  }, y = async (p) => {
    i || (o = await l()), o = await be(p, o), await (T == null ? void 0 : T.storage[c].set({ [r]: f(o) })), A();
  }, M = (p) => (a = [...a, p], () => {
    a = a.filter((P) => P !== p);
  }), N = () => o;
  l().then((p) => {
    o = p, i = !0, A();
  });
  async function v(p) {
    if (p[r] === void 0)
      return;
    const P = s(p[r].newValue);
    o !== P && (o = await be(P, o), A());
  }
  return n && (T == null || T.storage[c].onChanged.addListener(v)), {
    get: l,
    set: y,
    getSnapshot: N,
    subscribe: M
  };
}
const ke = F("theme-storage-key", "light", {
  storageEnum: U.Local,
  liveUpdate: !0
}), Fe = {
  ...ke,
  toggle: async () => {
    await ke.set((r) => r === "light" ? "dark" : "light");
  }
}, te = F("focus-time-storage-key", {
  duration: 25,
  // 默认25分钟
  isActive: !1
}, {
  storageEnum: U.Local,
  liveUpdate: !0
}), L = {
  ...te,
  startFocus: async (r) => {
    const e = Date.now();
    await te.set({
      duration: r,
      isActive: !0,
      startTime: e,
      endTime: e + r * 60 * 1e3
    });
  },
  stopFocus: async () => {
    await te.set((r) => ({
      ...r,
      isActive: !1,
      startTime: void 0,
      endTime: void 0
    }));
  },
  getRemainingTime: async () => {
    const r = await te.get();
    if (!r.isActive || !r.endTime)
      return 0;
    const e = Math.max(0, r.endTime - Date.now());
    return Math.floor(e / 1e3);
  }
}, C = F("blocked-urls-storage-key", {
  urls: [],
  studyModeUrls: [],
  studyModeSelectors: {}
}, {
  storageEnum: U.Local,
  liveUpdate: !0
}), Be = async () => {
  try {
    const r = await C.get();
    (!r.studyModeUrls || !r.studyModeSelectors) && (console.log("Migrating blocked URLs storage structure..."), await C.set((e) => ({
      urls: e.urls || [],
      studyModeUrls: e.studyModeUrls || [],
      studyModeSelectors: e.studyModeSelectors || {}
    })), console.log("Blocked URLs storage migration complete."));
  } catch (r) {
    console.error("Error migrating blocked URLs storage:", r);
  }
};
Be();
const k = {
  ...C,
  addUrl: async (r) => {
    await C.set((e) => {
      if (e.urls.includes(r))
        return e;
      const t = e.studyModeUrls.filter((o) => o !== r);
      return {
        ...e,
        urls: [...e.urls, r],
        studyModeUrls: t
      };
    });
  },
  removeUrl: async (r) => {
    await C.set((e) => ({
      ...e,
      urls: e.urls.filter((t) => t !== r)
    }));
  },
  clearUrls: async () => {
    await C.set((r) => ({
      ...r,
      urls: []
    }));
  },
  addStudyModeUrl: async (r) => {
    await C.set((e) => {
      if (e.studyModeUrls.includes(r))
        return e;
      const t = e.urls.filter((o) => o !== r);
      return {
        ...e,
        studyModeUrls: [...e.studyModeUrls, r],
        urls: t
      };
    });
  },
  removeStudyModeUrl: async (r) => {
    await C.set((e) => ({
      ...e,
      studyModeUrls: e.studyModeUrls.filter((t) => t !== r)
    }));
  },
  toggleUrlMode: async (r, e) => {
    e ? await k.addStudyModeUrl(r) : await k.addUrl(r);
  },
  addStudyModeSelector: async (r, e) => {
    await C.set((t) => {
      const o = t.studyModeSelectors[r] || [];
      return o.includes(e) ? t : {
        ...t,
        studyModeSelectors: {
          ...t.studyModeSelectors,
          [r]: [...o, e]
        }
      };
    });
  },
  removeStudyModeSelector: async (r, e) => {
    await C.set((t) => {
      const o = t.studyModeSelectors[r] || [];
      return {
        ...t,
        studyModeSelectors: {
          ...t.studyModeSelectors,
          [r]: o.filter((i) => i !== e)
        }
      };
    });
  },
  clearStudyModeSelectors: async (r) => {
    await C.set((e) => {
      const { [r]: t, ...o } = e.studyModeSelectors;
      return {
        ...e,
        studyModeSelectors: o
      };
    });
  }
}, $ = F("notification-cache-storage-key", {
  isGenerating: !1
}, {
  storageEnum: U.Local,
  liveUpdate: !0
}), ne = {
  ...$,
  // 保存通知内容
  saveNotification: async (r, e = 60) => {
    const t = Date.now();
    await $.set({
      pendingNotification: r,
      generatedAt: t,
      expiresAt: t + e * 60 * 1e3,
      isGenerating: !1
    });
  },
  // 获取通知内容（如果有效）
  getNotification: async () => {
    const r = await $.get();
    return r.pendingNotification ? r.expiresAt && r.expiresAt < Date.now() ? (await ne.clearNotification(), null) : r.pendingNotification : null;
  },
  // 清除通知缓存
  clearNotification: async () => {
    await $.set((r) => ({
      ...r,
      pendingNotification: void 0,
      generatedAt: void 0,
      expiresAt: void 0,
      isGenerating: !1
    }));
  },
  // 设置生成状态
  setGenerating: async (r) => {
    await $.set((e) => ({
      ...e,
      isGenerating: r
    }));
  },
  // 检查是否正在生成中
  isGenerating: async () => (await $.get()).isGenerating
};
var pe;
(function(r) {
  r.DEEPSEEK = "deepseek", r.OPENAI = "openai";
})(pe || (pe = {}));
const Y = F("ai-config-storage-key", {
  enabled: !1,
  provider: pe.DEEPSEEK,
  model: "deepseek-chat",
  apiKey: "",
  preGenerateMinutes: 5
  // 默认提前5分钟生成
}, {
  storageEnum: U.Local,
  liveUpdate: !0
}), Z = {
  ...Y,
  // 启用/禁用AI生成
  enableAI: async (r) => {
    await Y.set((e) => ({
      ...e,
      enabled: r
    }));
  },
  // 更新API密钥
  updateAPIKey: async (r) => {
    await Y.set((e) => ({
      ...e,
      apiKey: r
    }));
  },
  // 更新AI提供商
  updateProvider: async (r, e, t) => {
    await Y.set((o) => ({
      ...o,
      provider: r,
      ...e ? { model: e } : {},
      ...t ? { apiEndpoint: t } : { apiEndpoint: void 0 }
    }));
  },
  // 更新提示词
  updatePrompts: async (r, e) => {
    await Y.set((t) => ({
      ...t,
      ...r !== void 0 ? { systemPrompt: r } : {},
      ...e !== void 0 ? { promptTemplate: e } : {}
    }));
  },
  // 更新预生成时间
  updatePreGenerateTime: async (r) => {
    await Y.set((e) => ({
      ...e,
      preGenerateMinutes: Math.max(1, Math.min(30, r))
      // 限制在1-30分钟之间
    }));
  }
}, me = F("sound-settings-storage-key", {
  enabled: !0,
  // 默认启用声音
  volume: 0.5
  // 默认音量50%
}, {
  storageEnum: U.Local,
  liveUpdate: !0
}), fe = {
  ...me,
  // 启用/禁用声音
  enableSound: async (r) => {
    await me.set((e) => ({
      ...e,
      enabled: r
    }));
  },
  // 设置音量
  setVolume: async (r) => {
    const e = Math.max(0, Math.min(1, r));
    await me.set((t) => ({
      ...t,
      volume: e
    }));
  }
}, Ae = F("tts-config-storage-key", {
  enabled: !1,
  appid: "",
  token: "",
  cluster: "volcano_tts",
  voiceType: "zh_female_linjianvhai_moon_bigtts",
  // 默认使用"邻家女孩"
  encoding: "mp3",
  speedRatio: 1,
  uid: "chrome_extension_user",
  defaultText: ""
  // 默认为空，将根据语音类型自动设置
}, {
  storageEnum: U.Local,
  liveUpdate: !0
}), G = {
  ...Ae,
  // 更新配置
  updateConfig: async (r) => {
    await Ae.set((e) => ({
      ...e,
      ...r
    }));
  },
  // 检查是否已配置
  isConfigured: async () => {
    const r = await Ae.get();
    return r.enabled && r.appid.length > 0 && r.token.length > 0;
  }
}, O = F("voice-cache-storage-key", {}, {
  storageEnum: U.Local,
  liveUpdate: !0
}), R = {
  ...O,
  // 缓存开始语音
  cacheStartVoice: async (r, e) => {
    await O.set((t) => ({
      ...t,
      startVoiceCache: {
        voiceType: r,
        audioData: e,
        cachedAt: Date.now()
      }
    })), console.log("Start voice cached for voiceType:", r);
  },
  // 获取开始语音缓存
  getStartVoice: async (r) => {
    const e = await O.get();
    if (!e.startVoiceCache)
      return null;
    if (e.startVoiceCache.voiceType !== r)
      return console.log("Start voice cache voiceType mismatch, clearing cache"), await R.clearStartVoice(), null;
    const t = Date.now() - e.startVoiceCache.cachedAt, o = 7 * 24 * 60 * 60 * 1e3;
    return t > o ? (console.log("Start voice cache expired, clearing cache"), await R.clearStartVoice(), null) : (console.log("Using cached start voice for voiceType:", r), e.startVoiceCache.audioData);
  },
  // 清除开始语音缓存
  clearStartVoice: async () => {
    await O.set((r) => ({
      ...r,
      startVoiceCache: void 0
    })), console.log("Start voice cache cleared");
  },
  // 缓存结束语音
  cacheEndVoice: async (r, e) => {
    await O.set((t) => ({
      ...t,
      endVoiceCache: {
        voiceType: r,
        audioData: e,
        cachedAt: Date.now()
      }
    })), console.log("End voice cached for voiceType:", r);
  },
  // 获取结束语音缓存
  getEndVoice: async (r) => {
    const e = await O.get();
    if (!e.endVoiceCache)
      return null;
    if (e.endVoiceCache.voiceType !== r)
      return console.log("End voice cache voiceType mismatch, clearing cache"), await R.clearEndVoice(), null;
    const t = Date.now() - e.endVoiceCache.cachedAt, o = 7 * 24 * 60 * 60 * 1e3;
    return t > o ? (console.log("End voice cache expired, clearing cache"), await R.clearEndVoice(), null) : (console.log("Using cached end voice for voiceType:", r), e.endVoiceCache.audioData);
  },
  // 清除结束语音缓存
  clearEndVoice: async () => {
    await O.set((r) => ({
      ...r,
      endVoiceCache: void 0
    })), console.log("End voice cache cleared");
  },
  // 清除所有语音缓存
  clearAllVoiceCache: async () => {
    await O.set({}), console.log("All voice cache cleared");
  },
  // 检查开始语音缓存是否有效
  isStartVoiceCacheValid: async (r) => await R.getStartVoice(r) !== null,
  // 检查结束语音缓存是否有效
  isEndVoiceCacheValid: async (r) => await R.getEndVoice(r) !== null
}, Ee = {
  OFFSCREEN_LOAD_DELAY: 200,
  // offscreen document加载延迟
  MESSAGE_TIMEOUT: 5e3,
  // 消息发送超时时间
  TIMER_CHECK_INTERVAL: 1e3
  // 定时器检查间隔
}, Pe = {
  API_URL: "https://openspeech.bytedance.com/api/v1/tts"
}, re = {
  DEFAULT_DURATION: 25,
  // 默认专注时间（分钟）
  MIN_DURATION: 1,
  MAX_DURATION: 120,
  BADGE_COLOR: "#E53935",
  BADGE_TEXT: "专注"
}, he = {
  DEFAULT_PRE_GENERATE_MINUTES: 5,
  MIN_PRE_GENERATE_MINUTES: 1,
  MAX_PRE_GENERATE_MINUTES: 30
}, ae = {
  PLAY_NOTIFICATION_SOUND: "PLAY_NOTIFICATION_SOUND",
  PLAY_TTS_SOUND: "PLAY_TTS_SOUND",
  TEST_TTS: "TEST_TTS",
  PING_POPUP: "PING_POPUP",
  PONG_POPUP: "PONG_POPUP",
  CHARACTER_SEND_MESSAGE: "CHARACTER_SEND_MESSAGE",
  CHARACTER_GET_STATE: "CHARACTER_GET_STATE",
  CHARACTER_TOGGLE_CHAT: "CHARACTER_TOGGLE_CHAT"
}, ve = {
  FOCUS_START: "focus-start",
  FOCUS_END: "focus-end"
}, oe = {
  TTS_NOT_CONFIGURED: "TTS未启用或未配置",
  TTS_GENERATION_FAILED: "语音生成失败",
  SOUND_DISABLED: "声音已禁用",
  MESSAGE_TIMEOUT: "消息发送超时",
  OFFSCREEN_NOT_FOUND: "Offscreen document未找到",
  AUDIO_PLAY_FAILED: "音频播放失败"
};
var I;
(function(r) {
  r.ZH_FEMALE_LINJIANVHAI = "zh_female_linjianvhai_moon_bigtts", r.ZH_FEMALE_YUANQINVYOU = "zh_female_yuanqinvyou_moon_bigtts", r.ZH_FEMALE_GAOLENGYUJIE = "zh_female_gaolengyujie_moon_bigtts", r.ZH_FEMALE_TIANMEIXIAOYUAN = "zh_female_tianmeixiaoyuan_moon_bigtts", r.ZH_FEMALE_KAILANGJIEJIE = "zh_female_kailangjiejie_moon_bigtts", r.MULTI_FEMALE_SHUANGKUAISISI = "multi_female_shuangkuaisisi_moon_bigtts", r.MULTI_FEMALE_GAOLENGYUJIE = "multi_female_gaolengyujie_moon_bigtts";
})(I || (I = {}));
const D = {
  CHINESE: "呀~ 看你专注的样子，眼睛亮亮的，真的超有魅力呢！这股认真劲儿，一定能收获满满！加油哦，我就悄悄在旁边陪你一起，专注冲鸭！",
  JAPANESE: "いやー、集中しているところを見ると、目がキラキラしていて、超魅力的ですよね!この本気さ、きっと手に入ります!頑張って、私はそっとそばであなたに付き添って一緒に、集中してアヒルを沖ます!愛してますよ",
  FALLBACK: "专注模式已启动，加油保持专注！"
}, He = [
  {
    value: I.ZH_FEMALE_LINJIANVHAI,
    label: "领家女孩",
    defaultText: D.CHINESE
  },
  {
    value: I.ZH_FEMALE_YUANQINVYOU,
    label: "撒娇学妹",
    defaultText: D.CHINESE
  },
  {
    value: I.ZH_FEMALE_GAOLENGYUJIE,
    label: "高冷御姐",
    defaultText: D.CHINESE
  },
  {
    value: I.MULTI_FEMALE_SHUANGKUAISISI,
    label: "はるこ",
    defaultText: D.JAPANESE
  },
  {
    value: I.MULTI_FEMALE_GAOLENGYUJIE,
    label: "あけみ",
    defaultText: D.JAPANESE
  },
  {
    value: I.ZH_FEMALE_TIANMEIXIAOYUAN,
    label: "甜美小源",
    defaultText: D.CHINESE
  },
  {
    value: I.ZH_FEMALE_KAILANGJIEJIE,
    label: "开朗姐姐",
    defaultText: D.CHINESE
  }
];
function _e(r) {
  const e = He.find((t) => t.value === r);
  return (e == null ? void 0 : e.defaultText) || D.FALLBACK;
}
function Ge(r) {
  return r.includes("专注模式已启动") || r.includes("开始专注") || r.includes("加油，保持专注") || r.includes("看你专注的样子") || r.includes("集中しているところを見ると") || r.includes("专注冲鸭") || r.includes("集中してアヒルを沖ます");
}
class ie {
  /**
   * 获取开始语音文本
   * 优先使用用户自定义文本，否则使用语音类型的默认文本
   */
  static getStartVoiceText(e) {
    return e.defaultText && e.defaultText.trim() ? e.defaultText : _e(e.voiceType);
  }
  /**
   * 检查是否为开始语音文本（可缓存的文本）
   */
  static isStartVoiceText(e) {
    return Ge(e);
  }
  /**
   * 获取显示用的默认文本（用于UI显示）
   * 用户自定义文本 > 语音类型默认文本
   */
  static getDisplayDefaultText(e) {
    return e.defaultText || _e(e.voiceType);
  }
  /**
   * 验证TTS配置是否完整
   */
  static isConfigValid(e) {
    return e.enabled && e.appid.trim().length > 0 && e.token.trim().length > 0;
  }
  /**
   * 生成测试文本
   */
  static getTestText(e) {
    return ie.getDisplayDefaultText(e);
  }
}
const Q = class Q {
  /**
   * 生成语音并返回base64音频数据
   */
  static async generateSpeech(e) {
    var t;
    try {
      const o = await G.get();
      if (!o.enabled)
        return console.log("TTS is disabled"), null;
      if (!o.appid || !o.token)
        return console.error("TTS configuration is incomplete"), null;
      const i = `chrome_ext_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`, a = {
        app: {
          appid: o.appid,
          cluster: o.cluster
        },
        user: {
          uid: o.uid
        },
        audio: {
          voice_type: o.voiceType,
          encoding: o.encoding,
          speed_ratio: o.speedRatio
        },
        request: {
          reqid: i,
          text: e,
          operation: "query"
        }
      };
      console.log("Sending TTS request:", { reqid: i, text: e });
      const c = await fetch(Q.API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer; ${o.token}`
        },
        body: JSON.stringify(a)
      });
      if (!c.ok)
        throw new Error(`HTTP error! status: ${c.status}`);
      const n = await c.json();
      if (n.code !== 3e3)
        throw new Error(`TTS API error: ${n.message} (code: ${n.code})`);
      if (!n.data)
        throw new Error("No audio data received from TTS API");
      return console.log("TTS generation successful:", {
        reqid: n.reqid,
        duration: (t = n.addition) == null ? void 0 : t.duration,
        dataLength: n.data.length
      }), n.data;
    } catch (o) {
      return console.error("Error generating speech:", o), null;
    }
  }
  /**
   * 测试TTS配置是否有效
   */
  static async testConfiguration() {
    try {
      return await Q.generateSpeech("测试语音合成") !== null;
    } catch (e) {
      return console.error("TTS configuration test failed:", e), !1;
    }
  }
};
H(Q, "API_URL", Pe.API_URL);
let X = Q;
const V = class V {
  constructor() {
  }
  static getInstance() {
    return V.instance || (V.instance = new V()), V.instance;
  }
  /**
   * 播放TTS语音通知
   */
  async playTTSNotification(e) {
    try {
      const t = await G.get();
      if (!t.enabled || !await G.isConfigured())
        return console.log("TTS not enabled or not configured, falling back to normal sound"), await this.playNotificationSound();
      const o = await fe.get();
      if (!o.enabled) {
        console.log("Notification sound is disabled");
        return;
      }
      console.log("Generating TTS for text:", e);
      const i = ie.isStartVoiceText(e);
      let a = null;
      if (i)
        if (a = await R.getStartVoice(t.voiceType), a)
          console.log("Using cached start voice for voiceType:", t.voiceType);
        else {
          console.log("No cached start voice found, generating new one");
          const n = ie.getStartVoiceText(t);
          a = await X.generateSpeech(n), a && (await R.cacheStartVoice(t.voiceType, a), console.log("Start voice generated and cached for voiceType:", t.voiceType));
        }
      else
        a = await X.generateSpeech(e);
      if (!a)
        return console.log("TTS generation failed, falling back to normal sound"), await this.playNotificationSound();
      await this.ensureOffscreenDocument();
      const c = await chrome.runtime.sendMessage({
        type: ae.PLAY_TTS_SOUND,
        volume: o.volume,
        audioData: a
      });
      c && c.success ? console.log("TTS notification played successfully with volume:", o.volume) : (console.error("Failed to play TTS notification:", c == null ? void 0 : c.error), await this.playNotificationSound());
    } catch (t) {
      console.error("Error playing TTS notification:", t), await this.playNotificationSound();
    }
  }
  /**
   * 播放普通通知音效
   */
  async playNotificationSound() {
    try {
      const e = await fe.get();
      if (!e.enabled) {
        console.log("Notification sound is disabled");
        return;
      }
      await this.ensureOffscreenDocument();
      const t = await chrome.runtime.sendMessage({
        type: ae.PLAY_NOTIFICATION_SOUND,
        volume: e.volume,
        audioUrl: chrome.runtime.getURL("notification.mp3")
      });
      t && t.success ? console.log("Notification sound played successfully with volume:", e.volume) : console.error("Failed to play notification sound:", t == null ? void 0 : t.error);
    } catch (e) {
      console.error("Error playing notification sound:", e);
    }
  }
  /**
   * 测试TTS功能
   * 修复Bug: 确保使用当前配置的语音类型进行测试
   */
  async testTTS(e, t) {
    try {
      let o = await G.get();
      if (t && (o = { ...o, ...t }, console.log("Using test config:", t)), !o.enabled || !o.appid || !o.token)
        return { success: !1, error: oe.TTS_NOT_CONFIGURED };
      console.log("Testing TTS with config:", {
        voiceType: o.voiceType,
        text: e,
        speedRatio: o.speedRatio,
        appid: o.appid ? "***" : "missing",
        token: o.token ? "***" : "missing"
      }), t && await G.set(o);
      const i = await X.generateSpeech(e);
      if (t) {
        const c = await G.get();
        await G.set({ ...c, ...t });
      }
      if (!i)
        return { success: !1, error: oe.TTS_GENERATION_FAILED };
      const a = await fe.get();
      if (!a.enabled)
        return { success: !1, error: oe.SOUND_DISABLED };
      await this.ensureOffscreenDocument(), await new Promise((c) => setTimeout(c, Ee.OFFSCREEN_LOAD_DELAY));
      try {
        const n = await new Promise((f, s) => {
          const l = setTimeout(() => {
            s(new Error(oe.MESSAGE_TIMEOUT));
          }, Ee.MESSAGE_TIMEOUT);
          chrome.runtime.sendMessage(
            {
              type: ae.PLAY_TTS_SOUND,
              volume: a.volume,
              audioData: i
            },
            (A) => {
              clearTimeout(l), chrome.runtime.lastError ? s(new Error(chrome.runtime.lastError.message)) : f(A);
            }
          );
        });
        return n && n.success ? { success: !0 } : { success: !1, error: (n == null ? void 0 : n.error) || "播放失败" };
      } catch (c) {
        return console.error("Message sending error:", c), { success: !1, error: "无法与音频播放器通信: " + c.message };
      }
    } catch (o) {
      return console.error("TTS test error:", o), { success: !1, error: o.message };
    }
  }
  /**
   * 清除语音缓存（当voiceType改变时调用）
   */
  async clearVoiceCacheOnVoiceTypeChange(e, t) {
    e !== t && (console.log("VoiceType changed from", e, "to", t, ", clearing voice cache"), await R.clearAllVoiceCache());
  }
  /**
   * 确保offscreen document存在
   */
  async ensureOffscreenDocument() {
    try {
      try {
        if ((await chrome.runtime.getContexts({
          contextTypes: [chrome.runtime.ContextType.OFFSCREEN_DOCUMENT],
          documentUrls: [chrome.runtime.getURL("offscreen.html")]
        })).length > 0)
          return;
      } catch {
        console.log("getContexts not available, proceeding to create offscreen document");
      }
      await chrome.offscreen.createDocument({
        url: chrome.runtime.getURL("offscreen.html"),
        reasons: [chrome.offscreen.Reason.AUDIO_PLAYBACK],
        justification: "Playing notification sounds for focus timer"
      }), console.log("Offscreen document created for audio playback");
    } catch (e) {
      console.error("Error creating offscreen document:", e);
    }
  }
};
H(V, "instance");
let ee = V;
const Me = [
  "休息一下吧！你已经专注工作了一段时间。",
  "该活动一下了！站起来伸展一下身体吧。",
  "休息是为了更好的工作，现在是放松的时候了。",
  "你的大脑需要休息，去喝杯水吧！",
  "专注时间结束，给自己一个小奖励吧！",
  "太棒了！你完成了一个专注周期，现在享受一下休息时光。",
  "记得休息是工作的一部分，现在放松一下吧。",
  "眨眨眼睛，活动一下，让身体放松一下吧！",
  "专注时间已结束，深呼吸，放松一下。",
  "恭喜完成专注时间！现在是休息和恢复的时候了。"
];
function Ve() {
  const r = Math.floor(Math.random() * Me.length);
  return Me[r];
}
const z = class z {
  constructor() {
  }
  static getInstance() {
    return z.instance || (z.instance = new z()), z.instance;
  }
  /**
   * 获取专注结束通知消息
   */
  async getEndNotification() {
    try {
      if (!(await Z.get()).enabled)
        return this.getDefaultEndMessage();
      const t = await ne.getNotification();
      return t ? (console.log("Using cached AI notification"), t) : await this.generateAINotification();
    } catch (e) {
      return console.error("Error getting end notification:", e), this.getDefaultEndMessage();
    }
  }
  /**
   * 预生成AI通知
   */
  async preGenerateNotification(e) {
    try {
      if (!(await Z.get()).enabled)
        return;
      const o = Math.max(
        he.MIN_PRE_GENERATE_MINUTES,
        Math.min(he.MAX_PRE_GENERATE_MINUTES, e - he.DEFAULT_PRE_GENERATE_MINUTES)
      );
      setTimeout(
        async () => {
          try {
            await this.generateAINotification(), console.log("AI notification pre-generated successfully");
          } catch (i) {
            console.error("Error pre-generating AI notification:", i);
          }
        },
        o * 60 * 1e3
      );
    } catch (t) {
      console.error("Error setting up notification pre-generation:", t);
    }
  }
  /**
   * 生成AI通知
   */
  async generateAINotification() {
    try {
      const e = await Z.get();
      if (!e.apiKey || !e.provider)
        return console.log("AI configuration incomplete, using default message"), this.getDefaultEndMessage();
      const t = await this.buildNotificationPrompt(), o = await this.callAIService(e, t);
      return o ? (await ne.saveNotification(o), console.log("AI notification generated and cached"), o) : this.getDefaultEndMessage();
    } catch (e) {
      return console.error("Error generating AI notification:", e), this.getDefaultEndMessage();
    }
  }
  /**
   * 构建AI提示词
   */
  async buildNotificationPrompt() {
    const e = (/* @__PURE__ */ new Date()).toLocaleTimeString("zh-CN", {
      hour: "2-digit",
      minute: "2-digit"
    }), o = (await L.get()).duration;
    return ((await Z.get()).promptTemplate || `现在是${e}，用户刚刚完成了{duration}分钟的专注时间段。请生成一条温暖、鼓励的休息提醒，内容要：
1. 简洁明了（不超过50字）
2. 积极正面，给用户成就感
3. 建议适当的休息活动
4. 语气亲切自然, 邻家女孩口吻或可爱学妹口吻, 带有情感色彩

请直接返回通知内容，不要包含其他解释。`).replace("{duration}", o.toString());
  }
  /**
   * 调用AI服务
   */
  async callAIService(e, t) {
    try {
      const o = this.getAPIEndpoint(e.provider), i = this.prepareRequestBody(e, t), a = new AbortController(), c = setTimeout(() => a.abort(), 1e4), n = await fetch(o, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${e.apiKey}`
        },
        body: JSON.stringify(i),
        signal: a.signal
      });
      if (clearTimeout(c), !n.ok)
        throw new Error(`AI API error: ${n.status} ${n.statusText}`);
      const l = (await n.json()).choices[0].message.content.trim().replace(/^["']|["']$/g, "").replace(/\n+/g, " ").trim();
      return l.length > 100 ? l.substring(0, 97) + "..." : l;
    } catch (o) {
      return console.error("Error calling AI service:", o), null;
    }
  }
  /**
   * 获取API端点
   */
  getAPIEndpoint(e) {
    const t = {
      deepseek: "https://api.deepseek.com/v1/chat/completions",
      openai: "https://api.openai.com/v1/chat/completions"
    };
    return t[e] || t.deepseek;
  }
  /**
   * 准备请求体
   */
  prepareRequestBody(e, t) {
    const i = e.systemPrompt || `你是一个友好、积极的助手，负责在用户专注工作一段时间后提醒他们休息。
你的消息应该：
1. 简短（不超过50个字）
2. 友好且鼓励性的
3. 有时可以幽默或有趣
4. 提醒用户休息的重要性
5. 偶尔可以建议简单的伸展运动或放松技巧
6. 语气亲切自然, 邻家女孩口吻或可爱学妹口吻, 带有情感色彩
7. 不要重复相同的内容
8. 不要使用过于正式或机械的语言
 `;
    return {
      model: e.model || "deepseek-chat",
      messages: [
        { role: "system", content: i },
        { role: "user", content: t }
      ],
      temperature: 0.8,
      max_tokens: 100
    };
  }
  /**
   * 获取默认结束消息
   */
  getDefaultEndMessage() {
    return Ve();
  }
  /**
   * 清除通知缓存
   */
  async clearNotificationCache() {
    try {
      await ne.clearNotification(), console.log("Notification cache cleared");
    } catch (e) {
      console.error("Error clearing notification cache:", e);
    }
  }
};
H(z, "instance");
let ce = z;
const ze = {
  domain: "bilibili.com",
  getSelectors() {
    return ["#nav-searchform", ".center-search__bar"];
  },
  getCustomHandler(r) {
    return function(e) {
      const t = "已为您屏蔽搜索功能，专注于观看学习内容", o = "rgba(255, 105, 180, 0.8)";
      try {
        let i = function(c, n) {
          if (document.querySelector('[data-focus-reminder="true"]')) {
            console.log("🎯 [Site Handler] Focus reminder already exists");
            return;
          }
          const s = document.createElement("div");
          s.setAttribute("data-focus-reminder", "true"), s.style.position = "fixed", s.style.top = "70px", s.style.right = "10px", s.style.backgroundColor = n, s.style.color = "white", s.style.padding = "12px 16px", s.style.borderRadius = "8px", s.style.zIndex = "9999999", s.style.fontSize = "14px", s.style.fontFamily = "Arial, sans-serif", s.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.2)", s.style.width = "200px", s.style.textAlign = "center";
          const l = document.createElement("div");
          l.textContent = "专注提醒", l.style.fontWeight = "bold", l.style.fontSize = "16px", l.style.marginBottom = "8px", s.appendChild(l);
          const A = document.createElement("div");
          A.textContent = c, s.appendChild(A), document.body.appendChild(s), console.log("🎯 [Site Handler] Focus reminder card created"), setTimeout(() => {
            s.style.transition = "opacity 1s", s.style.opacity = "0", setTimeout(() => {
              document.body.contains(s) && document.body.removeChild(s);
            }, 1e3);
          }, 3e3);
        }, a = function(c) {
          c.forEach((f) => {
            try {
              const s = document.querySelectorAll(f);
              s.forEach((l) => {
                l instanceof HTMLElement && (l.style.display = "none", l.dataset.studyModeDisabled = "true");
              }), console.log("🎯 [Site Handler] Disabled " + s.length + " elements with selector: " + f);
            } catch (s) {
              console.error("🚨 [Site Handler] Error with selector " + f + ":", s);
            }
          });
          const n = new MutationObserver((f) => {
            let s = !1;
            f.forEach((l) => {
              l.type === "childList" && l.addedNodes.length > 0 && (s = !0);
            }), s && c.forEach((l) => {
              try {
                document.querySelectorAll(l).forEach((y) => {
                  y instanceof HTMLElement && !y.dataset.studyModeDisabled && (y.style.display = "none", y.dataset.studyModeDisabled = "true");
                });
              } catch (A) {
                console.error("🚨 [Site Handler] Mutation observer error:", A);
              }
            });
          });
          n.observe(document.documentElement, {
            childList: !0,
            subtree: !0
          }), window.__studyModeObserver = n;
        };
        console.log("🎯 [Site Handler] Script execution started!"), console.log("🎯 [Site Handler] Message:", t), console.log("🎯 [Site Handler] Background color:", o), i(t, o), a(e), console.log("🎯 [Site Handler] Script execution completed successfully!");
      } catch (i) {
        console.error("🚨 [Site Handler] Error in script execution:", i);
        try {
          e.forEach((a) => {
            document.querySelectorAll(a).forEach((n) => {
              n instanceof HTMLElement && (n.style.display = "none");
            });
          }), console.log("🎯 [Site Handler] Fallback CSS hiding applied");
        } catch (a) {
          console.error("🚨 [Site Handler] Fallback also failed:", a);
        }
      }
    };
  }
}, je = {
  domain: "baidu.com",
  getSelectors() {
    return ["#s-hotsearch-wrapper", "#con-ceiling-wrapper"];
  },
  getCustomHandler(r) {
    return function(e) {
      const t = "已为您屏蔽热搜和顶部导航，专注于当前任务", o = "rgba(0, 128, 0, 0.8)";
      try {
        let i = function(c, n) {
          if (document.querySelector('[data-focus-reminder="true"]')) {
            console.log("🎯 [Site Handler] Focus reminder already exists");
            return;
          }
          const s = document.createElement("div");
          s.setAttribute("data-focus-reminder", "true"), s.style.position = "fixed", s.style.top = "70px", s.style.right = "10px", s.style.backgroundColor = n, s.style.color = "white", s.style.padding = "12px 16px", s.style.borderRadius = "8px", s.style.zIndex = "9999999", s.style.fontSize = "14px", s.style.fontFamily = "Arial, sans-serif", s.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.2)", s.style.width = "200px", s.style.textAlign = "center";
          const l = document.createElement("div");
          l.textContent = "专注提醒", l.style.fontWeight = "bold", l.style.fontSize = "16px", l.style.marginBottom = "8px", s.appendChild(l);
          const A = document.createElement("div");
          A.textContent = c, s.appendChild(A), document.body.appendChild(s), console.log("🎯 [Site Handler] Focus reminder card created"), setTimeout(() => {
            s.style.transition = "opacity 1s", s.style.opacity = "0", setTimeout(() => {
              document.body.contains(s) && document.body.removeChild(s);
            }, 1e3);
          }, 3e3);
        }, a = function(c) {
          c.forEach((f) => {
            try {
              const s = document.querySelectorAll(f);
              s.forEach((l) => {
                l instanceof HTMLElement && (l.style.display = "none", l.dataset.studyModeDisabled = "true");
              }), console.log("🎯 [Site Handler] Disabled " + s.length + " elements with selector: " + f);
            } catch (s) {
              console.error("🚨 [Site Handler] Error with selector " + f + ":", s);
            }
          });
          const n = new MutationObserver((f) => {
            let s = !1;
            f.forEach((l) => {
              l.type === "childList" && l.addedNodes.length > 0 && (s = !0);
            }), s && c.forEach((l) => {
              try {
                document.querySelectorAll(l).forEach((y) => {
                  y instanceof HTMLElement && !y.dataset.studyModeDisabled && (y.style.display = "none", y.dataset.studyModeDisabled = "true");
                });
              } catch (A) {
                console.error("🚨 [Site Handler] Mutation observer error:", A);
              }
            });
          });
          n.observe(document.documentElement, {
            childList: !0,
            subtree: !0
          }), window.__studyModeObserver = n;
        };
        console.log("🎯 [Site Handler] Script execution started!"), console.log("🎯 [Site Handler] Message:", t), console.log("🎯 [Site Handler] Background color:", o), i(t, o), a(e), console.log("🎯 [Site Handler] Script execution completed successfully!");
      } catch (i) {
        console.error("🚨 [Site Handler] Error in script execution:", i);
        try {
          e.forEach((a) => {
            document.querySelectorAll(a).forEach((n) => {
              n instanceof HTMLElement && (n.style.display = "none");
            });
          }), console.log("🎯 [Site Handler] Fallback CSS hiding applied");
        } catch (a) {
          console.error("🚨 [Site Handler] Fallback also failed:", a);
        }
      }
    };
  }
}, We = {
  domain: "zhihu.com",
  getSelectors() {
    return [".Topstory"];
  },
  getCustomHandler(r) {
    return function(e) {
      const t = "已为您屏蔽热门话题推荐，专注于学习和阅读", o = "rgba(0, 123, 255, 0.8)";
      try {
        let i = function(c, n) {
          if (document.querySelector('[data-focus-reminder="true"]')) {
            console.log("🎯 [Site Handler] Focus reminder already exists");
            return;
          }
          const s = document.createElement("div");
          s.setAttribute("data-focus-reminder", "true"), s.style.position = "fixed", s.style.top = "70px", s.style.right = "10px", s.style.backgroundColor = n, s.style.color = "white", s.style.padding = "12px 16px", s.style.borderRadius = "8px", s.style.zIndex = "9999999", s.style.fontSize = "14px", s.style.fontFamily = "Arial, sans-serif", s.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.2)", s.style.width = "200px", s.style.textAlign = "center";
          const l = document.createElement("div");
          l.textContent = "专注提醒", l.style.fontWeight = "bold", l.style.fontSize = "16px", l.style.marginBottom = "8px", s.appendChild(l);
          const A = document.createElement("div");
          A.textContent = c, s.appendChild(A), document.body.appendChild(s), console.log("🎯 [Site Handler] Focus reminder card created"), setTimeout(() => {
            s.style.transition = "opacity 1s", s.style.opacity = "0", setTimeout(() => {
              document.body.contains(s) && document.body.removeChild(s);
            }, 1e3);
          }, 3e3);
        }, a = function(c) {
          c.forEach((f) => {
            try {
              const s = document.querySelectorAll(f);
              s.forEach((l) => {
                l instanceof HTMLElement && (l.style.display = "none", l.dataset.studyModeDisabled = "true");
              }), console.log("🎯 [Site Handler] Disabled " + s.length + " elements with selector: " + f);
            } catch (s) {
              console.error("🚨 [Site Handler] Error with selector " + f + ":", s);
            }
          });
          const n = new MutationObserver((f) => {
            let s = !1;
            f.forEach((l) => {
              l.type === "childList" && l.addedNodes.length > 0 && (s = !0);
            }), s && c.forEach((l) => {
              try {
                document.querySelectorAll(l).forEach((y) => {
                  y instanceof HTMLElement && !y.dataset.studyModeDisabled && (y.style.display = "none", y.dataset.studyModeDisabled = "true");
                });
              } catch (A) {
                console.error("🚨 [Site Handler] Mutation observer error:", A);
              }
            });
          });
          n.observe(document.documentElement, {
            childList: !0,
            subtree: !0
          }), window.__studyModeObserver = n;
        };
        console.log("🎯 [Site Handler] Script execution started!"), console.log("🎯 [Site Handler] Message:", t), console.log("🎯 [Site Handler] Background color:", o), i(t, o), a(e), console.log("🎯 [Site Handler] Script execution completed successfully!");
      } catch (i) {
        console.error("🚨 [Site Handler] Error in script execution:", i);
        try {
          e.forEach((a) => {
            document.querySelectorAll(a).forEach((n) => {
              n instanceof HTMLElement && (n.style.display = "none");
            });
          }), console.log("🎯 [Site Handler] Fallback CSS hiding applied");
        } catch (a) {
          console.error("🚨 [Site Handler] Fallback also failed:", a);
        }
      }
    };
  }
}, Ne = [ze, je, We];
function qe(r) {
  try {
    const t = new URL(r).hostname;
    console.log("getSiteHandler: Checking URL:", r), console.log("getSiteHandler: Hostname:", t);
    const o = Ne.find((i) => !!(t === i.domain || t.endsWith("." + i.domain) || (t.startsWith("www.") ? t.substring(4) : t) === i.domain));
    return console.log("getSiteHandler: Found handler:", (o == null ? void 0 : o.domain) || "none"), o;
  } catch (e) {
    console.error("getSiteHandler: Error:", e);
    return;
  }
}
const j = class j {
  constructor() {
  }
  static getInstance() {
    return j.instance || (j.instance = new j()), j.instance;
  }
  /**
   * 检查并处理标签页URL
   */
  async checkTabUrl(e, t) {
    try {
      console.log("UrlBlocker: Checking tab URL:", t);
      const o = await L.get();
      if (console.log("UrlBlocker: Focus config:", o), !o.isActive) {
        console.log("UrlBlocker: Focus mode not active, skipping URL check");
        return;
      }
      const i = await k.get();
      console.log("UrlBlocker: Blocked config:", i);
      const a = this.isUrlBlocked(t, i.urls);
      if (console.log("UrlBlocker: Is blocked?", a), a) {
        console.log("UrlBlocker: Blocking URL:", t), await this.showBlockedWarning(e, t);
        return;
      }
      const c = this.isUrlBlocked(t, i.studyModeUrls);
      if (console.log("UrlBlocker: Is study mode?", c), c) {
        console.log("UrlBlocker: Applying study mode to URL:", t), await this.handleStudyModeUrl(e, t, i.studyModeSelectors);
        return;
      }
      console.log("UrlBlocker: URL is allowed:", t);
    } catch (o) {
      console.error("Error checking tab URL:", o);
    }
  }
  /**
   * 检查URL是否被阻止
   */
  isUrlBlocked(e, t) {
    try {
      const i = new URL(e).hostname;
      console.log("UrlBlocker: Checking URL:", e), console.log("UrlBlocker: Domain:", i), console.log("UrlBlocker: Blocked URLs list:", t);
      const a = t.some((c) => {
        let n = c.trim();
        if (n.startsWith("http://") || n.startsWith("https://"))
          try {
            n = new URL(n).hostname;
          } catch {
            n = n.replace(/^https?:\/\//, "").split("/")[0];
          }
        if (console.log("UrlBlocker: Comparing with cleaned URL:", n), n.startsWith("*.")) {
          const v = n.substring(2), B = i.endsWith(v);
          return console.log("UrlBlocker: Wildcard match result:", B), B;
        }
        if (c.includes("/") && !c.startsWith("http")) {
          const v = e.includes(c);
          return console.log("UrlBlocker: Full URL match result:", v), v;
        }
        const f = i === n, s = i.endsWith("." + n), l = n.endsWith("." + i), A = i.startsWith("www.") ? i.substring(4) : i, y = n.startsWith("www.") ? n.substring(4) : n, M = A === y, N = f || s || l || M;
        return console.log("UrlBlocker: Domain match result:", {
          domain: i,
          cleanBlockedUrl: n,
          domainWithoutWww: A,
          cleanBlockedUrlWithoutWww: y,
          exactMatch: f,
          subdomainMatch: s,
          parentDomainMatch: l,
          wwwMatch: M,
          finalResult: N
        }), N;
      });
      return console.log("UrlBlocker: Final blocking result:", a), a;
    } catch (o) {
      return console.error("Error checking if URL is blocked:", o), !1;
    }
  }
  /**
   * 显示阻止警告页面
   */
  async showBlockedWarning(e, t) {
    try {
      const o = chrome.runtime.getURL("blocked.html") + "?url=" + encodeURIComponent(t);
      await chrome.tabs.update(e, { url: o }), console.log("Blocked URL redirected to warning page:", t);
    } catch (o) {
      console.error("Error showing blocked warning:", o);
    }
  }
  /**
   * 处理学习模式URL
   */
  async handleStudyModeUrl(e, t, o) {
    try {
      const a = new URL(t).hostname;
      console.log("UrlBlocker: Handling study mode for URL:", t), console.log("UrlBlocker: Domain:", a);
      const c = qe(t);
      if (c) {
        console.log("UrlBlocker: Found predefined site handler for domain:", c.domain), await this.applySiteHandler(e, c);
        return;
      }
      console.log("UrlBlocker: No predefined site handler found, checking user selectors");
      const n = o[a] || [];
      if (console.log("UrlBlocker: User selectors for domain:", a, n), n.length === 0) {
        console.log("UrlBlocker: No selectors configured for study mode URL:", t);
        return;
      }
      await this.injectHideElements(e, n), console.log("UrlBlocker: Study mode applied to:", t, "with selectors:", n);
    } catch (i) {
      console.error("Error handling study mode URL:", i);
    }
  }
  /**
   * 注入CSS隐藏元素
   */
  async injectHideElements(e, t) {
    try {
      const o = t.map((i) => `${i} { display: none !important; }`).join(`
`);
      await chrome.scripting.insertCSS({
        target: { tabId: e },
        css: o
      }), console.log("CSS injected to hide elements:", t);
    } catch (o) {
      console.error("Error injecting CSS:", o);
    }
  }
  /**
   * 应用网站特定处理器
   */
  async applySiteHandler(e, t) {
    try {
      const o = t.getSelectors(), i = await chrome.tabs.get(e);
      if (console.log("UrlBlocker: Tab status before injection:", {
        tabId: e,
        status: i.status,
        url: i.url,
        domain: t.domain
      }), i.status === "loading" && (console.log("UrlBlocker: Page is loading, waiting..."), await new Promise((a) => setTimeout(a, 1e3))), t.getCustomHandler) {
        const a = t.getCustomHandler(e);
        console.log("UrlBlocker: Executing custom handler for:", e, t.domain, o);
        try {
          const c = await chrome.scripting.executeScript({
            target: { tabId: e },
            func: a,
            args: [o]
          });
          console.log("UrlBlocker: Script injection result:", c), console.log("UrlBlocker: Applied custom site handler for:", t.domain);
        } catch (c) {
          console.error("UrlBlocker: Script injection failed:", c), console.log("UrlBlocker: Falling back to CSS injection"), await this.injectHideElements(e, o);
        }
      } else
        await this.injectHideElements(e, o), console.log("UrlBlocker: Applied default site handler for:", t.domain);
    } catch (o) {
      console.error("Error applying site handler:", o);
    }
  }
  /**
   * 添加阻止的URL
   */
  async addBlockedUrl(e) {
    try {
      await k.addUrl(e), console.log("URL added to blocked list:", e);
    } catch (t) {
      throw console.error("Error adding blocked URL:", t), t;
    }
  }
  /**
   * 移除阻止的URL
   */
  async removeBlockedUrl(e) {
    try {
      await k.removeUrl(e), console.log("URL removed from blocked list:", e);
    } catch (t) {
      throw console.error("Error removing blocked URL:", t), t;
    }
  }
  /**
   * 添加学习模式URL
   */
  async addStudyModeUrl(e) {
    try {
      await k.addStudyModeUrl(e), console.log("URL added to study mode list:", e);
    } catch (t) {
      throw console.error("Error adding study mode URL:", t), t;
    }
  }
  /**
   * 移除学习模式URL
   */
  async removeStudyModeUrl(e) {
    try {
      await k.removeStudyModeUrl(e), console.log("URL removed from study mode list:", e);
    } catch (t) {
      throw console.error("Error removing study mode URL:", t), t;
    }
  }
  /**
   * 获取阻止的URL列表
   */
  async getBlockedUrls() {
    try {
      const e = await k.get();
      return {
        urls: e.urls,
        studyModeUrls: e.studyModeUrls
      };
    } catch (e) {
      return console.error("Error getting blocked URLs:", e), { urls: [], studyModeUrls: [] };
    }
  }
  /**
   * 初始化预设网站处理器
   * 自动将有预设处理器的网站添加到学习模式列表
   */
  async initializePredefinedSites() {
    try {
      const e = await k.get();
      console.log("UrlBlocker: Current config before initialization:", e);
      let t = !1;
      for (const i of Ne) {
        const a = i.domain;
        e.studyModeUrls.includes(a) ? console.log("UrlBlocker: Predefined site already in study mode:", a) : (e.studyModeUrls.push(a), t = !0, console.log("UrlBlocker: Added predefined site to study mode:", a));
      }
      t ? (await k.set(e), console.log("UrlBlocker: Predefined sites initialized")) : console.log("UrlBlocker: No changes needed, all predefined sites already configured");
      const o = await k.get();
      console.log("UrlBlocker: Final config after initialization:", o);
    } catch (e) {
      console.error("Error initializing predefined sites:", e);
    }
  }
};
H(j, "instance");
let le = j;
const W = class W {
  constructor() {
    H(this, "timerInterval", null);
  }
  static getInstance() {
    return W.instance || (W.instance = new W()), W.instance;
  }
  /**
   * 启动专注模式
   */
  async startFocus(e) {
    try {
      await L.startFocus(e);
      const t = `专注模式已启动，专注时间：${e}分钟。加油，保持专注！`;
      chrome.notifications.create(ve.FOCUS_START, {
        type: "basic",
        iconUrl: chrome.runtime.getURL("spring-128.png"),
        title: "专注模式已启动",
        message: `专注时间：${e}分钟`
      }), await ee.getInstance().playTTSNotification(t), chrome.action.setBadgeText({ text: re.BADGE_TEXT }), chrome.action.setBadgeBackgroundColor({ color: re.BADGE_COLOR }), this.startTimerCheck(), await this.preGenerateNotification(e), await this.checkAllOpenTabs(), console.log(`Focus mode started for ${e} minutes`);
    } catch (t) {
      throw console.error("Error starting focus mode:", t), t;
    }
  }
  /**
   * 停止专注模式
   */
  async stopFocus() {
    try {
      await L.stopFocus(), chrome.action.setBadgeText({ text: "" }), this.stopTimerCheck(), console.log("Focus mode stopped");
    } catch (e) {
      throw console.error("Error stopping focus mode:", e), e;
    }
  }
  /**
   * 启动定时器检查
   */
  startTimerCheck() {
    this.timerInterval && clearInterval(this.timerInterval), this.timerInterval = setInterval(async () => {
      await this.checkFocusTimer();
    }, Ee.TIMER_CHECK_INTERVAL);
  }
  /**
   * 停止定时器检查
   */
  stopTimerCheck() {
    this.timerInterval && (clearInterval(this.timerInterval), this.timerInterval = null);
  }
  /**
   * 检查专注计时器
   */
  async checkFocusTimer() {
    try {
      if (!(await L.get()).isActive) {
        this.stopTimerCheck();
        return;
      }
      const t = await L.getRemainingTime();
      if (t <= 0)
        await this.handleFocusEnd();
      else {
        const o = Math.ceil(t / 60);
        chrome.action.setBadgeText({ text: o.toString() });
      }
    } catch (e) {
      console.error("Error checking focus timer:", e);
    }
  }
  /**
   * 处理专注时间结束
   */
  async handleFocusEnd() {
    try {
      await this.stopFocus();
      const e = await ce.getInstance().getEndNotification();
      chrome.notifications.create(ve.FOCUS_END, {
        type: "basic",
        iconUrl: chrome.runtime.getURL("spring-128.png"),
        title: "专注模式已结束",
        message: e
      }), await ee.getInstance().playTTSNotification(e), console.log("Focus session completed");
    } catch (e) {
      console.error("Error handling focus end:", e);
    }
  }
  /**
   * 预生成AI通知
   */
  async preGenerateNotification(e) {
    try {
      if (!(await Z.get()).enabled)
        return;
      await ce.getInstance().preGenerateNotification(e);
    } catch (t) {
      console.error("Error pre-generating notification:", t);
    }
  }
  /**
   * 检查所有已打开的标签页
   */
  async checkAllOpenTabs() {
    try {
      console.log("FocusManager: Checking all open tabs for blocked URLs");
      const e = await chrome.tabs.query({}), t = le.getInstance();
      for (const o of e)
        o.id && o.url && !o.url.startsWith("chrome://") && !o.url.startsWith("chrome-extension://") && (console.log("FocusManager: Checking tab:", o.url), await t.checkTabUrl(o.id, o.url));
      console.log("FocusManager: Finished checking all open tabs");
    } catch (e) {
      console.error("Error checking all open tabs:", e);
    }
  }
  /**
   * 获取当前专注状态
   */
  async getFocusStatus() {
    const e = await L.get(), t = await L.getRemainingTime();
    return {
      isActive: e.isActive,
      remainingTime: t
    };
  }
  /**
   * 初始化专注管理器
   */
  async initialize() {
    try {
      (await L.get()).isActive && (this.startTimerCheck(), chrome.action.setBadgeText({ text: re.BADGE_TEXT }), chrome.action.setBadgeBackgroundColor({ color: re.BADGE_COLOR }), console.log("Focus mode restored from storage"));
    } catch (e) {
      console.error("Error initializing focus manager:", e);
    }
  }
};
H(W, "instance");
let Se = W;
const Te = Se.getInstance(), ge = ee.getInstance(), xe = le.getInstance();
chrome.runtime.onMessage.addListener((r, e, t) => r.type === ae.TEST_TTS ? (ge.testTTS(r.text, r.config).then((o) => t(o)).catch((o) => {
  console.error("TTS test error:", o), t({ success: !1, error: o.message });
}), !0) : r.type === "PLAY_TTS_SOUND" ? (ge.playTTSNotification(r.text).then(() => t({ success: !0 })).catch((o) => {
  console.error("TTS play error:", o), t({ success: !1, error: o.message });
}), !0) : (r.type === "SPEECH_CONFIG_CHANGED" && (console.log("Speech configuration changed:", r.config), t({ success: !0 })), !1));
chrome.storage.onChanged.addListener(async (r, e) => {
  if (e === "local") {
    if (r["focus-time-storage-key"]) {
      const t = r["focus-time-storage-key"].newValue, o = r["focus-time-storage-key"].oldValue;
      t != null && t.isActive && !(o != null && o.isActive) ? await Te.startFocus(t.duration) : !(t != null && t.isActive) && (o != null && o.isActive) && await Te.stopFocus();
    }
    if (r["tts-config-storage-key"]) {
      const t = r["tts-config-storage-key"].newValue, o = r["tts-config-storage-key"].oldValue;
      t != null && t.voiceType && (o != null && o.voiceType) && t.voiceType !== o.voiceType && (console.log("VoiceType changed, clearing voice cache"), await ge.clearVoiceCacheOnVoiceTypeChange(o.voiceType, t.voiceType)), (t == null ? void 0 : t.defaultText) !== (o == null ? void 0 : o.defaultText) && (console.log("DefaultText changed, clearing start voice cache"), await ge.clearVoiceCacheOnVoiceTypeChange("", ""));
    }
    if (r["speech-chat-config-storage-key"]) {
      const t = r["speech-chat-config-storage-key"].newValue, o = r["speech-chat-config-storage-key"].oldValue;
      console.log("Speech chat configuration changed:", {
        old: o,
        new: t
      });
      try {
        (await chrome.tabs.query({})).forEach((a) => {
          a.id && chrome.tabs.sendMessage(a.id, {
            type: "SPEECH_CONFIG_CHANGED",
            config: t
          }).catch(() => {
          });
        });
      } catch (i) {
        console.error("Error notifying tabs of speech config change:", i);
      }
    }
  }
});
chrome.tabs.onUpdated.addListener(async (r, e, t) => {
  e.status === "complete" && t.url && await xe.checkTabUrl(r, t.url);
});
chrome.tabs.onActivated.addListener(async (r) => {
  try {
    const e = await chrome.tabs.get(r.tabId);
    e.url && await xe.checkTabUrl(r.tabId, e.url);
  } catch (e) {
    console.error("Error handling tab activation:", e);
  }
});
async function $e() {
  try {
    console.log("Initializing background script...");
    const r = await Fe.get();
    console.log("Theme loaded:", r), await Te.initialize(), await xe.initializePredefinedSites(), console.log("Background script initialized successfully");
  } catch (r) {
    console.error("Error during initialization:", r);
  }
}
$e();
