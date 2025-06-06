var Ne = Object.defineProperty;
var Re = (r, e, t) => e in r ? Ne(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t;
var B = (r, e, t) => Re(r, typeof e != "symbol" ? e + "" : e, t);
var re = { exports: {} }, Le = re.exports, xe;
function _e() {
  return xe || (xe = 1, function(r, e) {
    (function(t, o) {
      o(r);
    })(typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : Le, function(t) {
      if (!(globalThis.chrome && globalThis.chrome.runtime && globalThis.chrome.runtime.id))
        throw new Error("This script should only be loaded in a browser extension.");
      if (globalThis.browser && globalThis.browser.runtime && globalThis.browser.runtime.id)
        t.exports = globalThis.browser;
      else {
        const o = "The message port closed before a response was received.", n = (i) => {
          const l = {
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
          if (Object.keys(l).length === 0)
            throw new Error("api-metadata.json has not been included in browser-polyfill");
          class s extends WeakMap {
            constructor(c, d = void 0) {
              super(d), this.createItem = c;
            }
            get(c) {
              return this.has(c) || this.set(c, this.createItem(c)), super.get(c);
            }
          }
          const u = (a) => a && typeof a == "object" && typeof a.then == "function", A = (a, c) => (...d) => {
            i.runtime.lastError ? a.reject(new Error(i.runtime.lastError.message)) : c.singleCallbackArg || d.length <= 1 && c.singleCallbackArg !== !1 ? a.resolve(d[0]) : a.resolve(d);
          }, h = (a) => a == 1 ? "argument" : "arguments", T = (a, c) => function(m, ...p) {
            if (p.length < c.minArgs)
              throw new Error(`Expected at least ${c.minArgs} ${h(c.minArgs)} for ${a}(), got ${p.length}`);
            if (p.length > c.maxArgs)
              throw new Error(`Expected at most ${c.maxArgs} ${h(c.maxArgs)} for ${a}(), got ${p.length}`);
            return new Promise((x, S) => {
              if (c.fallbackToNoCallback)
                try {
                  m[a](...p, A({
                    resolve: x,
                    reject: S
                  }, c));
                } catch (g) {
                  console.warn(`${a} API method doesn't seem to support the callback parameter, falling back to call it without a callback: `, g), m[a](...p), c.fallbackToNoCallback = !1, c.noCallback = !0, x();
                }
              else c.noCallback ? (m[a](...p), x()) : m[a](...p, A({
                resolve: x,
                reject: S
              }, c));
            });
          }, P = (a, c, d) => new Proxy(c, {
            apply(m, p, x) {
              return d.call(p, a, ...x);
            }
          });
          let M = Function.call.bind(Object.prototype.hasOwnProperty);
          const N = (a, c = {}, d = {}) => {
            let m = /* @__PURE__ */ Object.create(null), p = {
              has(S, g) {
                return g in a || g in m;
              },
              get(S, g, E) {
                if (g in m)
                  return m[g];
                if (!(g in a))
                  return;
                let y = a[g];
                if (typeof y == "function")
                  if (typeof c[g] == "function")
                    y = P(a, a[g], c[g]);
                  else if (M(d, g)) {
                    let $ = T(g, d[g]);
                    y = P(a, a[g], $);
                  } else
                    y = y.bind(a);
                else if (typeof y == "object" && y !== null && (M(c, g) || M(d, g)))
                  y = N(y, c[g], d[g]);
                else if (M(d, "*"))
                  y = N(y, c[g], d["*"]);
                else
                  return Object.defineProperty(m, g, {
                    configurable: !0,
                    enumerable: !0,
                    get() {
                      return a[g];
                    },
                    set($) {
                      a[g] = $;
                    }
                  }), y;
                return m[g] = y, y;
              },
              set(S, g, E, y) {
                return g in m ? m[g] = E : a[g] = E, !0;
              },
              defineProperty(S, g, E) {
                return Reflect.defineProperty(m, g, E);
              },
              deleteProperty(S, g) {
                return Reflect.deleteProperty(m, g);
              }
            }, x = Object.create(a);
            return new Proxy(x, p);
          }, k = (a) => ({
            addListener(c, d, ...m) {
              c.addListener(a.get(d), ...m);
            },
            hasListener(c, d) {
              return c.hasListener(a.get(d));
            },
            removeListener(c, d) {
              c.removeListener(a.get(d));
            }
          }), O = new s((a) => typeof a != "function" ? a : function(d) {
            const m = N(d, {}, {
              getContent: {
                minArgs: 0,
                maxArgs: 0
              }
            });
            a(m);
          }), H = new s((a) => typeof a != "function" ? a : function(d, m, p) {
            let x = !1, S, g = new Promise((q) => {
              S = function(C) {
                x = !0, q(C);
              };
            }), E;
            try {
              E = a(d, m, S);
            } catch (q) {
              E = Promise.reject(q);
            }
            const y = E !== !0 && u(E);
            if (E !== !0 && !y && !x)
              return !1;
            const $ = (q) => {
              q.then((C) => {
                p(C);
              }, (C) => {
                let ce;
                C && (C instanceof Error || typeof C.message == "string") ? ce = C.message : ce = "An unexpected error occurred", p({
                  __mozWebExtensionPolyfillReject__: !0,
                  message: ce
                });
              }).catch((C) => {
                console.error("Failed to send onMessage rejected reply", C);
              });
            };
            return $(y ? E : g), !0;
          }), f = ({
            reject: a,
            resolve: c
          }, d) => {
            i.runtime.lastError ? i.runtime.lastError.message === o ? c() : a(new Error(i.runtime.lastError.message)) : d && d.__mozWebExtensionPolyfillReject__ ? a(new Error(d.message)) : c(d);
          }, D = (a, c, d, ...m) => {
            if (m.length < c.minArgs)
              throw new Error(`Expected at least ${c.minArgs} ${h(c.minArgs)} for ${a}(), got ${m.length}`);
            if (m.length > c.maxArgs)
              throw new Error(`Expected at most ${c.maxArgs} ${h(c.maxArgs)} for ${a}(), got ${m.length}`);
            return new Promise((p, x) => {
              const S = f.bind(null, {
                resolve: p,
                reject: x
              });
              m.push(S), d.sendMessage(...m);
            });
          }, Me = {
            devtools: {
              network: {
                onRequestFinished: k(O)
              }
            },
            runtime: {
              onMessage: k(H),
              onMessageExternal: k(H),
              sendMessage: D.bind(null, "sendMessage", {
                minArgs: 1,
                maxArgs: 3
              })
            },
            tabs: {
              sendMessage: D.bind(null, "sendMessage", {
                minArgs: 2,
                maxArgs: 3
              })
            }
          }, ie = {
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
          return l.privacy = {
            network: {
              "*": ie
            },
            services: {
              "*": ie
            },
            websites: {
              "*": ie
            }
          }, N(i, Me, l);
        };
        t.exports = n(chrome);
      }
    });
  }(re)), re.exports;
}
_e();
var b;
(function(r) {
  r.Local = "local", r.Sync = "sync", r.Managed = "managed", r.Session = "session";
})(b || (b = {}));
var ue;
(function(r) {
  r.ExtensionPagesOnly = "TRUSTED_CONTEXTS", r.ExtensionPagesAndContentScripts = "TRUSTED_AND_UNTRUSTED_CONTEXTS";
})(ue || (ue = {}));
const w = globalThis.chrome, Se = async (r, e) => {
  const t = (n) => typeof n == "function", o = (n) => n instanceof Promise;
  return t(r) ? (o(r), r(e)) : r;
};
let Ee = !1;
function be(r) {
  if (w && w.storage[r] === void 0)
    throw new Error(`Check your storage permission in manifest.json: ${r} is not defined`);
}
function I(r, e, t) {
  var O, H;
  let o = null, n = !1, i = [];
  const l = (t == null ? void 0 : t.storageEnum) ?? b.Local, s = (t == null ? void 0 : t.liveUpdate) ?? !1, u = ((O = t == null ? void 0 : t.serialization) == null ? void 0 : O.serialize) ?? ((f) => f), A = ((H = t == null ? void 0 : t.serialization) == null ? void 0 : H.deserialize) ?? ((f) => f);
  Ee === !1 && l === b.Session && (t == null ? void 0 : t.sessionAccessForContentScripts) === !0 && (be(l), w == null || w.storage[l].setAccessLevel({
    accessLevel: ue.ExtensionPagesAndContentScripts
  }).catch((f) => {
    console.warn(f), console.warn("Please call setAccessLevel into different context, like a background script.");
  }), Ee = !0);
  const h = async () => {
    be(l);
    const f = await (w == null ? void 0 : w.storage[l].get([r]));
    return f ? A(f[r]) ?? e : e;
  }, T = () => {
    i.forEach((f) => f());
  }, P = async (f) => {
    n || (o = await h()), o = await Se(f, o), await (w == null ? void 0 : w.storage[l].set({ [r]: u(o) })), T();
  }, M = (f) => (i = [...i, f], () => {
    i = i.filter((D) => D !== f);
  }), N = () => o;
  h().then((f) => {
    o = f, n = !0, T();
  });
  async function k(f) {
    if (f[r] === void 0)
      return;
    const D = A(f[r].newValue);
    o !== D && (o = await Se(D, o), T());
  }
  return s && (w == null || w.storage[l].onChanged.addListener(k)), {
    get: h,
    set: P,
    getSnapshot: N,
    subscribe: M
  };
}
const Ue = I("theme-storage-key", "light", {
  storageEnum: b.Local,
  liveUpdate: !0
}), Ie = {
  ...Ue,
  toggle: async () => {
    await Ue.set((r) => r === "light" ? "dark" : "light");
  }
}, Q = I("focus-time-storage-key", {
  duration: 25,
  // 默认25分钟
  isActive: !1
}, {
  storageEnum: b.Local,
  liveUpdate: !0
}), R = {
  ...Q,
  startFocus: async (r) => {
    const e = Date.now();
    await Q.set({
      duration: r,
      isActive: !0,
      startTime: e,
      endTime: e + r * 60 * 1e3
    });
  },
  stopFocus: async () => {
    await Q.set((r) => ({
      ...r,
      isActive: !1,
      startTime: void 0,
      endTime: void 0
    }));
  },
  getRemainingTime: async () => {
    const r = await Q.get();
    if (!r.isActive || !r.endTime)
      return 0;
    const e = Math.max(0, r.endTime - Date.now());
    return Math.floor(e / 1e3);
  }
}, U = I("blocked-urls-storage-key", {
  urls: [],
  studyModeUrls: [],
  studyModeSelectors: {}
}, {
  storageEnum: b.Local,
  liveUpdate: !0
}), Pe = async () => {
  try {
    const r = await U.get();
    (!r.studyModeUrls || !r.studyModeSelectors) && (console.log("Migrating blocked URLs storage structure..."), await U.set((e) => ({
      urls: e.urls || [],
      studyModeUrls: e.studyModeUrls || [],
      studyModeSelectors: e.studyModeSelectors || {}
    })), console.log("Blocked URLs storage migration complete."));
  } catch (r) {
    console.error("Error migrating blocked URLs storage:", r);
  }
};
Pe();
const v = {
  ...U,
  addUrl: async (r) => {
    await U.set((e) => {
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
    await U.set((e) => ({
      ...e,
      urls: e.urls.filter((t) => t !== r)
    }));
  },
  clearUrls: async () => {
    await U.set((r) => ({
      ...r,
      urls: []
    }));
  },
  addStudyModeUrl: async (r) => {
    await U.set((e) => {
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
    await U.set((e) => ({
      ...e,
      studyModeUrls: e.studyModeUrls.filter((t) => t !== r)
    }));
  },
  toggleUrlMode: async (r, e) => {
    e ? await v.addStudyModeUrl(r) : await v.addUrl(r);
  },
  addStudyModeSelector: async (r, e) => {
    await U.set((t) => {
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
    await U.set((t) => {
      const o = t.studyModeSelectors[r] || [];
      return {
        ...t,
        studyModeSelectors: {
          ...t.studyModeSelectors,
          [r]: o.filter((n) => n !== e)
        }
      };
    });
  },
  clearStudyModeSelectors: async (r) => {
    await U.set((e) => {
      const { [r]: t, ...o } = e.studyModeSelectors;
      return {
        ...e,
        studyModeSelectors: o
      };
    });
  }
}, j = I("notification-cache-storage-key", {
  isGenerating: !1
}, {
  storageEnum: b.Local,
  liveUpdate: !0
}), oe = {
  ...j,
  // 保存通知内容
  saveNotification: async (r, e = 60) => {
    const t = Date.now();
    await j.set({
      pendingNotification: r,
      generatedAt: t,
      expiresAt: t + e * 60 * 1e3,
      isGenerating: !1
    });
  },
  // 获取通知内容（如果有效）
  getNotification: async () => {
    const r = await j.get();
    return r.pendingNotification ? r.expiresAt && r.expiresAt < Date.now() ? (await oe.clearNotification(), null) : r.pendingNotification : null;
  },
  // 清除通知缓存
  clearNotification: async () => {
    await j.set((r) => ({
      ...r,
      pendingNotification: void 0,
      generatedAt: void 0,
      expiresAt: void 0,
      isGenerating: !1
    }));
  },
  // 设置生成状态
  setGenerating: async (r) => {
    await j.set((e) => ({
      ...e,
      isGenerating: r
    }));
  },
  // 检查是否正在生成中
  isGenerating: async () => (await j.get()).isGenerating
};
var Ae;
(function(r) {
  r.DEEPSEEK = "deepseek", r.OPENAI = "openai";
})(Ae || (Ae = {}));
const z = I("ai-config-storage-key", {
  enabled: !1,
  provider: Ae.DEEPSEEK,
  model: "deepseek-chat",
  apiKey: "",
  preGenerateMinutes: 5
  // 默认提前5分钟生成
}, {
  storageEnum: b.Local,
  liveUpdate: !0
}), Y = {
  ...z,
  // 启用/禁用AI生成
  enableAI: async (r) => {
    await z.set((e) => ({
      ...e,
      enabled: r
    }));
  },
  // 更新API密钥
  updateAPIKey: async (r) => {
    await z.set((e) => ({
      ...e,
      apiKey: r
    }));
  },
  // 更新AI提供商
  updateProvider: async (r, e, t) => {
    await z.set((o) => ({
      ...o,
      provider: r,
      ...e ? { model: e } : {},
      ...t ? { apiEndpoint: t } : { apiEndpoint: void 0 }
    }));
  },
  // 更新提示词
  updatePrompts: async (r, e) => {
    await z.set((t) => ({
      ...t,
      ...r !== void 0 ? { systemPrompt: r } : {},
      ...e !== void 0 ? { promptTemplate: e } : {}
    }));
  },
  // 更新预生成时间
  updatePreGenerateTime: async (r) => {
    await z.set((e) => ({
      ...e,
      preGenerateMinutes: Math.max(1, Math.min(30, r))
      // 限制在1-30分钟之间
    }));
  }
}, le = I("sound-settings-storage-key", {
  enabled: !0,
  // 默认启用声音
  volume: 0.5
  // 默认音量50%
}, {
  storageEnum: b.Local,
  liveUpdate: !0
}), ge = {
  ...le,
  // 启用/禁用声音
  enableSound: async (r) => {
    await le.set((e) => ({
      ...e,
      enabled: r
    }));
  },
  // 设置音量
  setVolume: async (r) => {
    const e = Math.max(0, Math.min(1, r));
    await le.set((t) => ({
      ...t,
      volume: e
    }));
  }
}, de = I("tts-config-storage-key", {
  enabled: !1,
  appid: "",
  token: "",
  cluster: "volcano_tts",
  voiceType: "zh_male_M392_conversation_wvae_bigtts",
  encoding: "mp3",
  speedRatio: 1,
  uid: "chrome_extension_user"
}, {
  storageEnum: b.Local,
  liveUpdate: !0
}), K = {
  ...de,
  // 更新配置
  updateConfig: async (r) => {
    await de.set((e) => ({
      ...e,
      ...r
    }));
  },
  // 检查是否已配置
  isConfigured: async () => {
    const r = await de.get();
    return r.enabled && r.appid.length > 0 && r.token.length > 0;
  }
}, _ = I("voice-cache-storage-key", {}, {
  storageEnum: b.Local,
  liveUpdate: !0
}), L = {
  ..._,
  // 缓存开始语音
  cacheStartVoice: async (r, e) => {
    await _.set((t) => ({
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
    const e = await _.get();
    if (!e.startVoiceCache)
      return null;
    if (e.startVoiceCache.voiceType !== r)
      return console.log("Start voice cache voiceType mismatch, clearing cache"), await L.clearStartVoice(), null;
    const t = Date.now() - e.startVoiceCache.cachedAt, o = 7 * 24 * 60 * 60 * 1e3;
    return t > o ? (console.log("Start voice cache expired, clearing cache"), await L.clearStartVoice(), null) : (console.log("Using cached start voice for voiceType:", r), e.startVoiceCache.audioData);
  },
  // 清除开始语音缓存
  clearStartVoice: async () => {
    await _.set((r) => ({
      ...r,
      startVoiceCache: void 0
    })), console.log("Start voice cache cleared");
  },
  // 缓存结束语音
  cacheEndVoice: async (r, e) => {
    await _.set((t) => ({
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
    const e = await _.get();
    if (!e.endVoiceCache)
      return null;
    if (e.endVoiceCache.voiceType !== r)
      return console.log("End voice cache voiceType mismatch, clearing cache"), await L.clearEndVoice(), null;
    const t = Date.now() - e.endVoiceCache.cachedAt, o = 7 * 24 * 60 * 60 * 1e3;
    return t > o ? (console.log("End voice cache expired, clearing cache"), await L.clearEndVoice(), null) : (console.log("Using cached end voice for voiceType:", r), e.endVoiceCache.audioData);
  },
  // 清除结束语音缓存
  clearEndVoice: async () => {
    await _.set((r) => ({
      ...r,
      endVoiceCache: void 0
    })), console.log("End voice cache cleared");
  },
  // 清除所有语音缓存
  clearAllVoiceCache: async () => {
    await _.set({}), console.log("All voice cache cleared");
  },
  // 检查开始语音缓存是否有效
  isStartVoiceCacheValid: async (r) => await L.getStartVoice(r) !== null,
  // 检查结束语音缓存是否有效
  isEndVoiceCacheValid: async (r) => await L.getEndVoice(r) !== null
}, fe = {
  OFFSCREEN_LOAD_DELAY: 200,
  // offscreen document加载延迟
  MESSAGE_TIMEOUT: 5e3,
  // 消息发送超时时间
  TIMER_CHECK_INTERVAL: 1e3
  // 定时器检查间隔
}, Oe = {
  API_URL: "https://openspeech.bytedance.com/api/v1/tts"
}, ee = {
  DEFAULT_DURATION: 25,
  // 默认专注时间（分钟）
  MIN_DURATION: 1,
  MAX_DURATION: 120,
  BADGE_COLOR: "#E53935",
  BADGE_TEXT: "专注"
}, me = {
  DEFAULT_PRE_GENERATE_MINUTES: 5,
  MIN_PRE_GENERATE_MINUTES: 1,
  MAX_PRE_GENERATE_MINUTES: 30
}, se = {
  PLAY_NOTIFICATION_SOUND: "PLAY_NOTIFICATION_SOUND",
  PLAY_TTS_SOUND: "PLAY_TTS_SOUND",
  TEST_TTS: "TEST_TTS",
  PING_POPUP: "PING_POPUP",
  PONG_POPUP: "PONG_POPUP"
}, ke = {
  FOCUS_START: "focus-start",
  FOCUS_END: "focus-end"
}, te = {
  TTS_NOT_CONFIGURED: "TTS未启用或未配置",
  TTS_GENERATION_FAILED: "语音生成失败",
  SOUND_DISABLED: "声音已禁用",
  MESSAGE_TIMEOUT: "消息发送超时",
  OFFSCREEN_NOT_FOUND: "Offscreen document未找到",
  AUDIO_PLAY_FAILED: "音频播放失败"
}, Z = class Z {
  /**
   * 生成语音并返回base64音频数据
   */
  static async generateSpeech(e) {
    var t;
    try {
      const o = await K.get();
      if (!o.enabled)
        return console.log("TTS is disabled"), null;
      if (!o.appid || !o.token)
        return console.error("TTS configuration is incomplete"), null;
      const n = `chrome_ext_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`, i = {
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
          reqid: n,
          text: e,
          operation: "query"
        }
      };
      console.log("Sending TTS request:", { reqid: n, text: e });
      const l = await fetch(Z.API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer; ${o.token}`
        },
        body: JSON.stringify(i)
      });
      if (!l.ok)
        throw new Error(`HTTP error! status: ${l.status}`);
      const s = await l.json();
      if (s.code !== 3e3)
        throw new Error(`TTS API error: ${s.message} (code: ${s.code})`);
      if (!s.data)
        throw new Error("No audio data received from TTS API");
      return console.log("TTS generation successful:", {
        reqid: s.reqid,
        duration: (t = s.addition) == null ? void 0 : t.duration,
        dataLength: s.data.length
      }), s.data;
    } catch (o) {
      return console.error("Error generating speech:", o), null;
    }
  }
  /**
   * 测试TTS配置是否有效
   */
  static async testConfiguration() {
    try {
      return await Z.generateSpeech("测试语音合成") !== null;
    } catch (e) {
      return console.error("TTS configuration test failed:", e), !1;
    }
  }
};
B(Z, "API_URL", Oe.API_URL);
let X = Z;
const F = class F {
  constructor() {
  }
  static getInstance() {
    return F.instance || (F.instance = new F()), F.instance;
  }
  /**
   * 播放TTS语音通知
   */
  async playTTSNotification(e) {
    try {
      const t = await K.get();
      if (!t.enabled || !await K.isConfigured())
        return console.log("TTS not enabled or not configured, falling back to normal sound"), await this.playNotificationSound();
      const o = await ge.get();
      if (!o.enabled) {
        console.log("Notification sound is disabled");
        return;
      }
      console.log("Generating TTS for text:", e);
      const n = this.isStartVoiceText(e);
      let i = null;
      if (n ? (i = await L.getStartVoice(t.voiceType), i ? console.log("Using cached start voice for voiceType:", t.voiceType) : (console.log("No cached start voice found, generating new one"), i = await X.generateSpeech("专注模式已启动，加油保持专注！"), i && (await L.cacheStartVoice(t.voiceType, i), console.log("Start voice generated and cached for voiceType:", t.voiceType)))) : i = await X.generateSpeech(e), !i)
        return console.log("TTS generation failed, falling back to normal sound"), await this.playNotificationSound();
      await this.ensureOffscreenDocument();
      const l = await chrome.runtime.sendMessage({
        type: se.PLAY_TTS_SOUND,
        volume: o.volume,
        audioData: i
      });
      l && l.success ? console.log("TTS notification played successfully with volume:", o.volume) : (console.error("Failed to play TTS notification:", l == null ? void 0 : l.error), await this.playNotificationSound());
    } catch (t) {
      console.error("Error playing TTS notification:", t), await this.playNotificationSound();
    }
  }
  /**
   * 播放普通通知音效
   */
  async playNotificationSound() {
    try {
      const e = await ge.get();
      if (!e.enabled) {
        console.log("Notification sound is disabled");
        return;
      }
      await this.ensureOffscreenDocument();
      const t = await chrome.runtime.sendMessage({
        type: se.PLAY_NOTIFICATION_SOUND,
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
   */
  async testTTS(e) {
    try {
      if (!(await K.get()).enabled || !await K.isConfigured())
        return { success: !1, error: te.TTS_NOT_CONFIGURED };
      const o = await X.generateSpeech(e);
      if (!o)
        return { success: !1, error: te.TTS_GENERATION_FAILED };
      const n = await ge.get();
      if (!n.enabled)
        return { success: !1, error: te.SOUND_DISABLED };
      await this.ensureOffscreenDocument(), await new Promise((i) => setTimeout(i, fe.OFFSCREEN_LOAD_DELAY));
      try {
        const l = await new Promise((s, u) => {
          const A = setTimeout(() => {
            u(new Error(te.MESSAGE_TIMEOUT));
          }, fe.MESSAGE_TIMEOUT);
          chrome.runtime.sendMessage(
            {
              type: se.PLAY_TTS_SOUND,
              volume: n.volume,
              audioData: o
            },
            (h) => {
              clearTimeout(A), chrome.runtime.lastError ? u(new Error(chrome.runtime.lastError.message)) : s(h);
            }
          );
        });
        return l && l.success ? { success: !0 } : { success: !1, error: (l == null ? void 0 : l.error) || "播放失败" };
      } catch (i) {
        return console.error("Message sending error:", i), { success: !1, error: "无法与音频播放器通信: " + i.message };
      }
    } catch (t) {
      return console.error("TTS test error:", t), { success: !1, error: t.message };
    }
  }
  /**
   * 检查是否为开始语音文本
   */
  isStartVoiceText(e) {
    return e.includes("专注模式已启动") || e.includes("开始专注") || e.includes("加油，保持专注");
  }
  /**
   * 清除语音缓存（当voiceType改变时调用）
   */
  async clearVoiceCacheOnVoiceTypeChange(e, t) {
    e !== t && (console.log("VoiceType changed from", e, "to", t, ", clearing voice cache"), await L.clearAllVoiceCache());
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
B(F, "instance");
let J = F;
const Ce = [
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
function De() {
  const r = Math.floor(Math.random() * Ce.length);
  return Ce[r];
}
const G = class G {
  constructor() {
  }
  static getInstance() {
    return G.instance || (G.instance = new G()), G.instance;
  }
  /**
   * 获取专注结束通知消息
   */
  async getEndNotification() {
    try {
      if (!(await Y.get()).enabled)
        return this.getDefaultEndMessage();
      const t = await oe.getNotification();
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
      if (!(await Y.get()).enabled)
        return;
      const o = Math.max(
        me.MIN_PRE_GENERATE_MINUTES,
        Math.min(me.MAX_PRE_GENERATE_MINUTES, e - me.DEFAULT_PRE_GENERATE_MINUTES)
      );
      setTimeout(
        async () => {
          try {
            await this.generateAINotification(), console.log("AI notification pre-generated successfully");
          } catch (n) {
            console.error("Error pre-generating AI notification:", n);
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
      const e = await Y.get();
      if (!e.apiKey || !e.provider)
        return console.log("AI configuration incomplete, using default message"), this.getDefaultEndMessage();
      const t = await this.buildNotificationPrompt(), o = await this.callAIService(e, t);
      return o ? (await oe.saveNotification(o), console.log("AI notification generated and cached"), o) : this.getDefaultEndMessage();
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
    }), o = (await R.get()).duration;
    return ((await Y.get()).promptTemplate || `现在是${e}，用户刚刚完成了{duration}分钟的专注时间段。请生成一条温暖、鼓励的休息提醒，内容要：
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
      const o = this.getAPIEndpoint(e.provider), n = this.prepareRequestBody(e, t), i = new AbortController(), l = setTimeout(() => i.abort(), 1e4), s = await fetch(o, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${e.apiKey}`
        },
        body: JSON.stringify(n),
        signal: i.signal
      });
      if (clearTimeout(l), !s.ok)
        throw new Error(`AI API error: ${s.status} ${s.statusText}`);
      const h = (await s.json()).choices[0].message.content.trim().replace(/^["']|["']$/g, "").replace(/\n+/g, " ").trim();
      return h.length > 100 ? h.substring(0, 97) + "..." : h;
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
    const n = e.systemPrompt || `你是一个友好、积极的助手，负责在用户专注工作一段时间后提醒他们休息。
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
        { role: "system", content: n },
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
    return De();
  }
  /**
   * 清除通知缓存
   */
  async clearNotificationCache() {
    try {
      await oe.clearNotification(), console.log("Notification cache cleared");
    } catch (e) {
      console.error("Error clearing notification cache:", e);
    }
  }
};
B(G, "instance");
let ne = G;
function we(r, e) {
  return function(t) {
    console.log("Applying site-specific study mode with selectors:", t);
    function o(i, l) {
      const s = document.createElement("div");
      s.style.position = "fixed", s.style.top = "70px", s.style.right = "10px", s.style.backgroundColor = l, s.style.color = "white", s.style.padding = "12px 16px", s.style.borderRadius = "8px", s.style.zIndex = "9999999", s.style.fontSize = "14px", s.style.fontFamily = "Arial, sans-serif", s.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.2)", s.style.width = "200px", s.style.textAlign = "center";
      const u = document.createElement("div");
      u.textContent = "专注提醒", u.style.fontWeight = "bold", u.style.fontSize = "16px", u.style.marginBottom = "8px", s.appendChild(u);
      const A = document.createElement("div");
      A.textContent = i, s.appendChild(A), document.body.appendChild(s), setTimeout(() => {
        s.style.transition = "opacity 1s", s.style.opacity = "0", setTimeout(() => {
          document.body.contains(s) && document.body.removeChild(s);
        }, 1e3);
      }, 3e4);
    }
    function n(i) {
      i.forEach((s) => {
        try {
          const u = document.querySelectorAll(s);
          u.forEach((A) => {
            A instanceof HTMLElement && (A.style.display = "none", A.dataset.studyModeDisabled = "true");
          }), console.log(`Disabled ${u.length} elements with selector: ${s}`);
        } catch (u) {
          console.error(`Error disabling elements with selector ${s}:`, u);
        }
      });
      const l = new MutationObserver((s) => {
        let u = !1;
        s.forEach((A) => {
          A.type === "childList" && A.addedNodes.length > 0 && (u = !0);
        }), u && i.forEach((A) => {
          try {
            document.querySelectorAll(A).forEach((T) => {
              T instanceof HTMLElement && !T.dataset.studyModeDisabled && (T.style.display = "none", T.dataset.studyModeDisabled = "true");
            });
          } catch (h) {
            console.error(`Error in mutation observer for selector ${A}:`, h);
          }
        });
      });
      l.observe(document.documentElement, {
        childList: !0,
        subtree: !0
      }), window.__studyModeObserver = l;
    }
    o(r, e), n(t);
  };
}
const Be = {
  domain: "bilibili.com",
  getSelectors() {
    return ["#nav-searchform", ".center-search__bar"];
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getCustomHandler(r) {
    return we("已为您屏蔽搜索功能，专注于观看学习内容", "rgba(255, 105, 180, 0.8)");
  }
}, Fe = {
  domain: "baidu.com",
  getSelectors() {
    return ["#s-hotsearch-wrapper", "#con-ceiling-wrapper"];
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getCustomHandler(r) {
    return we("已为您屏蔽热搜和顶部导航，专注于当前任务", "rgba(0, 128, 0, 0.8)");
  }
}, Ge = {
  domain: "zhihu.com",
  getSelectors() {
    return [".Topstory"];
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getCustomHandler(r) {
    return we("已为您屏蔽热门话题推荐，专注于学习和阅读", "rgba(0, 123, 255, 0.8)");
  }
}, he = [
  Be,
  Fe,
  Ge
  // 在这里添加更多网站处理器
];
function Ve(r) {
  try {
    const t = new URL(r).hostname;
    console.log("getSiteHandler: Checking URL:", r), console.log("getSiteHandler: Hostname:", t), console.log(
      "getSiteHandler: Available handlers:",
      he.map((n) => n.domain)
    );
    const o = he.find((n) => !!(t === n.domain || t.endsWith("." + n.domain) || (t.startsWith("www.") ? t.substring(4) : t) === n.domain));
    return console.log("getSiteHandler: Found handler:", (o == null ? void 0 : o.domain) || "none"), o;
  } catch (e) {
    console.error("getSiteHandler: Error:", e);
    return;
  }
}
const V = class V {
  constructor() {
  }
  static getInstance() {
    return V.instance || (V.instance = new V()), V.instance;
  }
  /**
   * 检查并处理标签页URL
   */
  async checkTabUrl(e, t) {
    try {
      console.log("UrlBlocker: Checking tab URL:", t);
      const o = await R.get();
      if (console.log("UrlBlocker: Focus config:", o), !o.isActive) {
        console.log("UrlBlocker: Focus mode not active, skipping URL check");
        return;
      }
      const n = await v.get();
      console.log("UrlBlocker: Blocked config:", n);
      const i = this.isUrlBlocked(t, n.urls);
      if (console.log("UrlBlocker: Is blocked?", i), i) {
        console.log("UrlBlocker: Blocking URL:", t), await this.showBlockedWarning(e, t);
        return;
      }
      const l = this.isUrlBlocked(t, n.studyModeUrls);
      if (console.log("UrlBlocker: Is study mode?", l), l) {
        console.log("UrlBlocker: Applying study mode to URL:", t), await this.handleStudyModeUrl(e, t, n.studyModeSelectors);
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
      const n = new URL(e).hostname;
      console.log("UrlBlocker: Checking URL:", e), console.log("UrlBlocker: Domain:", n), console.log("UrlBlocker: Blocked URLs list:", t);
      const i = t.some((l) => {
        let s = l.trim();
        if (s.startsWith("http://") || s.startsWith("https://"))
          try {
            s = new URL(s).hostname;
          } catch {
            s = s.replace(/^https?:\/\//, "").split("/")[0];
          }
        if (console.log("UrlBlocker: Comparing with cleaned URL:", s), s.startsWith("*.")) {
          const k = s.substring(2), O = n.endsWith(k);
          return console.log("UrlBlocker: Wildcard match result:", O), O;
        }
        if (l.includes("/") && !l.startsWith("http")) {
          const k = e.includes(l);
          return console.log("UrlBlocker: Full URL match result:", k), k;
        }
        const u = n === s, A = n.endsWith("." + s), h = s.endsWith("." + n), T = n.startsWith("www.") ? n.substring(4) : n, P = s.startsWith("www.") ? s.substring(4) : s, M = T === P, N = u || A || h || M;
        return console.log("UrlBlocker: Domain match result:", {
          domain: n,
          cleanBlockedUrl: s,
          domainWithoutWww: T,
          cleanBlockedUrlWithoutWww: P,
          exactMatch: u,
          subdomainMatch: A,
          parentDomainMatch: h,
          wwwMatch: M,
          finalResult: N
        }), N;
      });
      return console.log("UrlBlocker: Final blocking result:", i), i;
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
      const i = new URL(t).hostname;
      console.log("UrlBlocker: Handling study mode for URL:", t), console.log("UrlBlocker: Domain:", i);
      const l = Ve(t);
      if (l) {
        console.log("UrlBlocker: Found predefined site handler for domain:", l.domain), await this.applySiteHandler(e, l);
        return;
      }
      console.log("UrlBlocker: No predefined site handler found, checking user selectors");
      const s = o[i] || [];
      if (console.log("UrlBlocker: User selectors for domain:", i, s), s.length === 0) {
        console.log("UrlBlocker: No selectors configured for study mode URL:", t);
        return;
      }
      await this.injectHideElements(e, s), console.log("UrlBlocker: Study mode applied to:", t, "with selectors:", s);
    } catch (n) {
      console.error("Error handling study mode URL:", n);
    }
  }
  /**
   * 注入CSS隐藏元素
   */
  async injectHideElements(e, t) {
    try {
      const o = t.map((n) => `${n} { display: none !important; }`).join(`
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
      const o = t.getSelectors();
      if (t.getCustomHandler) {
        const n = t.getCustomHandler(e);
        await chrome.scripting.executeScript({
          target: { tabId: e },
          func: n,
          args: [o]
        }), console.log("UrlBlocker: Applied custom site handler for:", t.domain);
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
      await v.addUrl(e), console.log("URL added to blocked list:", e);
    } catch (t) {
      throw console.error("Error adding blocked URL:", t), t;
    }
  }
  /**
   * 移除阻止的URL
   */
  async removeBlockedUrl(e) {
    try {
      await v.removeUrl(e), console.log("URL removed from blocked list:", e);
    } catch (t) {
      throw console.error("Error removing blocked URL:", t), t;
    }
  }
  /**
   * 添加学习模式URL
   */
  async addStudyModeUrl(e) {
    try {
      await v.addStudyModeUrl(e), console.log("URL added to study mode list:", e);
    } catch (t) {
      throw console.error("Error adding study mode URL:", t), t;
    }
  }
  /**
   * 移除学习模式URL
   */
  async removeStudyModeUrl(e) {
    try {
      await v.removeStudyModeUrl(e), console.log("URL removed from study mode list:", e);
    } catch (t) {
      throw console.error("Error removing study mode URL:", t), t;
    }
  }
  /**
   * 获取阻止的URL列表
   */
  async getBlockedUrls() {
    try {
      const e = await v.get();
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
      const e = await v.get();
      let t = !1;
      for (const o of he) {
        const n = o.domain;
        e.studyModeUrls.includes(n) || (e.studyModeUrls.push(n), t = !0, console.log("UrlBlocker: Added predefined site to study mode:", n));
      }
      t && (await v.set(e), console.log("UrlBlocker: Predefined sites initialized"));
    } catch (e) {
      console.error("Error initializing predefined sites:", e);
    }
  }
};
B(V, "instance");
let ae = V;
const W = class W {
  constructor() {
    B(this, "timerInterval", null);
  }
  static getInstance() {
    return W.instance || (W.instance = new W()), W.instance;
  }
  /**
   * 启动专注模式
   */
  async startFocus(e) {
    try {
      await R.startFocus(e);
      const t = `专注模式已启动，专注时间：${e}分钟。加油，保持专注！`;
      chrome.notifications.create(ke.FOCUS_START, {
        type: "basic",
        iconUrl: chrome.runtime.getURL("spring-128.png"),
        title: "专注模式已启动",
        message: `专注时间：${e}分钟`
      }), await J.getInstance().playTTSNotification(t), chrome.action.setBadgeText({ text: ee.BADGE_TEXT }), chrome.action.setBadgeBackgroundColor({ color: ee.BADGE_COLOR }), this.startTimerCheck(), await this.preGenerateNotification(e), await this.checkAllOpenTabs(), console.log(`Focus mode started for ${e} minutes`);
    } catch (t) {
      throw console.error("Error starting focus mode:", t), t;
    }
  }
  /**
   * 停止专注模式
   */
  async stopFocus() {
    try {
      await R.stopFocus(), chrome.action.setBadgeText({ text: "" }), this.stopTimerCheck(), console.log("Focus mode stopped");
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
    }, fe.TIMER_CHECK_INTERVAL);
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
      if (!(await R.get()).isActive) {
        this.stopTimerCheck();
        return;
      }
      const t = await R.getRemainingTime();
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
      const e = await ne.getInstance().getEndNotification();
      chrome.notifications.create(ke.FOCUS_END, {
        type: "basic",
        iconUrl: chrome.runtime.getURL("spring-128.png"),
        title: "专注模式已结束",
        message: e
      }), await J.getInstance().playTTSNotification(e), console.log("Focus session completed");
    } catch (e) {
      console.error("Error handling focus end:", e);
    }
  }
  /**
   * 预生成AI通知
   */
  async preGenerateNotification(e) {
    try {
      if (!(await Y.get()).enabled)
        return;
      await ne.getInstance().preGenerateNotification(e);
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
      const e = await chrome.tabs.query({}), t = ae.getInstance();
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
    const e = await R.get(), t = await R.getRemainingTime();
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
      (await R.get()).isActive && (this.startTimerCheck(), chrome.action.setBadgeText({ text: ee.BADGE_TEXT }), chrome.action.setBadgeBackgroundColor({ color: ee.BADGE_COLOR }), console.log("Focus mode restored from storage"));
    } catch (e) {
      console.error("Error initializing focus manager:", e);
    }
  }
};
B(W, "instance");
let ye = W;
const pe = ye.getInstance(), ve = J.getInstance(), Te = ae.getInstance();
chrome.runtime.onMessage.addListener((r, e, t) => r.type === se.TEST_TTS ? (ve.testTTS(r.text).then((o) => t(o)).catch((o) => {
  console.error("TTS test error:", o), t({ success: !1, error: o.message });
}), !0) : !1);
chrome.storage.onChanged.addListener(async (r, e) => {
  if (e === "local") {
    if (r["focus-time-storage-key"]) {
      const t = r["focus-time-storage-key"].newValue, o = r["focus-time-storage-key"].oldValue;
      t != null && t.isActive && !(o != null && o.isActive) ? await pe.startFocus(t.duration) : !(t != null && t.isActive) && (o != null && o.isActive) && await pe.stopFocus();
    }
    if (r["tts-config-storage-key"]) {
      const t = r["tts-config-storage-key"].newValue, o = r["tts-config-storage-key"].oldValue;
      t != null && t.voiceType && (o != null && o.voiceType) && t.voiceType !== o.voiceType && (console.log("VoiceType changed, clearing voice cache"), await ve.clearVoiceCacheOnVoiceTypeChange(o.voiceType, t.voiceType));
    }
  }
});
chrome.tabs.onUpdated.addListener(async (r, e, t) => {
  e.status === "complete" && t.url && await Te.checkTabUrl(r, t.url);
});
chrome.tabs.onActivated.addListener(async (r) => {
  try {
    const e = await chrome.tabs.get(r.tabId);
    e.url && await Te.checkTabUrl(r.tabId, e.url);
  } catch (e) {
    console.error("Error handling tab activation:", e);
  }
});
async function We() {
  try {
    console.log("Initializing background script...");
    const r = await Ie.get();
    console.log("Theme loaded:", r), await pe.initialize(), await Te.initializePredefinedSites(), console.log("Background script initialized successfully");
  } catch (r) {
    console.error("Error during initialization:", r);
  }
}
We();
