var W = { exports: {} }, ce = W.exports, te;
function me() {
  return te || (te = 1, function(e, t) {
    (function(s, r) {
      r(e);
    })(typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : ce, function(s) {
      if (!(globalThis.chrome && globalThis.chrome.runtime && globalThis.chrome.runtime.id))
        throw new Error("This script should only be loaded in a browser extension.");
      if (globalThis.browser && globalThis.browser.runtime && globalThis.browser.runtime.id)
        s.exports = globalThis.browser;
      else {
        const r = "The message port closed before a response was received.", l = (i) => {
          const u = {
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
          if (Object.keys(u).length === 0)
            throw new Error("api-metadata.json has not been included in browser-polyfill");
          class d extends WeakMap {
            constructor(o, g = void 0) {
              super(g), this.createItem = o;
            }
            get(o) {
              return this.has(o) || this.set(o, this.createItem(o)), super.get(o);
            }
          }
          const R = (n) => n && typeof n == "object" && typeof n.then == "function", O = (n, o) => (...g) => {
            i.runtime.lastError ? n.reject(new Error(i.runtime.lastError.message)) : o.singleCallbackArg || g.length <= 1 && o.singleCallbackArg !== !1 ? n.resolve(g[0]) : n.resolve(g);
          }, v = (n) => n == 1 ? "argument" : "arguments", B = (n, o) => function(c, ...f) {
            if (f.length < o.minArgs)
              throw new Error(`Expected at least ${o.minArgs} ${v(o.minArgs)} for ${n}(), got ${f.length}`);
            if (f.length > o.maxArgs)
              throw new Error(`Expected at most ${o.maxArgs} ${v(o.maxArgs)} for ${n}(), got ${f.length}`);
            return new Promise((x, h) => {
              if (o.fallbackToNoCallback)
                try {
                  c[n](...f, O({
                    resolve: x,
                    reject: h
                  }, o));
                } catch (a) {
                  console.warn(`${n} API method doesn't seem to support the callback parameter, falling back to call it without a callback: `, a), c[n](...f), o.fallbackToNoCallback = !1, o.noCallback = !0, x();
                }
              else o.noCallback ? (c[n](...f), x()) : c[n](...f, O({
                resolve: x,
                reject: h
              }, o));
            });
          }, $ = (n, o, g) => new Proxy(o, {
            apply(c, f, x) {
              return g.call(f, n, ...x);
            }
          });
          let C = Function.call.bind(Object.prototype.hasOwnProperty);
          const U = (n, o = {}, g = {}) => {
            let c = /* @__PURE__ */ Object.create(null), f = {
              has(h, a) {
                return a in n || a in c;
              },
              get(h, a, p) {
                if (a in c)
                  return c[a];
                if (!(a in n))
                  return;
                let A = n[a];
                if (typeof A == "function")
                  if (typeof o[a] == "function")
                    A = $(n, n[a], o[a]);
                  else if (C(g, a)) {
                    let N = B(a, g[a]);
                    A = $(n, n[a], N);
                  } else
                    A = A.bind(n);
                else if (typeof A == "object" && A !== null && (C(o, a) || C(g, a)))
                  A = U(A, o[a], g[a]);
                else if (C(g, "*"))
                  A = U(A, o[a], g["*"]);
                else
                  return Object.defineProperty(c, a, {
                    configurable: !0,
                    enumerable: !0,
                    get() {
                      return n[a];
                    },
                    set(N) {
                      n[a] = N;
                    }
                  }), A;
                return c[a] = A, A;
              },
              set(h, a, p, A) {
                return a in c ? c[a] = p : n[a] = p, !0;
              },
              defineProperty(h, a, p) {
                return Reflect.defineProperty(c, a, p);
              },
              deleteProperty(h, a) {
                return Reflect.deleteProperty(c, a);
              }
            }, x = Object.create(n);
            return new Proxy(x, f);
          }, F = (n) => ({
            addListener(o, g, ...c) {
              o.addListener(n.get(g), ...c);
            },
            hasListener(o, g) {
              return o.hasListener(n.get(g));
            },
            removeListener(o, g) {
              o.removeListener(n.get(g));
            }
          }), q = new d((n) => typeof n != "function" ? n : function(g) {
            const c = U(g, {}, {
              getContent: {
                minArgs: 0,
                maxArgs: 0
              }
            });
            n(c);
          }), I = new d((n) => typeof n != "function" ? n : function(g, c, f) {
            let x = !1, h, a = new Promise((_) => {
              h = function(k) {
                x = !0, _(k);
              };
            }), p;
            try {
              p = n(g, c, h);
            } catch (_) {
              p = Promise.reject(_);
            }
            const A = p !== !0 && R(p);
            if (p !== !0 && !A && !x)
              return !1;
            const N = (_) => {
              _.then((k) => {
                f(k);
              }, (k) => {
                let Z;
                k && (k instanceof Error || typeof k.message == "string") ? Z = k.message : Z = "An unexpected error occurred", f({
                  __mozWebExtensionPolyfillReject__: !0,
                  message: Z
                });
              }).catch((k) => {
                console.error("Failed to send onMessage rejected reply", k);
              });
            };
            return N(A ? p : a), !0;
          }), m = ({
            reject: n,
            resolve: o
          }, g) => {
            i.runtime.lastError ? i.runtime.lastError.message === r ? o() : n(new Error(i.runtime.lastError.message)) : g && g.__mozWebExtensionPolyfillReject__ ? n(new Error(g.message)) : o(g);
          }, T = (n, o, g, ...c) => {
            if (c.length < o.minArgs)
              throw new Error(`Expected at least ${o.minArgs} ${v(o.minArgs)} for ${n}(), got ${c.length}`);
            if (c.length > o.maxArgs)
              throw new Error(`Expected at most ${o.maxArgs} ${v(o.maxArgs)} for ${n}(), got ${c.length}`);
            return new Promise((f, x) => {
              const h = m.bind(null, {
                resolve: f,
                reject: x
              });
              c.push(h), g.sendMessage(...c);
            });
          }, ge = {
            devtools: {
              network: {
                onRequestFinished: F(q)
              }
            },
            runtime: {
              onMessage: F(I),
              onMessageExternal: F(I),
              sendMessage: T.bind(null, "sendMessage", {
                minArgs: 1,
                maxArgs: 3
              })
            },
            tabs: {
              sendMessage: T.bind(null, "sendMessage", {
                minArgs: 2,
                maxArgs: 3
              })
            }
          }, X = {
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
          return u.privacy = {
            network: {
              "*": X
            },
            services: {
              "*": X
            },
            websites: {
              "*": X
            }
          }, U(i, ge, u);
        };
        s.exports = l(chrome);
      }
    });
  }(W)), W.exports;
}
me();
var M;
(function(e) {
  e.Local = "local", e.Sync = "sync", e.Managed = "managed", e.Session = "session";
})(M || (M = {}));
var J;
(function(e) {
  e.ExtensionPagesOnly = "TRUSTED_CONTEXTS", e.ExtensionPagesAndContentScripts = "TRUSTED_AND_UNTRUSTED_CONTEXTS";
})(J || (J = {}));
const y = globalThis.chrome, se = async (e, t) => {
  const s = (l) => typeof l == "function", r = (l) => l instanceof Promise;
  return s(e) ? (r(e), e(t)) : e;
};
let re = !1;
function ne(e) {
  if (y && y.storage[e] === void 0)
    throw new Error(`Check your storage permission in manifest.json: ${e} is not defined`);
}
function D(e, t, s) {
  var q, I;
  let r = null, l = !1, i = [];
  const u = (s == null ? void 0 : s.storageEnum) ?? M.Local, d = (s == null ? void 0 : s.liveUpdate) ?? !1, R = ((q = s == null ? void 0 : s.serialization) == null ? void 0 : q.serialize) ?? ((m) => m), O = ((I = s == null ? void 0 : s.serialization) == null ? void 0 : I.deserialize) ?? ((m) => m);
  re === !1 && u === M.Session && (s == null ? void 0 : s.sessionAccessForContentScripts) === !0 && (ne(u), y == null || y.storage[u].setAccessLevel({
    accessLevel: J.ExtensionPagesAndContentScripts
  }).catch((m) => {
    console.warn(m), console.warn("Please call setAccessLevel into different context, like a background script.");
  }), re = !0);
  const v = async () => {
    ne(u);
    const m = await (y == null ? void 0 : y.storage[u].get([e]));
    return m ? O(m[e]) ?? t : t;
  }, B = () => {
    i.forEach((m) => m());
  }, $ = async (m) => {
    l || (r = await v()), r = await se(m, r), await (y == null ? void 0 : y.storage[u].set({ [e]: R(r) })), B();
  }, C = (m) => (i = [...i, m], () => {
    i = i.filter((T) => T !== m);
  }), U = () => r;
  v().then((m) => {
    r = m, l = !0, B();
  });
  async function F(m) {
    if (m[e] === void 0)
      return;
    const T = O(m[e].newValue);
    r !== T && (r = await se(T, r), B());
  }
  return d && (y == null || y.storage[u].onChanged.addListener(F)), {
    get: v,
    set: $,
    getSnapshot: U,
    subscribe: C
  };
}
const oe = D("theme-storage-key", "light", {
  storageEnum: M.Local,
  liveUpdate: !0
}), de = {
  ...oe,
  toggle: async () => {
    await oe.set((e) => e === "light" ? "dark" : "light");
  }
}, V = D("focus-time-storage-key", {
  duration: 25,
  // 默认25分钟
  isActive: !1
}, {
  storageEnum: M.Local,
  liveUpdate: !0
}), w = D("blocked-urls-storage-key", {
  urls: [],
  studyModeUrls: [],
  studyModeSelectors: {}
}, {
  storageEnum: M.Local,
  liveUpdate: !0
});
(async () => {
  try {
    const e = await w.get();
    (!e.studyModeUrls || !e.studyModeSelectors) && (console.log("Migrating blocked URLs storage structure..."), await w.set((t) => ({
      urls: t.urls || [],
      studyModeUrls: t.studyModeUrls || [],
      studyModeSelectors: t.studyModeSelectors || {}
    })), console.log("Migration complete."));
  } catch (e) {
    console.error("Error migrating blocked URLs storage:", e);
  }
})();
const z = {
  ...V,
  startFocus: async (e) => {
    const t = Date.now();
    await V.set({
      duration: e,
      isActive: !0,
      startTime: t,
      endTime: t + e * 60 * 1e3
    });
  },
  stopFocus: async () => {
    await V.set((e) => ({
      ...e,
      isActive: !1,
      startTime: void 0,
      endTime: void 0
    }));
  },
  getRemainingTime: async () => {
    const e = await V.get();
    if (!e.isActive || !e.endTime)
      return 0;
    const t = Math.max(0, e.endTime - Date.now());
    return Math.floor(t / 1e3);
  }
}, Q = {
  ...w,
  addUrl: async (e) => {
    await w.set((t) => {
      if (t.urls.includes(e))
        return t;
      const s = t.studyModeUrls.filter((r) => r !== e);
      return {
        ...t,
        urls: [...t.urls, e],
        studyModeUrls: s
      };
    });
  },
  removeUrl: async (e) => {
    await w.set((t) => ({
      ...t,
      urls: t.urls.filter((s) => s !== e)
    }));
  },
  clearUrls: async () => {
    await w.set((e) => ({
      ...e,
      urls: []
    }));
  },
  addStudyModeUrl: async (e) => {
    await w.set((t) => {
      if (t.studyModeUrls.includes(e))
        return t;
      const s = t.urls.filter((r) => r !== e);
      return {
        ...t,
        studyModeUrls: [...t.studyModeUrls, e],
        urls: s
      };
    });
  },
  removeStudyModeUrl: async (e) => {
    await w.set((t) => ({
      ...t,
      studyModeUrls: t.studyModeUrls.filter((s) => s !== e)
    }));
  },
  toggleUrlMode: async (e, t) => {
    t ? await Q.addStudyModeUrl(e) : await Q.addUrl(e);
  },
  addStudyModeSelector: async (e, t) => {
    await w.set((s) => {
      const r = s.studyModeSelectors[e] || [];
      return r.includes(t) ? s : {
        ...s,
        studyModeSelectors: {
          ...s.studyModeSelectors,
          [e]: [...r, t]
        }
      };
    });
  },
  removeStudyModeSelector: async (e, t) => {
    await w.set((s) => {
      const r = s.studyModeSelectors[e] || [];
      return {
        ...s,
        studyModeSelectors: {
          ...s.studyModeSelectors,
          [e]: r.filter((l) => l !== t)
        }
      };
    });
  },
  clearStudyModeSelectors: async (e) => {
    await w.set((t) => {
      const { [e]: s, ...r } = t.studyModeSelectors;
      return {
        ...t,
        studyModeSelectors: r
      };
    });
  }
}, P = D("notification-cache-storage-key", {
  isGenerating: !1
}, {
  storageEnum: M.Local,
  liveUpdate: !0
}), S = {
  ...P,
  // 保存通知内容
  saveNotification: async (e, t = 60) => {
    const s = Date.now();
    await P.set({
      pendingNotification: e,
      generatedAt: s,
      expiresAt: s + t * 60 * 1e3,
      isGenerating: !1
    });
  },
  // 获取通知内容（如果有效）
  getNotification: async () => {
    const e = await P.get();
    return e.pendingNotification ? e.expiresAt && e.expiresAt < Date.now() ? (await S.clearNotification(), null) : e.pendingNotification : null;
  },
  // 清除通知缓存
  clearNotification: async () => {
    await P.set((e) => ({
      ...e,
      pendingNotification: void 0,
      generatedAt: void 0,
      expiresAt: void 0,
      isGenerating: !1
    }));
  },
  // 设置生成状态
  setGenerating: async (e) => {
    await P.set((t) => ({
      ...t,
      isGenerating: e
    }));
  },
  // 检查是否正在生成中
  isGenerating: async () => (await P.get()).isGenerating
};
var Y;
(function(e) {
  e.DEEPSEEK = "deepseek", e.OPENAI = "openai";
})(Y || (Y = {}));
const L = D("ai-config-storage-key", {
  enabled: !1,
  provider: Y.DEEPSEEK,
  model: "deepseek-chat",
  apiKey: "",
  preGenerateMinutes: 5
  // 默认提前5分钟生成
}, {
  storageEnum: M.Local,
  liveUpdate: !0
}), j = {
  ...L,
  // 启用/禁用AI生成
  enableAI: async (e) => {
    await L.set((t) => ({
      ...t,
      enabled: e
    }));
  },
  // 更新API密钥
  updateAPIKey: async (e) => {
    await L.set((t) => ({
      ...t,
      apiKey: e
    }));
  },
  // 更新AI提供商
  updateProvider: async (e, t, s) => {
    await L.set((r) => ({
      ...r,
      provider: e,
      ...t ? { model: t } : {},
      ...s ? { apiEndpoint: s } : { apiEndpoint: void 0 }
    }));
  },
  // 更新提示词
  updatePrompts: async (e, t) => {
    await L.set((s) => ({
      ...s,
      ...e !== void 0 ? { systemPrompt: e } : {},
      ...t !== void 0 ? { promptTemplate: t } : {}
    }));
  },
  // 更新预生成时间
  updatePreGenerateTime: async (e) => {
    await L.set((t) => ({
      ...t,
      preGenerateMinutes: Math.max(1, Math.min(30, e))
      // 限制在1-30分钟之间
    }));
  }
};
de.get().then((e) => {
  console.log("Theme loaded:", e);
});
let b = !1, K = [], H = [], E = {};
async function ee(e) {
  try {
    const t = await j.get();
    if (!t.enabled || !t.apiKey) {
      console.log("AI service not enabled or no API key, skipping notification pre-generation");
      return;
    }
    if (await S.getNotification()) {
      console.log("Already have a cached notification, skipping pre-generation");
      return;
    }
    if (await S.isGenerating()) {
      console.log("Already generating a notification, skipping");
      return;
    }
    if (await S.setGenerating(!0), console.log("Marked notification for pre-generation, duration:", e), !await ue()) {
      console.log("No popup open, using fallback message");
      const i = [
        "休息一下吧！你已经专注工作了一段时间。",
        "该活动一下了！站起来伸展一下身体吧。",
        "休息是为了更好的工作，现在是放松的时候了。",
        "你的大脑需要休息，去喝杯水吧！",
        "专注时间结束，给自己一个小奖励吧！"
      ], u = Math.floor(Math.random() * i.length), d = i[u];
      await S.saveNotification(d), await S.setGenerating(!1);
    }
    return !0;
  } catch (t) {
    return console.error("Error pre-generating notification:", t), await S.setGenerating(!1), !1;
  }
}
async function ue() {
  try {
    const e = await chrome.runtime.sendMessage({ type: "PING_POPUP" });
    return e && e.type === "PONG_POPUP";
  } catch {
    return !1;
  }
}
async function Ae() {
  const e = await z.get();
  b = e.isActive;
  const t = await Q.get();
  return K = t.urls || [], H = t.studyModeUrls || [], E = t.studyModeSelectors || {}, console.log("Focus mode active:", b), console.log("Blocked URLs:", K), console.log("Study Mode URLs:", H), console.log("Study Mode Selectors:", E), ie(b), { isFocusModeActive: b, focusConfig: e };
}
function ie(e) {
  e ? (chrome.action.setBadgeBackgroundColor({ color: "#E53935" }), chrome.action.setBadgeText({ text: "专注" })) : chrome.action.setBadgeText({ text: "" });
}
chrome.storage.onChanged.addListener((e, t) => {
  var s, r;
  if (t === "local") {
    if (e["focus-time-storage-key"]) {
      const l = e["focus-time-storage-key"].newValue;
      l && (b = l.isActive, ie(b), b && !((s = e["focus-time-storage-key"].oldValue) != null && s.isActive) && (chrome.notifications.create("focus-start", {
        type: "basic",
        iconUrl: chrome.runtime.getURL("spring-128.png"),
        title: "专注模式已启动",
        message: `专注时间：${l.duration}分钟`
      }), le(), j.get().then((i) => {
        i.enabled && ee(l.duration);
      })), !b && ((r = e["focus-time-storage-key"].oldValue) != null && r.isActive) && (we(), S.clearNotification()));
    }
    if (e["blocked-urls-storage-key"]) {
      const l = e["blocked-urls-storage-key"].newValue;
      l && (K = l.urls || [], H = l.studyModeUrls || [], E = l.studyModeSelectors || {});
    }
    e["ai-config-storage-key"] && e["ai-config-storage-key"].newValue && console.log("AI configuration changed");
  }
});
chrome.tabs.onUpdated.addListener((e, t, s) => {
  t.status === "complete" && s.url && ae(e, s.url);
});
chrome.tabs.onActivated.addListener((e) => {
  chrome.tabs.get(e.tabId, (t) => {
    t.url && ae(t.id, t.url);
  });
});
async function ae(e, t) {
  if (!b) return;
  const s = fe(t), r = ye(t);
  if (s)
    await chrome.scripting.executeScript({
      target: { tabId: e },
      func: he
    });
  else if (r) {
    const l = xe(t);
    l && l.length > 0 && await chrome.scripting.executeScript({
      target: { tabId: e },
      func: pe,
      args: [l]
    });
  }
}
function fe(e) {
  try {
    const t = new URL(e);
    return K.some((s) => {
      try {
        const r = new URL(s);
        return t.hostname.includes(r.hostname);
      } catch {
        return e.includes(s);
      }
    });
  } catch {
    return !1;
  }
}
function ye(e) {
  try {
    const t = new URL(e);
    return H.some((s) => {
      try {
        const r = new URL(s);
        return t.hostname.includes(r.hostname);
      } catch {
        return e.includes(s);
      }
    });
  } catch {
    return !1;
  }
}
function xe(e) {
  try {
    const t = new URL(e);
    for (const s in E)
      if (e === s)
        return E[s];
    for (const s in E)
      try {
        const r = new URL(s);
        if (t.hostname.includes(r.hostname))
          return E[s];
      } catch {
        if (e.includes(s))
          return E[s];
      }
    return t.hostname.includes("bilibili.com") ? ["#nav-searchform", ".center-search__bar"] : [];
  } catch {
    return [];
  }
}
function he() {
  const e = document.createElement("div");
  e.style.position = "fixed", e.style.top = "0", e.style.left = "0", e.style.width = "100%", e.style.height = "100%", e.style.backgroundColor = "rgba(0, 0, 0, 0.9)", e.style.zIndex = "9999999", e.style.display = "flex", e.style.flexDirection = "column", e.style.alignItems = "center", e.style.justifyContent = "center", e.style.color = "white", e.style.fontFamily = "Arial, sans-serif", e.style.fontSize = "16px", e.style.padding = "20px", e.style.boxSizing = "border-box";
  const t = document.createElement("h1");
  t.textContent = "专注模式已启动", t.style.marginBottom = "20px", t.style.fontSize = "24px", t.style.fontWeight = "bold";
  const s = document.createElement("p");
  s.textContent = "当前网站在专注模式下被禁用", s.style.marginBottom = "30px", s.style.fontSize = "18px";
  const r = document.createElement("button");
  r.textContent = "返回上一页", r.style.padding = "10px 20px", r.style.backgroundColor = "#4A90E2", r.style.border = "none", r.style.borderRadius = "4px", r.style.color = "white", r.style.cursor = "pointer", r.style.fontSize = "16px", r.onclick = () => {
    history.back(), document.body.removeChild(e);
  }, e.appendChild(t), e.appendChild(s), e.appendChild(r), document.body.appendChild(e);
}
function pe(e) {
  console.log("Applying study mode with selectors:", e);
  const t = document.createElement("div");
  t.style.position = "fixed", t.style.top = "10px", t.style.right = "10px", t.style.backgroundColor = "rgba(0, 128, 0, 0.8)", t.style.color = "white", t.style.padding = "8px 12px", t.style.borderRadius = "4px", t.style.zIndex = "9999998", t.style.fontSize = "14px", t.style.fontFamily = "Arial, sans-serif", t.textContent = "学习模式已启用", document.body.appendChild(t), setTimeout(() => {
    t.style.opacity = "0", t.style.transition = "opacity 0.5s", setTimeout(() => {
      document.body.contains(t) && document.body.removeChild(t);
    }, 500);
  }, 5e3), e.forEach((r) => {
    try {
      const l = document.querySelectorAll(r);
      l.forEach((i) => {
        if (i instanceof HTMLElement) {
          const u = i.style.pointerEvents, d = i.style.opacity, R = i.style.cursor;
          i.style.pointerEvents = "none", i.style.opacity = "0.5", i.style.cursor = "not-allowed", (i.tagName === "INPUT" || i.tagName === "TEXTAREA" || i.tagName === "BUTTON") && (i.style.fontSize = i.style.fontSize || "inherit"), i.dataset.studyModeDisabled = "true", i.dataset.originalPointerEvents = u, i.dataset.originalOpacity = d, i.dataset.originalCursor = R;
        }
      }), console.log(`Disabled ${l.length} elements with selector: ${r}`);
    } catch (l) {
      console.error(`Error disabling elements with selector ${r}:`, l);
    }
  });
  const s = new MutationObserver((r) => {
    let l = !1;
    r.forEach((i) => {
      i.type === "childList" && i.addedNodes.length > 0 && (l = !0);
    }), l && e.forEach((i) => {
      try {
        document.querySelectorAll(i).forEach((d) => {
          d instanceof HTMLElement && !d.dataset.studyModeDisabled && (d.style.pointerEvents = "none", d.style.opacity = "0.5", d.style.cursor = "not-allowed", (d.tagName === "INPUT" || d.tagName === "TEXTAREA" || d.tagName === "BUTTON") && (d.style.fontSize = d.style.fontSize || "inherit"), d.dataset.studyModeDisabled = "true");
        });
      } catch (u) {
        console.error(`Error in mutation observer for selector ${i}:`, u);
      }
    });
  });
  s.observe(document.documentElement, {
    childList: !0,
    subtree: !0
  }), window.__studyModeObserver = s;
}
async function be() {
  if (b)
    try {
      const e = await z.getRemainingTime(), t = await j.get();
      if (e <= 0 && b) {
        console.log("Focus timer ended, stopping focus mode automatically");
        let s = "休息一下吧！";
        if (t.enabled)
          try {
            const r = await S.getNotification();
            r && (s = r, await S.clearNotification());
          } catch (r) {
            console.error("Error getting cached notification:", r);
          }
        await z.stopFocus(), chrome.notifications.create("focus-end", {
          type: "basic",
          iconUrl: chrome.runtime.getURL("spring-128.png"),
          title: "专注模式已结束",
          message: s
        });
      } else if (t.enabled && e > 0 && e <= t.preGenerateMinutes * 60 && !await S.getNotification()) {
        const r = await z.get();
        await ee(r.duration);
      }
    } catch (e) {
      console.error("Error checking focus timer:", e);
    }
}
let G = null;
function le() {
  G || (G = setInterval(be, 1e3), console.log("Started focus timer check interval"));
}
function we() {
  G && (clearInterval(G), G = null, console.log("Stopped focus timer check interval"));
}
async function Se() {
  await Ae();
  const e = await j.get();
  if (console.log("AI notifications enabled:", e.enabled), b && (le(), (await j.get()).enabled)) {
    const s = await z.get();
    await ee(s.duration);
  }
  console.log("Focus mode background script loaded with AI integration");
}
Se().catch((e) => {
  console.error("Error during initialization:", e);
});
