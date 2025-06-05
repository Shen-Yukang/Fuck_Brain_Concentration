var be = Object.defineProperty;
var Se = (e, t, r) => t in e ? be(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r;
var le = (e, t, r) => Se(e, typeof t != "symbol" ? t + "" : t, r);
var X = { exports: {} }, Te = X.exports, ge;
function ve() {
  return ge || (ge = 1, function(e, t) {
    (function(r, s) {
      s(e);
    })(typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : Te, function(r) {
      if (!(globalThis.chrome && globalThis.chrome.runtime && globalThis.chrome.runtime.id))
        throw new Error("This script should only be loaded in a browser extension.");
      if (globalThis.browser && globalThis.browser.runtime && globalThis.browser.runtime.id)
        r.exports = globalThis.browser;
      else {
        const s = "The message port closed before a response was received.", n = (o) => {
          const d = {
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
          if (Object.keys(d).length === 0)
            throw new Error("api-metadata.json has not been included in browser-polyfill");
          class c extends WeakMap {
            constructor(a, g = void 0) {
              super(g), this.createItem = a;
            }
            get(a) {
              return this.has(a) || this.set(a, this.createItem(a)), super.get(a);
            }
          }
          const p = (i) => i && typeof i == "object" && typeof i.then == "function", A = (i, a) => (...g) => {
            o.runtime.lastError ? i.reject(new Error(o.runtime.lastError.message)) : a.singleCallbackArg || g.length <= 1 && a.singleCallbackArg !== !1 ? i.resolve(g[0]) : i.resolve(g);
          }, T = (i) => i == 1 ? "argument" : "arguments", k = (i, a) => function(u, ...y) {
            if (y.length < a.minArgs)
              throw new Error(`Expected at least ${a.minArgs} ${T(a.minArgs)} for ${i}(), got ${y.length}`);
            if (y.length > a.maxArgs)
              throw new Error(`Expected at most ${a.maxArgs} ${T(a.maxArgs)} for ${i}(), got ${y.length}`);
            return new Promise((x, w) => {
              if (a.fallbackToNoCallback)
                try {
                  u[i](...y, A({
                    resolve: x,
                    reject: w
                  }, a));
                } catch (l) {
                  console.warn(`${i} API method doesn't seem to support the callback parameter, falling back to call it without a callback: `, l), u[i](...y), a.fallbackToNoCallback = !1, a.noCallback = !0, x();
                }
              else a.noCallback ? (u[i](...y), x()) : u[i](...y, A({
                resolve: x,
                reject: w
              }, a));
            });
          }, H = (i, a, g) => new Proxy(a, {
            apply(u, y, x) {
              return g.call(y, i, ...x);
            }
          });
          let L = Function.call.bind(Object.prototype.hasOwnProperty);
          const R = (i, a = {}, g = {}) => {
            let u = /* @__PURE__ */ Object.create(null), y = {
              has(w, l) {
                return l in i || l in u;
              },
              get(w, l, b) {
                if (l in u)
                  return u[l];
                if (!(l in i))
                  return;
                let f = i[l];
                if (typeof f == "function")
                  if (typeof a[l] == "function")
                    f = H(i, i[l], a[l]);
                  else if (L(g, l)) {
                    let _ = k(l, g[l]);
                    f = H(i, i[l], _);
                  } else
                    f = f.bind(i);
                else if (typeof f == "object" && f !== null && (L(a, l) || L(g, l)))
                  f = R(f, a[l], g[l]);
                else if (L(g, "*"))
                  f = R(f, a[l], g["*"]);
                else
                  return Object.defineProperty(u, l, {
                    configurable: !0,
                    enumerable: !0,
                    get() {
                      return i[l];
                    },
                    set(_) {
                      i[l] = _;
                    }
                  }), f;
                return u[l] = f, f;
              },
              set(w, l, b, f) {
                return l in u ? u[l] = b : i[l] = b, !0;
              },
              defineProperty(w, l, b) {
                return Reflect.defineProperty(u, l, b);
              },
              deleteProperty(w, l) {
                return Reflect.deleteProperty(u, l);
              }
            }, x = Object.create(i);
            return new Proxy(x, y);
          }, I = (i) => ({
            addListener(a, g, ...u) {
              a.addListener(i.get(g), ...u);
            },
            hasListener(a, g) {
              return a.hasListener(i.get(g));
            },
            removeListener(a, g) {
              a.removeListener(i.get(g));
            }
          }), V = new c((i) => typeof i != "function" ? i : function(g) {
            const u = R(g, {}, {
              getContent: {
                minArgs: 0,
                maxArgs: 0
              }
            });
            i(u);
          }), D = new c((i) => typeof i != "function" ? i : function(g, u, y) {
            let x = !1, w, l = new Promise((F) => {
              w = function(M) {
                x = !0, F(M);
              };
            }), b;
            try {
              b = i(g, u, w);
            } catch (F) {
              b = Promise.reject(F);
            }
            const f = b !== !0 && p(b);
            if (b !== !0 && !f && !x)
              return !1;
            const _ = (F) => {
              F.then((M) => {
                y(M);
              }, (M) => {
                let ee;
                M && (M instanceof Error || typeof M.message == "string") ? ee = M.message : ee = "An unexpected error occurred", y({
                  __mozWebExtensionPolyfillReject__: !0,
                  message: ee
                });
              }).catch((M) => {
                console.error("Failed to send onMessage rejected reply", M);
              });
            };
            return _(f ? b : l), !0;
          }), m = ({
            reject: i,
            resolve: a
          }, g) => {
            o.runtime.lastError ? o.runtime.lastError.message === s ? a() : i(new Error(o.runtime.lastError.message)) : g && g.__mozWebExtensionPolyfillReject__ ? i(new Error(g.message)) : a(g);
          }, N = (i, a, g, ...u) => {
            if (u.length < a.minArgs)
              throw new Error(`Expected at least ${a.minArgs} ${T(a.minArgs)} for ${i}(), got ${u.length}`);
            if (u.length > a.maxArgs)
              throw new Error(`Expected at most ${a.maxArgs} ${T(a.maxArgs)} for ${i}(), got ${u.length}`);
            return new Promise((y, x) => {
              const w = m.bind(null, {
                resolve: y,
                reject: x
              });
              u.push(w), g.sendMessage(...u);
            });
          }, we = {
            devtools: {
              network: {
                onRequestFinished: I(V)
              }
            },
            runtime: {
              onMessage: I(D),
              onMessageExternal: I(D),
              sendMessage: N.bind(null, "sendMessage", {
                minArgs: 1,
                maxArgs: 3
              })
            },
            tabs: {
              sendMessage: N.bind(null, "sendMessage", {
                minArgs: 2,
                maxArgs: 3
              })
            }
          }, Q = {
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
          return d.privacy = {
            network: {
              "*": Q
            },
            services: {
              "*": Q
            },
            websites: {
              "*": Q
            }
          }, R(o, we, d);
        };
        r.exports = n(chrome);
      }
    });
  }(X)), X.exports;
}
ve();
var C;
(function(e) {
  e.Local = "local", e.Sync = "sync", e.Managed = "managed", e.Session = "session";
})(C || (C = {}));
var re;
(function(e) {
  e.ExtensionPagesOnly = "TRUSTED_CONTEXTS", e.ExtensionPagesAndContentScripts = "TRUSTED_AND_UNTRUSTED_CONTEXTS";
})(re || (re = {}));
const h = globalThis.chrome, de = async (e, t) => {
  const r = (n) => typeof n == "function", s = (n) => n instanceof Promise;
  return r(e) ? (s(e), e(t)) : e;
};
let ue = !1;
function me(e) {
  if (h && h.storage[e] === void 0)
    throw new Error(`Check your storage permission in manifest.json: ${e} is not defined`);
}
function P(e, t, r) {
  var V, D;
  let s = null, n = !1, o = [];
  const d = (r == null ? void 0 : r.storageEnum) ?? C.Local, c = (r == null ? void 0 : r.liveUpdate) ?? !1, p = ((V = r == null ? void 0 : r.serialization) == null ? void 0 : V.serialize) ?? ((m) => m), A = ((D = r == null ? void 0 : r.serialization) == null ? void 0 : D.deserialize) ?? ((m) => m);
  ue === !1 && d === C.Session && (r == null ? void 0 : r.sessionAccessForContentScripts) === !0 && (me(d), h == null || h.storage[d].setAccessLevel({
    accessLevel: re.ExtensionPagesAndContentScripts
  }).catch((m) => {
    console.warn(m), console.warn("Please call setAccessLevel into different context, like a background script.");
  }), ue = !0);
  const T = async () => {
    me(d);
    const m = await (h == null ? void 0 : h.storage[d].get([e]));
    return m ? A(m[e]) ?? t : t;
  }, k = () => {
    o.forEach((m) => m());
  }, H = async (m) => {
    n || (s = await T()), s = await de(m, s), await (h == null ? void 0 : h.storage[d].set({ [e]: p(s) })), k();
  }, L = (m) => (o = [...o, m], () => {
    o = o.filter((N) => N !== m);
  }), R = () => s;
  T().then((m) => {
    s = m, n = !0, k();
  });
  async function I(m) {
    if (m[e] === void 0)
      return;
    const N = A(m[e].newValue);
    s !== N && (s = await de(N, s), k());
  }
  return c && (h == null || h.storage[d].onChanged.addListener(I)), {
    get: T,
    set: H,
    getSnapshot: R,
    subscribe: L
  };
}
const fe = P("theme-storage-key", "light", {
  storageEnum: C.Local,
  liveUpdate: !0
}), Ee = {
  ...fe,
  toggle: async () => {
    await fe.set((e) => e === "light" ? "dark" : "light");
  }
}, W = P("focus-time-storage-key", {
  duration: 25,
  // 默认25分钟
  isActive: !1
}, {
  storageEnum: C.Local,
  liveUpdate: !0
}), v = P("blocked-urls-storage-key", {
  urls: [],
  studyModeUrls: [],
  studyModeSelectors: {}
}, {
  storageEnum: C.Local,
  liveUpdate: !0
});
(async () => {
  try {
    const e = await v.get();
    (!e.studyModeUrls || !e.studyModeSelectors) && (console.log("Migrating blocked URLs storage structure..."), await v.set((t) => ({
      urls: t.urls || [],
      studyModeUrls: t.studyModeUrls || [],
      studyModeSelectors: t.studyModeSelectors || {}
    })), console.log("Migration complete."));
  } catch (e) {
    console.error("Error migrating blocked URLs storage:", e);
  }
})();
const z = {
  ...W,
  startFocus: async (e) => {
    const t = Date.now();
    await W.set({
      duration: e,
      isActive: !0,
      startTime: t,
      endTime: t + e * 60 * 1e3
    });
  },
  stopFocus: async () => {
    await W.set((e) => ({
      ...e,
      isActive: !1,
      startTime: void 0,
      endTime: void 0
    }));
  },
  getRemainingTime: async () => {
    const e = await W.get();
    if (!e.isActive || !e.endTime)
      return 0;
    const t = Math.max(0, e.endTime - Date.now());
    return Math.floor(t / 1e3);
  }
}, ne = {
  ...v,
  addUrl: async (e) => {
    await v.set((t) => {
      if (t.urls.includes(e))
        return t;
      const r = t.studyModeUrls.filter((s) => s !== e);
      return {
        ...t,
        urls: [...t.urls, e],
        studyModeUrls: r
      };
    });
  },
  removeUrl: async (e) => {
    await v.set((t) => ({
      ...t,
      urls: t.urls.filter((r) => r !== e)
    }));
  },
  clearUrls: async () => {
    await v.set((e) => ({
      ...e,
      urls: []
    }));
  },
  addStudyModeUrl: async (e) => {
    await v.set((t) => {
      if (t.studyModeUrls.includes(e))
        return t;
      const r = t.urls.filter((s) => s !== e);
      return {
        ...t,
        studyModeUrls: [...t.studyModeUrls, e],
        urls: r
      };
    });
  },
  removeStudyModeUrl: async (e) => {
    await v.set((t) => ({
      ...t,
      studyModeUrls: t.studyModeUrls.filter((r) => r !== e)
    }));
  },
  toggleUrlMode: async (e, t) => {
    t ? await ne.addStudyModeUrl(e) : await ne.addUrl(e);
  },
  addStudyModeSelector: async (e, t) => {
    await v.set((r) => {
      const s = r.studyModeSelectors[e] || [];
      return s.includes(t) ? r : {
        ...r,
        studyModeSelectors: {
          ...r.studyModeSelectors,
          [e]: [...s, t]
        }
      };
    });
  },
  removeStudyModeSelector: async (e, t) => {
    await v.set((r) => {
      const s = r.studyModeSelectors[e] || [];
      return {
        ...r,
        studyModeSelectors: {
          ...r.studyModeSelectors,
          [e]: s.filter((n) => n !== t)
        }
      };
    });
  },
  clearStudyModeSelectors: async (e) => {
    await v.set((t) => {
      const { [e]: r, ...s } = t.studyModeSelectors;
      return {
        ...t,
        studyModeSelectors: s
      };
    });
  }
}, O = P("notification-cache-storage-key", {
  isGenerating: !1
}, {
  storageEnum: C.Local,
  liveUpdate: !0
}), E = {
  ...O,
  // 保存通知内容
  saveNotification: async (e, t = 60) => {
    const r = Date.now();
    await O.set({
      pendingNotification: e,
      generatedAt: r,
      expiresAt: r + t * 60 * 1e3,
      isGenerating: !1
    });
  },
  // 获取通知内容（如果有效）
  getNotification: async () => {
    const e = await O.get();
    return e.pendingNotification ? e.expiresAt && e.expiresAt < Date.now() ? (await E.clearNotification(), null) : e.pendingNotification : null;
  },
  // 清除通知缓存
  clearNotification: async () => {
    await O.set((e) => ({
      ...e,
      pendingNotification: void 0,
      generatedAt: void 0,
      expiresAt: void 0,
      isGenerating: !1
    }));
  },
  // 设置生成状态
  setGenerating: async (e) => {
    await O.set((t) => ({
      ...t,
      isGenerating: e
    }));
  },
  // 检查是否正在生成中
  isGenerating: async () => (await O.get()).isGenerating
};
var oe;
(function(e) {
  e.DEEPSEEK = "deepseek", e.OPENAI = "openai";
})(oe || (oe = {}));
const B = P("ai-config-storage-key", {
  enabled: !1,
  provider: oe.DEEPSEEK,
  model: "deepseek-chat",
  apiKey: "",
  preGenerateMinutes: 5
  // 默认提前5分钟生成
}, {
  storageEnum: C.Local,
  liveUpdate: !0
}), q = {
  ...B,
  // 启用/禁用AI生成
  enableAI: async (e) => {
    await B.set((t) => ({
      ...t,
      enabled: e
    }));
  },
  // 更新API密钥
  updateAPIKey: async (e) => {
    await B.set((t) => ({
      ...t,
      apiKey: e
    }));
  },
  // 更新AI提供商
  updateProvider: async (e, t, r) => {
    await B.set((s) => ({
      ...s,
      provider: e,
      ...t ? { model: t } : {},
      ...r ? { apiEndpoint: r } : { apiEndpoint: void 0 }
    }));
  },
  // 更新提示词
  updatePrompts: async (e, t) => {
    await B.set((r) => ({
      ...r,
      ...e !== void 0 ? { systemPrompt: e } : {},
      ...t !== void 0 ? { promptTemplate: t } : {}
    }));
  },
  // 更新预生成时间
  updatePreGenerateTime: async (e) => {
    await B.set((t) => ({
      ...t,
      preGenerateMinutes: Math.max(1, Math.min(30, e))
      // 限制在1-30分钟之间
    }));
  }
}, te = P("sound-settings-storage-key", {
  enabled: !0,
  // 默认启用声音
  volume: 0.5
  // 默认音量50%
}, {
  storageEnum: C.Local,
  liveUpdate: !0
}), ie = {
  ...te,
  // 启用/禁用声音
  enableSound: async (e) => {
    await te.set((t) => ({
      ...t,
      enabled: e
    }));
  },
  // 设置音量
  setVolume: async (e) => {
    const t = Math.max(0, Math.min(1, e));
    await te.set((r) => ({
      ...r,
      volume: t
    }));
  }
}, se = P("tts-config-storage-key", {
  enabled: !1,
  appid: "",
  token: "",
  cluster: "volcano_tts",
  voiceType: "zh_male_M392_conversation_wvae_bigtts",
  encoding: "mp3",
  speedRatio: 1,
  uid: "chrome_extension_user"
}, {
  storageEnum: C.Local,
  liveUpdate: !0
}), G = {
  ...se,
  // 更新配置
  updateConfig: async (e) => {
    await se.set((t) => ({
      ...t,
      ...e
    }));
  },
  // 检查是否已配置
  isConfigured: async () => {
    const e = await se.get();
    return e.enabled && e.appid.length > 0 && e.token.length > 0;
  }
}, Ce = {
  domain: "bilibili.com",
  getSelectors() {
    return ["#nav-searchform", ".center-search__bar"];
  }
}, ke = {
  domain: "baidu.com",
  getSelectors() {
    return ["#s-hotsearch-wrapper", "#con-ceiling-wrapper"];
  },
  getCustomHandler(e) {
    return function(r) {
      console.log("Applying Baidu specific study mode with selectors:", r);
      const s = document.createElement("div");
      s.style.position = "fixed", s.style.top = "70px", s.style.right = "10px", s.style.backgroundColor = "rgba(0, 128, 0, 0.8)", s.style.color = "white", s.style.padding = "12px 16px", s.style.borderRadius = "8px", s.style.zIndex = "9999999", s.style.fontSize = "14px", s.style.fontFamily = "Arial, sans-serif", s.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.2)", s.style.width = "200px", s.style.textAlign = "center";
      const n = document.createElement("div");
      n.textContent = "专注提醒", n.style.fontWeight = "bold", n.style.fontSize = "16px", n.style.marginBottom = "8px", s.appendChild(n);
      const o = document.createElement("div");
      o.textContent = "已为您屏蔽热搜和顶部导航，专注于当前任务", s.appendChild(o), document.body.appendChild(s), setTimeout(() => {
        s.style.transition = "opacity 1s", s.style.opacity = "0", setTimeout(() => {
          document.body.contains(s) && document.body.removeChild(s);
        }, 1e3);
      }, 3e4), r.forEach((c) => {
        try {
          const p = document.querySelectorAll(c);
          p.forEach((A) => {
            A instanceof HTMLElement && (A.style.display = "none", A.dataset.studyModeDisabled = "true");
          }), console.log(`Disabled ${p.length} elements with selector: ${c}`);
        } catch (p) {
          console.error(`Error disabling elements with selector ${c}:`, p);
        }
      });
      const d = new MutationObserver((c) => {
        let p = !1;
        c.forEach((A) => {
          A.type === "childList" && A.addedNodes.length > 0 && (p = !0);
        }), p && r.forEach((A) => {
          try {
            document.querySelectorAll(A).forEach((k) => {
              k instanceof HTMLElement && !k.dataset.studyModeDisabled && (k.style.display = "none", k.dataset.studyModeDisabled = "true");
            });
          } catch (T) {
            console.error(`Error in mutation observer for selector ${A}:`, T);
          }
        });
      });
      d.observe(document.documentElement, {
        childList: !0,
        subtree: !0
      }), window.__studyModeObserver = d;
    };
  }
}, Me = [
  Ce,
  ke
  // 在这里添加更多网站处理器
];
function Ae(e) {
  try {
    const t = new URL(e);
    return Me.find((r) => t.hostname.includes(r.domain));
  } catch {
    return;
  }
}
const j = class j {
  /**
   * 生成语音并返回base64音频数据
   */
  static async generateSpeech(t) {
    var r;
    try {
      const s = await G.get();
      if (!s.enabled)
        return console.log("TTS is disabled"), null;
      if (!s.appid || !s.token)
        return console.error("TTS configuration is incomplete"), null;
      const n = `chrome_ext_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`, o = {
        app: {
          appid: s.appid,
          cluster: s.cluster
        },
        user: {
          uid: s.uid
        },
        audio: {
          voice_type: s.voiceType,
          encoding: s.encoding,
          speed_ratio: s.speedRatio
        },
        request: {
          reqid: n,
          text: t,
          operation: "query"
        }
      };
      console.log("Sending TTS request:", { reqid: n, text: t });
      const d = await fetch(j.API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer; ${s.token}`
        },
        body: JSON.stringify(o)
      });
      if (!d.ok)
        throw new Error(`HTTP error! status: ${d.status}`);
      const c = await d.json();
      if (c.code !== 3e3)
        throw new Error(`TTS API error: ${c.message} (code: ${c.code})`);
      if (!c.data)
        throw new Error("No audio data received from TTS API");
      return console.log("TTS generation successful:", {
        reqid: c.reqid,
        duration: (r = c.addition) == null ? void 0 : r.duration,
        dataLength: c.data.length
      }), c.data;
    } catch (s) {
      return console.error("Error generating speech:", s), null;
    }
  }
  /**
   * 测试TTS配置是否有效
   */
  static async testConfiguration() {
    try {
      return await j.generateSpeech("测试语音合成") !== null;
    } catch (t) {
      return console.error("TTS configuration test failed:", t), !1;
    }
  }
};
le(j, "API_URL", "https://openspeech.bytedance.com/api/v1/tts");
let Y = j;
async function ye(e) {
  try {
    if (!(await G.get()).enabled || !await G.isConfigured())
      return console.log("TTS not enabled or not configured, falling back to normal sound"), await K();
    const r = await ie.get();
    if (!r.enabled) {
      console.log("Notification sound is disabled");
      return;
    }
    console.log("Generating TTS for text:", e);
    const s = await Y.generateSpeech(e);
    if (!s)
      return console.log("TTS generation failed, falling back to normal sound"), await K();
    await ae();
    const n = await chrome.runtime.sendMessage({
      type: "PLAY_TTS_SOUND",
      volume: r.volume,
      audioData: s
    });
    n && n.success ? console.log("TTS notification played successfully with volume:", r.volume) : (console.error("Failed to play TTS notification:", n == null ? void 0 : n.error), await K());
  } catch (t) {
    console.error("Error playing TTS notification:", t), await K();
  }
}
async function K() {
  try {
    const e = await ie.get();
    if (!e.enabled) {
      console.log("Notification sound is disabled");
      return;
    }
    await ae();
    const t = await chrome.runtime.sendMessage({
      type: "PLAY_NOTIFICATION_SOUND",
      volume: e.volume,
      audioUrl: chrome.runtime.getURL("notification.mp3")
    });
    t && t.success ? console.log("Notification sound played successfully with volume:", e.volume) : console.error("Failed to play notification sound:", t == null ? void 0 : t.error);
  } catch (e) {
    console.error("Error playing notification sound:", e);
  }
}
async function ae() {
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
Ee.get().then((e) => {
  console.log("Theme loaded:", e);
});
let S = !1, Z = [], J = [], U = {};
async function ce(e) {
  try {
    const t = await q.get();
    if (!t.enabled || !t.apiKey) {
      console.log("AI service not enabled or no API key, skipping notification pre-generation");
      return;
    }
    if (await E.getNotification()) {
      console.log("Already have a cached notification, skipping pre-generation");
      return;
    }
    if (await E.isGenerating()) {
      console.log("Already generating a notification, skipping");
      return;
    }
    if (await E.setGenerating(!0), console.log("Marked notification for pre-generation, duration:", e), !await Ue()) {
      console.log("No popup open, using fallback message");
      const o = [
        "休息一下吧！你已经专注工作了一段时间。",
        "该活动一下了！站起来伸展一下身体吧。",
        "休息是为了更好的工作，现在是放松的时候了。",
        "你的大脑需要休息，去喝杯水吧！",
        "专注时间结束，给自己一个小奖励吧！"
      ], d = Math.floor(Math.random() * o.length), c = o[d];
      await E.saveNotification(c), await E.setGenerating(!1);
    }
    return !0;
  } catch (t) {
    return console.error("Error pre-generating notification:", t), await E.setGenerating(!1), !1;
  }
}
async function Ue() {
  try {
    const e = await chrome.runtime.sendMessage({ type: "PING_POPUP" });
    return e && e.type === "PONG_POPUP";
  } catch {
    return !1;
  }
}
async function Ne() {
  const e = await z.get();
  S = e.isActive;
  const t = await ne.get();
  return Z = t.urls || [], J = t.studyModeUrls || [], U = t.studyModeSelectors || {}, console.log("Focus mode active:", S), console.log("Blocked URLs:", Z), console.log("Study Mode URLs:", J), console.log("Study Mode Selectors:", U), pe(S), { isFocusModeActive: S, focusConfig: e };
}
function pe(e) {
  e ? (chrome.action.setBadgeBackgroundColor({ color: "#E53935" }), chrome.action.setBadgeText({ text: "专注" })) : chrome.action.setBadgeText({ text: "" });
}
chrome.storage.onChanged.addListener((e, t) => {
  var r, s;
  if (t === "local") {
    if (e["focus-time-storage-key"]) {
      const n = e["focus-time-storage-key"].newValue;
      if (n) {
        if (S = n.isActive, pe(S), S && !((r = e["focus-time-storage-key"].oldValue) != null && r.isActive)) {
          const o = `专注模式已启动，专注时间：${n.duration}分钟。加油，保持专注！`;
          chrome.notifications.create("focus-start", {
            type: "basic",
            iconUrl: chrome.runtime.getURL("spring-128.png"),
            title: "专注模式已启动",
            message: `专注时间：${n.duration}分钟`
          }), ye(o), xe(), q.get().then((d) => {
            d.enabled && ce(n.duration);
          });
        }
        !S && ((s = e["focus-time-storage-key"].oldValue) != null && s.isActive) && (Ie(), E.clearNotification());
      }
    }
    if (e["blocked-urls-storage-key"]) {
      const n = e["blocked-urls-storage-key"].newValue;
      n && (Z = n.urls || [], J = n.studyModeUrls || [], U = n.studyModeSelectors || {});
    }
    e["ai-config-storage-key"] && e["ai-config-storage-key"].newValue && console.log("AI configuration changed");
  }
});
chrome.tabs.onUpdated.addListener((e, t, r) => {
  t.status === "complete" && r.url && he(e, r.url);
});
chrome.tabs.onActivated.addListener((e) => {
  chrome.tabs.get(e.tabId, (t) => {
    t.url && he(t.id, t.url);
  });
});
async function he(e, t) {
  if (!S) return;
  const r = Pe(t), s = Le(t);
  if (r)
    await chrome.scripting.executeScript({
      target: { tabId: e },
      func: _e
    });
  else if (s) {
    const n = Ae(t), o = Re(t);
    o && o.length > 0 && (n && n.getCustomHandler ? await chrome.scripting.executeScript({
      target: { tabId: e },
      func: n.getCustomHandler(e),
      args: [o]
    }) : await chrome.scripting.executeScript({
      target: { tabId: e },
      func: Oe,
      args: [o]
    }));
  }
}
function Pe(e) {
  try {
    const t = new URL(e);
    return Z.some((r) => {
      try {
        const s = new URL(r);
        return t.hostname.includes(s.hostname);
      } catch {
        return e.includes(r);
      }
    });
  } catch {
    return !1;
  }
}
function Le(e) {
  try {
    const t = new URL(e);
    return J.some((r) => {
      try {
        const s = new URL(r);
        return t.hostname.includes(s.hostname);
      } catch {
        return e.includes(r);
      }
    });
  } catch {
    return !1;
  }
}
function Re(e) {
  try {
    const t = new URL(e), r = Ae(e);
    if (r)
      return r.getSelectors();
    for (const s in U)
      if (e === s)
        return U[s];
    for (const s in U)
      try {
        const n = new URL(s);
        if (t.hostname.includes(n.hostname))
          return U[s];
      } catch {
        if (e.includes(s))
          return U[s];
      }
    return [];
  } catch {
    return [];
  }
}
function _e() {
  const e = document.createElement("div");
  e.style.position = "fixed", e.style.top = "0", e.style.left = "0", e.style.width = "100%", e.style.height = "100%", e.style.backgroundColor = "rgba(0, 0, 0, 0.9)", e.style.zIndex = "9999999", e.style.display = "flex", e.style.flexDirection = "column", e.style.alignItems = "center", e.style.justifyContent = "center", e.style.color = "white", e.style.fontFamily = "Arial, sans-serif", e.style.fontSize = "16px", e.style.padding = "20px", e.style.boxSizing = "border-box";
  const t = document.createElement("h1");
  t.textContent = "专注模式已启动", t.style.marginBottom = "20px", t.style.fontSize = "24px", t.style.fontWeight = "bold";
  const r = document.createElement("p");
  r.textContent = "当前网站在专注模式下被禁用", r.style.marginBottom = "30px", r.style.fontSize = "18px";
  const s = document.createElement("button");
  s.textContent = "返回上一页", s.style.padding = "10px 20px", s.style.backgroundColor = "#4A90E2", s.style.border = "none", s.style.borderRadius = "4px", s.style.color = "white", s.style.cursor = "pointer", s.style.fontSize = "16px", s.onclick = () => {
    history.back(), document.body.removeChild(e);
  }, e.appendChild(t), e.appendChild(r), e.appendChild(s), document.body.appendChild(e);
}
function Oe(e) {
  console.log("Applying study mode with selectors:", e);
  const t = document.createElement("div");
  t.style.position = "fixed", t.style.top = "10px", t.style.right = "10px", t.style.backgroundColor = "rgba(0, 128, 0, 0.8)", t.style.color = "white", t.style.padding = "8px 12px", t.style.borderRadius = "4px", t.style.zIndex = "9999998", t.style.fontSize = "14px", t.style.fontFamily = "Arial, sans-serif", t.textContent = "学习模式已启用", document.body.appendChild(t), setTimeout(() => {
    t.style.opacity = "0", t.style.transition = "opacity 0.5s", setTimeout(() => {
      document.body.contains(t) && document.body.removeChild(t);
    }, 500);
  }, 5e3), e.forEach((s) => {
    try {
      const n = document.querySelectorAll(s);
      n.forEach((o) => {
        if (o instanceof HTMLElement) {
          const d = o.style.pointerEvents, c = o.style.opacity, p = o.style.cursor;
          o.style.pointerEvents = "none", o.style.opacity = "0.5", o.style.cursor = "not-allowed", (o.tagName === "INPUT" || o.tagName === "TEXTAREA" || o.tagName === "BUTTON") && (o.style.fontSize = o.style.fontSize || "inherit"), o.dataset.studyModeDisabled = "true", o.dataset.originalPointerEvents = d, o.dataset.originalOpacity = c, o.dataset.originalCursor = p;
        }
      }), console.log(`Disabled ${n.length} elements with selector: ${s}`);
    } catch (n) {
      console.error(`Error disabling elements with selector ${s}:`, n);
    }
  });
  const r = new MutationObserver((s) => {
    let n = !1;
    s.forEach((o) => {
      o.type === "childList" && o.addedNodes.length > 0 && (n = !0);
    }), n && e.forEach((o) => {
      try {
        document.querySelectorAll(o).forEach((c) => {
          c instanceof HTMLElement && !c.dataset.studyModeDisabled && (c.style.pointerEvents = "none", c.style.opacity = "0.5", c.style.cursor = "not-allowed", (c.tagName === "INPUT" || c.tagName === "TEXTAREA" || c.tagName === "BUTTON") && (c.style.fontSize = c.style.fontSize || "inherit"), c.dataset.studyModeDisabled = "true");
        });
      } catch (d) {
        console.error(`Error in mutation observer for selector ${o}:`, d);
      }
    });
  });
  r.observe(document.documentElement, {
    childList: !0,
    subtree: !0
  }), window.__studyModeObserver = r;
}
async function Be() {
  if (S)
    try {
      const e = await z.getRemainingTime(), t = await q.get();
      if (e <= 0 && S) {
        console.log("Focus timer ended, stopping focus mode automatically");
        let r = "休息一下吧！";
        if (t.enabled)
          try {
            const s = await E.getNotification();
            s && (r = s, await E.clearNotification());
          } catch (s) {
            console.error("Error getting cached notification:", s);
          }
        await z.stopFocus(), chrome.notifications.create("focus-end", {
          type: "basic",
          iconUrl: chrome.runtime.getURL("spring-128.png"),
          title: "专注模式已结束",
          message: r
        }), ye(r);
      } else if (t.enabled && e > 0 && e <= t.preGenerateMinutes * 60 && !await E.getNotification()) {
        const s = await z.get();
        await ce(s.duration);
      }
    } catch (e) {
      console.error("Error checking focus timer:", e);
    }
}
let $ = null;
function xe() {
  $ || ($ = setInterval(Be, 1e3), console.log("Started focus timer check interval"));
}
function Ie() {
  $ && (clearInterval($), $ = null, console.log("Stopped focus timer check interval"));
}
async function De() {
  await Ne();
  const e = await q.get();
  if (console.log("AI notifications enabled:", e.enabled), S && (xe(), (await q.get()).enabled)) {
    const r = await z.get();
    await ce(r.duration);
  }
  console.log("Focus mode background script loaded with AI integration");
}
chrome.runtime.onMessage.addListener((e, t, r) => e.type === "TEST_TTS" ? (Fe(e.text).then((s) => r(s)).catch((s) => {
  console.error("TTS test error:", s), r({ success: !1, error: s.message });
}), !0) : !1);
async function Fe(e) {
  try {
    if (!(await G.get()).enabled || !await G.isConfigured())
      return { success: !1, error: "TTS未启用或未配置" };
    const r = await Y.generateSpeech(e);
    if (!r)
      return { success: !1, error: "语音生成失败" };
    const s = await ie.get();
    if (!s.enabled)
      return { success: !1, error: "声音已禁用" };
    await ae(), await new Promise((n) => setTimeout(n, 200));
    try {
      const o = await new Promise((d, c) => {
        const p = setTimeout(() => {
          c(new Error("消息发送超时"));
        }, 5e3);
        chrome.runtime.sendMessage(
          {
            type: "PLAY_TTS_SOUND",
            volume: s.volume,
            audioData: r
          },
          (A) => {
            clearTimeout(p), chrome.runtime.lastError ? c(new Error(chrome.runtime.lastError.message)) : d(A);
          }
        );
      });
      return o && o.success ? { success: !0 } : { success: !1, error: (o == null ? void 0 : o.error) || "播放失败" };
    } catch (n) {
      return console.error("Message sending error:", n), { success: !1, error: "无法与音频播放器通信: " + n.message };
    }
  } catch (t) {
    return console.error("TTS test error:", t), { success: !1, error: t.message };
  }
}
De().catch((e) => {
  console.error("Error during initialization:", e);
});
