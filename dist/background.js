var W = { exports: {} }, de = W.exports, te;
function me() {
  return te || (te = 1, function(e, t) {
    (function(r, s) {
      s(e);
    })(typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : de, function(r) {
      if (!(globalThis.chrome && globalThis.chrome.runtime && globalThis.chrome.runtime.id))
        throw new Error("This script should only be loaded in a browser extension.");
      if (globalThis.browser && globalThis.browser.runtime && globalThis.browser.runtime.id)
        r.exports = globalThis.browser;
      else {
        const s = "The message port closed before a response was received.", a = (o) => {
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
            constructor(i, c = void 0) {
              super(c), this.createItem = i;
            }
            get(i) {
              return this.has(i) || this.set(i, this.createItem(i)), super.get(i);
            }
          }
          const p = (n) => n && typeof n == "object" && typeof n.then == "function", y = (n, i) => (...c) => {
            o.runtime.lastError ? n.reject(new Error(o.runtime.lastError.message)) : i.singleCallbackArg || c.length <= 1 && i.singleCallbackArg !== !1 ? n.resolve(c[0]) : n.resolve(c);
          }, E = (n) => n == 1 ? "argument" : "arguments", M = (n, i) => function(g, ...f) {
            if (f.length < i.minArgs)
              throw new Error(`Expected at least ${i.minArgs} ${E(i.minArgs)} for ${n}(), got ${f.length}`);
            if (f.length > i.maxArgs)
              throw new Error(`Expected at most ${i.maxArgs} ${E(i.maxArgs)} for ${n}(), got ${f.length}`);
            return new Promise((h, b) => {
              if (i.fallbackToNoCallback)
                try {
                  g[n](...f, y({
                    resolve: h,
                    reject: b
                  }, i));
                } catch (l) {
                  console.warn(`${n} API method doesn't seem to support the callback parameter, falling back to call it without a callback: `, l), g[n](...f), i.fallbackToNoCallback = !1, i.noCallback = !0, h();
                }
              else i.noCallback ? (g[n](...f), h()) : g[n](...f, y({
                resolve: h,
                reject: b
              }, i));
            });
          }, $ = (n, i, c) => new Proxy(i, {
            apply(g, f, h) {
              return c.call(f, n, ...h);
            }
          });
          let P = Function.call.bind(Object.prototype.hasOwnProperty);
          const L = (n, i = {}, c = {}) => {
            let g = /* @__PURE__ */ Object.create(null), f = {
              has(b, l) {
                return l in n || l in g;
              },
              get(b, l, w) {
                if (l in g)
                  return g[l];
                if (!(l in n))
                  return;
                let A = n[l];
                if (typeof A == "function")
                  if (typeof i[l] == "function")
                    A = $(n, n[l], i[l]);
                  else if (P(c, l)) {
                    let R = M(l, c[l]);
                    A = $(n, n[l], R);
                  } else
                    A = A.bind(n);
                else if (typeof A == "object" && A !== null && (P(i, l) || P(c, l)))
                  A = L(A, i[l], c[l]);
                else if (P(c, "*"))
                  A = L(A, i[l], c["*"]);
                else
                  return Object.defineProperty(g, l, {
                    configurable: !0,
                    enumerable: !0,
                    get() {
                      return n[l];
                    },
                    set(R) {
                      n[l] = R;
                    }
                  }), A;
                return g[l] = A, A;
              },
              set(b, l, w, A) {
                return l in g ? g[l] = w : n[l] = w, !0;
              },
              defineProperty(b, l, w) {
                return Reflect.defineProperty(g, l, w);
              },
              deleteProperty(b, l) {
                return Reflect.deleteProperty(g, l);
              }
            }, h = Object.create(n);
            return new Proxy(h, f);
          }, F = (n) => ({
            addListener(i, c, ...g) {
              i.addListener(n.get(c), ...g);
            },
            hasListener(i, c) {
              return i.hasListener(n.get(c));
            },
            removeListener(i, c) {
              i.removeListener(n.get(c));
            }
          }), H = new d((n) => typeof n != "function" ? n : function(c) {
            const g = L(c, {}, {
              getContent: {
                minArgs: 0,
                maxArgs: 0
              }
            });
            n(g);
          }), I = new d((n) => typeof n != "function" ? n : function(c, g, f) {
            let h = !1, b, l = new Promise((_) => {
              b = function(C) {
                h = !0, _(C);
              };
            }), w;
            try {
              w = n(c, g, b);
            } catch (_) {
              w = Promise.reject(_);
            }
            const A = w !== !0 && p(w);
            if (w !== !0 && !A && !h)
              return !1;
            const R = (_) => {
              _.then((C) => {
                f(C);
              }, (C) => {
                let Z;
                C && (C instanceof Error || typeof C.message == "string") ? Z = C.message : Z = "An unexpected error occurred", f({
                  __mozWebExtensionPolyfillReject__: !0,
                  message: Z
                });
              }).catch((C) => {
                console.error("Failed to send onMessage rejected reply", C);
              });
            };
            return R(A ? w : l), !0;
          }), m = ({
            reject: n,
            resolve: i
          }, c) => {
            o.runtime.lastError ? o.runtime.lastError.message === s ? i() : n(new Error(o.runtime.lastError.message)) : c && c.__mozWebExtensionPolyfillReject__ ? n(new Error(c.message)) : i(c);
          }, N = (n, i, c, ...g) => {
            if (g.length < i.minArgs)
              throw new Error(`Expected at least ${i.minArgs} ${E(i.minArgs)} for ${n}(), got ${g.length}`);
            if (g.length > i.maxArgs)
              throw new Error(`Expected at most ${i.maxArgs} ${E(i.maxArgs)} for ${n}(), got ${g.length}`);
            return new Promise((f, h) => {
              const b = m.bind(null, {
                resolve: f,
                reject: h
              });
              g.push(b), c.sendMessage(...g);
            });
          }, ge = {
            devtools: {
              network: {
                onRequestFinished: F(H)
              }
            },
            runtime: {
              onMessage: F(I),
              onMessageExternal: F(I),
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
          }, L(o, ge, u);
        };
        r.exports = a(chrome);
      }
    });
  }(W)), W.exports;
}
me();
var T;
(function(e) {
  e.Local = "local", e.Sync = "sync", e.Managed = "managed", e.Session = "session";
})(T || (T = {}));
var J;
(function(e) {
  e.ExtensionPagesOnly = "TRUSTED_CONTEXTS", e.ExtensionPagesAndContentScripts = "TRUSTED_AND_UNTRUSTED_CONTEXTS";
})(J || (J = {}));
const x = globalThis.chrome, se = async (e, t) => {
  const r = (a) => typeof a == "function", s = (a) => a instanceof Promise;
  return r(e) ? (s(e), e(t)) : e;
};
let re = !1;
function ne(e) {
  if (x && x.storage[e] === void 0)
    throw new Error(`Check your storage permission in manifest.json: ${e} is not defined`);
}
function G(e, t, r) {
  var H, I;
  let s = null, a = !1, o = [];
  const u = (r == null ? void 0 : r.storageEnum) ?? T.Local, d = (r == null ? void 0 : r.liveUpdate) ?? !1, p = ((H = r == null ? void 0 : r.serialization) == null ? void 0 : H.serialize) ?? ((m) => m), y = ((I = r == null ? void 0 : r.serialization) == null ? void 0 : I.deserialize) ?? ((m) => m);
  re === !1 && u === T.Session && (r == null ? void 0 : r.sessionAccessForContentScripts) === !0 && (ne(u), x == null || x.storage[u].setAccessLevel({
    accessLevel: J.ExtensionPagesAndContentScripts
  }).catch((m) => {
    console.warn(m), console.warn("Please call setAccessLevel into different context, like a background script.");
  }), re = !0);
  const E = async () => {
    ne(u);
    const m = await (x == null ? void 0 : x.storage[u].get([e]));
    return m ? y(m[e]) ?? t : t;
  }, M = () => {
    o.forEach((m) => m());
  }, $ = async (m) => {
    a || (s = await E()), s = await se(m, s), await (x == null ? void 0 : x.storage[u].set({ [e]: p(s) })), M();
  }, P = (m) => (o = [...o, m], () => {
    o = o.filter((N) => N !== m);
  }), L = () => s;
  E().then((m) => {
    s = m, a = !0, M();
  });
  async function F(m) {
    if (m[e] === void 0)
      return;
    const N = y(m[e].newValue);
    s !== N && (s = await se(N, s), M());
  }
  return d && (x == null || x.storage[u].onChanged.addListener(F)), {
    get: E,
    set: $,
    getSnapshot: L,
    subscribe: P
  };
}
const oe = G("theme-storage-key", "light", {
  storageEnum: T.Local,
  liveUpdate: !0
}), ue = {
  ...oe,
  toggle: async () => {
    await oe.set((e) => e === "light" ? "dark" : "light");
  }
}, q = G("focus-time-storage-key", {
  duration: 25,
  // 默认25分钟
  isActive: !1
}, {
  storageEnum: T.Local,
  liveUpdate: !0
}), k = G("blocked-urls-storage-key", {
  urls: [],
  studyModeUrls: [],
  studyModeSelectors: {}
}, {
  storageEnum: T.Local,
  liveUpdate: !0
});
(async () => {
  try {
    const e = await k.get();
    (!e.studyModeUrls || !e.studyModeSelectors) && (console.log("Migrating blocked URLs storage structure..."), await k.set((t) => ({
      urls: t.urls || [],
      studyModeUrls: t.studyModeUrls || [],
      studyModeSelectors: t.studyModeSelectors || {}
    })), console.log("Migration complete."));
  } catch (e) {
    console.error("Error migrating blocked URLs storage:", e);
  }
})();
const z = {
  ...q,
  startFocus: async (e) => {
    const t = Date.now();
    await q.set({
      duration: e,
      isActive: !0,
      startTime: t,
      endTime: t + e * 60 * 1e3
    });
  },
  stopFocus: async () => {
    await q.set((e) => ({
      ...e,
      isActive: !1,
      startTime: void 0,
      endTime: void 0
    }));
  },
  getRemainingTime: async () => {
    const e = await q.get();
    if (!e.isActive || !e.endTime)
      return 0;
    const t = Math.max(0, e.endTime - Date.now());
    return Math.floor(t / 1e3);
  }
}, Q = {
  ...k,
  addUrl: async (e) => {
    await k.set((t) => {
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
    await k.set((t) => ({
      ...t,
      urls: t.urls.filter((r) => r !== e)
    }));
  },
  clearUrls: async () => {
    await k.set((e) => ({
      ...e,
      urls: []
    }));
  },
  addStudyModeUrl: async (e) => {
    await k.set((t) => {
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
    await k.set((t) => ({
      ...t,
      studyModeUrls: t.studyModeUrls.filter((r) => r !== e)
    }));
  },
  toggleUrlMode: async (e, t) => {
    t ? await Q.addStudyModeUrl(e) : await Q.addUrl(e);
  },
  addStudyModeSelector: async (e, t) => {
    await k.set((r) => {
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
    await k.set((r) => {
      const s = r.studyModeSelectors[e] || [];
      return {
        ...r,
        studyModeSelectors: {
          ...r.studyModeSelectors,
          [e]: s.filter((a) => a !== t)
        }
      };
    });
  },
  clearStudyModeSelectors: async (e) => {
    await k.set((t) => {
      const { [e]: r, ...s } = t.studyModeSelectors;
      return {
        ...t,
        studyModeSelectors: s
      };
    });
  }
}, O = G("notification-cache-storage-key", {
  isGenerating: !1
}, {
  storageEnum: T.Local,
  liveUpdate: !0
}), v = {
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
    return e.pendingNotification ? e.expiresAt && e.expiresAt < Date.now() ? (await v.clearNotification(), null) : e.pendingNotification : null;
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
var Y;
(function(e) {
  e.DEEPSEEK = "deepseek", e.OPENAI = "openai";
})(Y || (Y = {}));
const B = G("ai-config-storage-key", {
  enabled: !1,
  provider: Y.DEEPSEEK,
  model: "deepseek-chat",
  apiKey: "",
  preGenerateMinutes: 5
  // 默认提前5分钟生成
}, {
  storageEnum: T.Local,
  liveUpdate: !0
}), j = {
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
}, Ae = {
  domain: "bilibili.com",
  getSelectors() {
    return ["#nav-searchform", ".center-search__bar"];
  }
}, fe = {
  domain: "baidu.com",
  getSelectors() {
    return ["#s-hotsearch-wrapper", "#con-ceiling-wrapper"];
  },
  getCustomHandler(e) {
    return function(r) {
      console.log("Applying Baidu specific study mode with selectors:", r);
      const s = document.createElement("div");
      s.style.position = "fixed", s.style.top = "70px", s.style.right = "10px", s.style.backgroundColor = "rgba(0, 128, 0, 0.8)", s.style.color = "white", s.style.padding = "12px 16px", s.style.borderRadius = "8px", s.style.zIndex = "9999999", s.style.fontSize = "14px", s.style.fontFamily = "Arial, sans-serif", s.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.2)", s.style.width = "200px", s.style.textAlign = "center";
      const a = document.createElement("div");
      a.textContent = "专注提醒", a.style.fontWeight = "bold", a.style.fontSize = "16px", a.style.marginBottom = "8px", s.appendChild(a);
      const o = document.createElement("div");
      o.textContent = "已为您屏蔽热搜和顶部导航，专注于当前任务", s.appendChild(o), document.body.appendChild(s), setTimeout(() => {
        s.style.transition = "opacity 1s", s.style.opacity = "0", setTimeout(() => {
          document.body.contains(s) && document.body.removeChild(s);
        }, 1e3);
      }, 3e4), r.forEach((d) => {
        try {
          const p = document.querySelectorAll(d);
          p.forEach((y) => {
            y instanceof HTMLElement && (y.style.display = "none", y.dataset.studyModeDisabled = "true");
          }), console.log(`Disabled ${p.length} elements with selector: ${d}`);
        } catch (p) {
          console.error(`Error disabling elements with selector ${d}:`, p);
        }
      });
      const u = new MutationObserver((d) => {
        let p = !1;
        d.forEach((y) => {
          y.type === "childList" && y.addedNodes.length > 0 && (p = !0);
        }), p && r.forEach((y) => {
          try {
            document.querySelectorAll(y).forEach((M) => {
              M instanceof HTMLElement && !M.dataset.studyModeDisabled && (M.style.display = "none", M.dataset.studyModeDisabled = "true");
            });
          } catch (E) {
            console.error(`Error in mutation observer for selector ${y}:`, E);
          }
        });
      });
      u.observe(document.documentElement, {
        childList: !0,
        subtree: !0
      }), window.__studyModeObserver = u;
    };
  }
}, ye = [
  Ae,
  fe
  // 在这里添加更多网站处理器
];
function ie(e) {
  try {
    const t = new URL(e);
    return ye.find((r) => t.hostname.includes(r.domain));
  } catch {
    return;
  }
}
ue.get().then((e) => {
  console.log("Theme loaded:", e);
});
let S = !1, V = [], K = [], U = {};
async function ee(e) {
  try {
    const t = await j.get();
    if (!t.enabled || !t.apiKey) {
      console.log("AI service not enabled or no API key, skipping notification pre-generation");
      return;
    }
    if (await v.getNotification()) {
      console.log("Already have a cached notification, skipping pre-generation");
      return;
    }
    if (await v.isGenerating()) {
      console.log("Already generating a notification, skipping");
      return;
    }
    if (await v.setGenerating(!0), console.log("Marked notification for pre-generation, duration:", e), !await xe()) {
      console.log("No popup open, using fallback message");
      const o = [
        "休息一下吧！你已经专注工作了一段时间。",
        "该活动一下了！站起来伸展一下身体吧。",
        "休息是为了更好的工作，现在是放松的时候了。",
        "你的大脑需要休息，去喝杯水吧！",
        "专注时间结束，给自己一个小奖励吧！"
      ], u = Math.floor(Math.random() * o.length), d = o[u];
      await v.saveNotification(d), await v.setGenerating(!1);
    }
    return !0;
  } catch (t) {
    return console.error("Error pre-generating notification:", t), await v.setGenerating(!1), !1;
  }
}
async function xe() {
  try {
    const e = await chrome.runtime.sendMessage({ type: "PING_POPUP" });
    return e && e.type === "PONG_POPUP";
  } catch {
    return !1;
  }
}
async function pe() {
  const e = await z.get();
  S = e.isActive;
  const t = await Q.get();
  return V = t.urls || [], K = t.studyModeUrls || [], U = t.studyModeSelectors || {}, console.log("Focus mode active:", S), console.log("Blocked URLs:", V), console.log("Study Mode URLs:", K), console.log("Study Mode Selectors:", U), ae(S), { isFocusModeActive: S, focusConfig: e };
}
function ae(e) {
  e ? (chrome.action.setBadgeBackgroundColor({ color: "#E53935" }), chrome.action.setBadgeText({ text: "专注" })) : chrome.action.setBadgeText({ text: "" });
}
chrome.storage.onChanged.addListener((e, t) => {
  var r, s;
  if (t === "local") {
    if (e["focus-time-storage-key"]) {
      const a = e["focus-time-storage-key"].newValue;
      a && (S = a.isActive, ae(S), S && !((r = e["focus-time-storage-key"].oldValue) != null && r.isActive) && (chrome.notifications.create("focus-start", {
        type: "basic",
        iconUrl: chrome.runtime.getURL("spring-128.png"),
        title: "专注模式已启动",
        message: `专注时间：${a.duration}分钟`
      }), ce(), j.get().then((o) => {
        o.enabled && ee(a.duration);
      })), !S && ((s = e["focus-time-storage-key"].oldValue) != null && s.isActive) && (ve(), v.clearNotification()));
    }
    if (e["blocked-urls-storage-key"]) {
      const a = e["blocked-urls-storage-key"].newValue;
      a && (V = a.urls || [], K = a.studyModeUrls || [], U = a.studyModeSelectors || {});
    }
    e["ai-config-storage-key"] && e["ai-config-storage-key"].newValue && console.log("AI configuration changed");
  }
});
chrome.tabs.onUpdated.addListener((e, t, r) => {
  t.status === "complete" && r.url && le(e, r.url);
});
chrome.tabs.onActivated.addListener((e) => {
  chrome.tabs.get(e.tabId, (t) => {
    t.url && le(t.id, t.url);
  });
});
async function le(e, t) {
  if (!S) return;
  const r = he(t), s = be(t);
  if (r)
    await chrome.scripting.executeScript({
      target: { tabId: e },
      func: Se
    });
  else if (s) {
    const a = ie(t), o = we(t);
    o && o.length > 0 && (a && a.getCustomHandler ? await chrome.scripting.executeScript({
      target: { tabId: e },
      func: a.getCustomHandler(e),
      args: [o]
    }) : await chrome.scripting.executeScript({
      target: { tabId: e },
      func: Ee,
      args: [o]
    }));
  }
}
function he(e) {
  try {
    const t = new URL(e);
    return V.some((r) => {
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
function be(e) {
  try {
    const t = new URL(e);
    return K.some((r) => {
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
function we(e) {
  try {
    const t = new URL(e), r = ie(e);
    if (r)
      return r.getSelectors();
    for (const s in U)
      if (e === s)
        return U[s];
    for (const s in U)
      try {
        const a = new URL(s);
        if (t.hostname.includes(a.hostname))
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
function Se() {
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
function Ee(e) {
  console.log("Applying study mode with selectors:", e);
  const t = document.createElement("div");
  t.style.position = "fixed", t.style.top = "10px", t.style.right = "10px", t.style.backgroundColor = "rgba(0, 128, 0, 0.8)", t.style.color = "white", t.style.padding = "8px 12px", t.style.borderRadius = "4px", t.style.zIndex = "9999998", t.style.fontSize = "14px", t.style.fontFamily = "Arial, sans-serif", t.textContent = "学习模式已启用", document.body.appendChild(t), setTimeout(() => {
    t.style.opacity = "0", t.style.transition = "opacity 0.5s", setTimeout(() => {
      document.body.contains(t) && document.body.removeChild(t);
    }, 500);
  }, 5e3), e.forEach((s) => {
    try {
      const a = document.querySelectorAll(s);
      a.forEach((o) => {
        if (o instanceof HTMLElement) {
          const u = o.style.pointerEvents, d = o.style.opacity, p = o.style.cursor;
          o.style.pointerEvents = "none", o.style.opacity = "0.5", o.style.cursor = "not-allowed", (o.tagName === "INPUT" || o.tagName === "TEXTAREA" || o.tagName === "BUTTON") && (o.style.fontSize = o.style.fontSize || "inherit"), o.dataset.studyModeDisabled = "true", o.dataset.originalPointerEvents = u, o.dataset.originalOpacity = d, o.dataset.originalCursor = p;
        }
      }), console.log(`Disabled ${a.length} elements with selector: ${s}`);
    } catch (a) {
      console.error(`Error disabling elements with selector ${s}:`, a);
    }
  });
  const r = new MutationObserver((s) => {
    let a = !1;
    s.forEach((o) => {
      o.type === "childList" && o.addedNodes.length > 0 && (a = !0);
    }), a && e.forEach((o) => {
      try {
        document.querySelectorAll(o).forEach((d) => {
          d instanceof HTMLElement && !d.dataset.studyModeDisabled && (d.style.pointerEvents = "none", d.style.opacity = "0.5", d.style.cursor = "not-allowed", (d.tagName === "INPUT" || d.tagName === "TEXTAREA" || d.tagName === "BUTTON") && (d.style.fontSize = d.style.fontSize || "inherit"), d.dataset.studyModeDisabled = "true");
        });
      } catch (u) {
        console.error(`Error in mutation observer for selector ${o}:`, u);
      }
    });
  });
  r.observe(document.documentElement, {
    childList: !0,
    subtree: !0
  }), window.__studyModeObserver = r;
}
async function ke() {
  if (S)
    try {
      const e = await z.getRemainingTime(), t = await j.get();
      if (e <= 0 && S) {
        console.log("Focus timer ended, stopping focus mode automatically");
        let r = "休息一下吧！";
        if (t.enabled)
          try {
            const s = await v.getNotification();
            s && (r = s, await v.clearNotification());
          } catch (s) {
            console.error("Error getting cached notification:", s);
          }
        await z.stopFocus(), chrome.notifications.create("focus-end", {
          type: "basic",
          iconUrl: chrome.runtime.getURL("spring-128.png"),
          title: "专注模式已结束",
          message: r
        });
      } else if (t.enabled && e > 0 && e <= t.preGenerateMinutes * 60 && !await v.getNotification()) {
        const s = await z.get();
        await ee(s.duration);
      }
    } catch (e) {
      console.error("Error checking focus timer:", e);
    }
}
let D = null;
function ce() {
  D || (D = setInterval(ke, 1e3), console.log("Started focus timer check interval"));
}
function ve() {
  D && (clearInterval(D), D = null, console.log("Stopped focus timer check interval"));
}
async function Me() {
  await pe();
  const e = await j.get();
  if (console.log("AI notifications enabled:", e.enabled), S && (ce(), (await j.get()).enabled)) {
    const r = await z.get();
    await ee(r.duration);
  }
  console.log("Focus mode background script loaded with AI integration");
}
Me().catch((e) => {
  console.error("Error during initialization:", e);
});
