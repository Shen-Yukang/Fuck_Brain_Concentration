var Me = Object.defineProperty;
var Ne = (r, e, t) => e in r ? Me(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t;
var B = (r, e, t) => Ne(r, typeof e != "symbol" ? e + "" : e, t);
var re = { exports: {} }, Re = re.exports, Te;
function Le() {
  return Te || (Te = 1, function(r, e) {
    (function(t, s) {
      s(r);
    })(typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : Re, function(t) {
      if (!(globalThis.chrome && globalThis.chrome.runtime && globalThis.chrome.runtime.id))
        throw new Error("This script should only be loaded in a browser extension.");
      if (globalThis.browser && globalThis.browser.runtime && globalThis.browser.runtime.id)
        t.exports = globalThis.browser;
      else {
        const s = "The message port closed before a response was received.", o = (c) => {
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
          class a extends WeakMap {
            constructor(i, d = void 0) {
              super(d), this.createItem = i;
            }
            get(i) {
              return this.has(i) || this.set(i, this.createItem(i)), super.get(i);
            }
          }
          const h = (n) => n && typeof n == "object" && typeof n.then == "function", A = (n, i) => (...d) => {
            c.runtime.lastError ? n.reject(new Error(c.runtime.lastError.message)) : i.singleCallbackArg || d.length <= 1 && i.singleCallbackArg !== !1 ? n.resolve(d[0]) : n.resolve(d);
          }, f = (n) => n == 1 ? "argument" : "arguments", T = (n, i) => function(m, ...p) {
            if (p.length < i.minArgs)
              throw new Error(`Expected at least ${i.minArgs} ${f(i.minArgs)} for ${n}(), got ${p.length}`);
            if (p.length > i.maxArgs)
              throw new Error(`Expected at most ${i.maxArgs} ${f(i.maxArgs)} for ${n}(), got ${p.length}`);
            return new Promise((x, S) => {
              if (i.fallbackToNoCallback)
                try {
                  m[n](...p, A({
                    resolve: x,
                    reject: S
                  }, i));
                } catch (g) {
                  console.warn(`${n} API method doesn't seem to support the callback parameter, falling back to call it without a callback: `, g), m[n](...p), i.fallbackToNoCallback = !1, i.noCallback = !0, x();
                }
              else i.noCallback ? (m[n](...p), x()) : m[n](...p, A({
                resolve: x,
                reject: S
              }, i));
            });
          }, P = (n, i, d) => new Proxy(i, {
            apply(m, p, x) {
              return d.call(p, n, ...x);
            }
          });
          let M = Function.call.bind(Object.prototype.hasOwnProperty);
          const N = (n, i = {}, d = {}) => {
            let m = /* @__PURE__ */ Object.create(null), p = {
              has(S, g) {
                return g in n || g in m;
              },
              get(S, g, E) {
                if (g in m)
                  return m[g];
                if (!(g in n))
                  return;
                let y = n[g];
                if (typeof y == "function")
                  if (typeof i[g] == "function")
                    y = P(n, n[g], i[g]);
                  else if (M(d, g)) {
                    let $ = T(g, d[g]);
                    y = P(n, n[g], $);
                  } else
                    y = y.bind(n);
                else if (typeof y == "object" && y !== null && (M(i, g) || M(d, g)))
                  y = N(y, i[g], d[g]);
                else if (M(d, "*"))
                  y = N(y, i[g], d["*"]);
                else
                  return Object.defineProperty(m, g, {
                    configurable: !0,
                    enumerable: !0,
                    get() {
                      return n[g];
                    },
                    set($) {
                      n[g] = $;
                    }
                  }), y;
                return m[g] = y, y;
              },
              set(S, g, E, y) {
                return g in m ? m[g] = E : n[g] = E, !0;
              },
              defineProperty(S, g, E) {
                return Reflect.defineProperty(m, g, E);
              },
              deleteProperty(S, g) {
                return Reflect.deleteProperty(m, g);
              }
            }, x = Object.create(n);
            return new Proxy(x, p);
          }, k = (n) => ({
            addListener(i, d, ...m) {
              i.addListener(n.get(d), ...m);
            },
            hasListener(i, d) {
              return i.hasListener(n.get(d));
            },
            removeListener(i, d) {
              i.removeListener(n.get(d));
            }
          }), O = new a((n) => typeof n != "function" ? n : function(d) {
            const m = N(d, {}, {
              getContent: {
                minArgs: 0,
                maxArgs: 0
              }
            });
            n(m);
          }), H = new a((n) => typeof n != "function" ? n : function(d, m, p) {
            let x = !1, S, g = new Promise((q) => {
              S = function(v) {
                x = !0, q(v);
              };
            }), E;
            try {
              E = n(d, m, S);
            } catch (q) {
              E = Promise.reject(q);
            }
            const y = E !== !0 && h(E);
            if (E !== !0 && !y && !x)
              return !1;
            const $ = (q) => {
              q.then((v) => {
                p(v);
              }, (v) => {
                let ce;
                v && (v instanceof Error || typeof v.message == "string") ? ce = v.message : ce = "An unexpected error occurred", p({
                  __mozWebExtensionPolyfillReject__: !0,
                  message: ce
                });
              }).catch((v) => {
                console.error("Failed to send onMessage rejected reply", v);
              });
            };
            return $(y ? E : g), !0;
          }), u = ({
            reject: n,
            resolve: i
          }, d) => {
            c.runtime.lastError ? c.runtime.lastError.message === s ? i() : n(new Error(c.runtime.lastError.message)) : d && d.__mozWebExtensionPolyfillReject__ ? n(new Error(d.message)) : i(d);
          }, D = (n, i, d, ...m) => {
            if (m.length < i.minArgs)
              throw new Error(`Expected at least ${i.minArgs} ${f(i.minArgs)} for ${n}(), got ${m.length}`);
            if (m.length > i.maxArgs)
              throw new Error(`Expected at most ${i.maxArgs} ${f(i.maxArgs)} for ${n}(), got ${m.length}`);
            return new Promise((p, x) => {
              const S = u.bind(null, {
                resolve: p,
                reject: x
              });
              m.push(S), d.sendMessage(...m);
            });
          }, Ce = {
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
          }, N(c, Ce, l);
        };
        t.exports = o(chrome);
      }
    });
  }(re)), re.exports;
}
Le();
var b;
(function(r) {
  r.Local = "local", r.Sync = "sync", r.Managed = "managed", r.Session = "session";
})(b || (b = {}));
var ue;
(function(r) {
  r.ExtensionPagesOnly = "TRUSTED_CONTEXTS", r.ExtensionPagesAndContentScripts = "TRUSTED_AND_UNTRUSTED_CONTEXTS";
})(ue || (ue = {}));
const w = globalThis.chrome, xe = async (r, e) => {
  const t = (o) => typeof o == "function", s = (o) => o instanceof Promise;
  return t(r) ? (s(r), r(e)) : r;
};
let Se = !1;
function Ee(r) {
  if (w && w.storage[r] === void 0)
    throw new Error(`Check your storage permission in manifest.json: ${r} is not defined`);
}
function I(r, e, t) {
  var O, H;
  let s = null, o = !1, c = [];
  const l = (t == null ? void 0 : t.storageEnum) ?? b.Local, a = (t == null ? void 0 : t.liveUpdate) ?? !1, h = ((O = t == null ? void 0 : t.serialization) == null ? void 0 : O.serialize) ?? ((u) => u), A = ((H = t == null ? void 0 : t.serialization) == null ? void 0 : H.deserialize) ?? ((u) => u);
  Se === !1 && l === b.Session && (t == null ? void 0 : t.sessionAccessForContentScripts) === !0 && (Ee(l), w == null || w.storage[l].setAccessLevel({
    accessLevel: ue.ExtensionPagesAndContentScripts
  }).catch((u) => {
    console.warn(u), console.warn("Please call setAccessLevel into different context, like a background script.");
  }), Se = !0);
  const f = async () => {
    Ee(l);
    const u = await (w == null ? void 0 : w.storage[l].get([r]));
    return u ? A(u[r]) ?? e : e;
  }, T = () => {
    c.forEach((u) => u());
  }, P = async (u) => {
    o || (s = await f()), s = await xe(u, s), await (w == null ? void 0 : w.storage[l].set({ [r]: h(s) })), T();
  }, M = (u) => (c = [...c, u], () => {
    c = c.filter((D) => D !== u);
  }), N = () => s;
  f().then((u) => {
    s = u, o = !0, T();
  });
  async function k(u) {
    if (u[r] === void 0)
      return;
    const D = A(u[r].newValue);
    s !== D && (s = await xe(D, s), T());
  }
  return a && (w == null || w.storage[l].onChanged.addListener(k)), {
    get: f,
    set: P,
    getSnapshot: N,
    subscribe: M
  };
}
const be = I("theme-storage-key", "light", {
  storageEnum: b.Local,
  liveUpdate: !0
}), _e = {
  ...be,
  toggle: async () => {
    await be.set((r) => r === "light" ? "dark" : "light");
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
}), Ie = async () => {
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
Ie();
const C = {
  ...U,
  addUrl: async (r) => {
    await U.set((e) => {
      if (e.urls.includes(r))
        return e;
      const t = e.studyModeUrls.filter((s) => s !== r);
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
      const t = e.urls.filter((s) => s !== r);
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
    e ? await C.addStudyModeUrl(r) : await C.addUrl(r);
  },
  addStudyModeSelector: async (r, e) => {
    await U.set((t) => {
      const s = t.studyModeSelectors[r] || [];
      return s.includes(e) ? t : {
        ...t,
        studyModeSelectors: {
          ...t.studyModeSelectors,
          [r]: [...s, e]
        }
      };
    });
  },
  removeStudyModeSelector: async (r, e) => {
    await U.set((t) => {
      const s = t.studyModeSelectors[r] || [];
      return {
        ...t,
        studyModeSelectors: {
          ...t.studyModeSelectors,
          [r]: s.filter((o) => o !== e)
        }
      };
    });
  },
  clearStudyModeSelectors: async (r) => {
    await U.set((e) => {
      const { [r]: t, ...s } = e.studyModeSelectors;
      return {
        ...e,
        studyModeSelectors: s
      };
    });
  }
}, j = I("notification-cache-storage-key", {
  isGenerating: !1
}, {
  storageEnum: b.Local,
  liveUpdate: !0
}), se = {
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
    return r.pendingNotification ? r.expiresAt && r.expiresAt < Date.now() ? (await se.clearNotification(), null) : r.pendingNotification : null;
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
    await z.set((s) => ({
      ...s,
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
    const t = Date.now() - e.startVoiceCache.cachedAt, s = 7 * 24 * 60 * 60 * 1e3;
    return t > s ? (console.log("Start voice cache expired, clearing cache"), await L.clearStartVoice(), null) : (console.log("Using cached start voice for voiceType:", r), e.startVoiceCache.audioData);
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
    const t = Date.now() - e.endVoiceCache.cachedAt, s = 7 * 24 * 60 * 60 * 1e3;
    return t > s ? (console.log("End voice cache expired, clearing cache"), await L.clearEndVoice(), null) : (console.log("Using cached end voice for voiceType:", r), e.endVoiceCache.audioData);
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
}, Pe = {
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
}, oe = {
  PLAY_NOTIFICATION_SOUND: "PLAY_NOTIFICATION_SOUND",
  PLAY_TTS_SOUND: "PLAY_TTS_SOUND",
  TEST_TTS: "TEST_TTS",
  PING_POPUP: "PING_POPUP",
  PONG_POPUP: "PONG_POPUP"
}, Ue = {
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
      const s = await K.get();
      if (!s.enabled)
        return console.log("TTS is disabled"), null;
      if (!s.appid || !s.token)
        return console.error("TTS configuration is incomplete"), null;
      const o = `chrome_ext_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`, c = {
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
          reqid: o,
          text: e,
          operation: "query"
        }
      };
      console.log("Sending TTS request:", { reqid: o, text: e });
      const l = await fetch(Z.API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer; ${s.token}`
        },
        body: JSON.stringify(c)
      });
      if (!l.ok)
        throw new Error(`HTTP error! status: ${l.status}`);
      const a = await l.json();
      if (a.code !== 3e3)
        throw new Error(`TTS API error: ${a.message} (code: ${a.code})`);
      if (!a.data)
        throw new Error("No audio data received from TTS API");
      return console.log("TTS generation successful:", {
        reqid: a.reqid,
        duration: (t = a.addition) == null ? void 0 : t.duration,
        dataLength: a.data.length
      }), a.data;
    } catch (s) {
      return console.error("Error generating speech:", s), null;
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
B(Z, "API_URL", Pe.API_URL);
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
      const s = await ge.get();
      if (!s.enabled) {
        console.log("Notification sound is disabled");
        return;
      }
      console.log("Generating TTS for text:", e);
      const o = this.isStartVoiceText(e);
      let c = null;
      if (o ? (c = await L.getStartVoice(t.voiceType), c ? console.log("Using cached start voice for voiceType:", t.voiceType) : (console.log("No cached start voice found, generating new one"), c = await X.generateSpeech("专注模式已启动，加油保持专注！"), c && (await L.cacheStartVoice(t.voiceType, c), console.log("Start voice generated and cached for voiceType:", t.voiceType)))) : c = await X.generateSpeech(e), !c)
        return console.log("TTS generation failed, falling back to normal sound"), await this.playNotificationSound();
      await this.ensureOffscreenDocument();
      const l = await chrome.runtime.sendMessage({
        type: oe.PLAY_TTS_SOUND,
        volume: s.volume,
        audioData: c
      });
      l && l.success ? console.log("TTS notification played successfully with volume:", s.volume) : (console.error("Failed to play TTS notification:", l == null ? void 0 : l.error), await this.playNotificationSound());
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
        type: oe.PLAY_NOTIFICATION_SOUND,
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
      const s = await X.generateSpeech(e);
      if (!s)
        return { success: !1, error: te.TTS_GENERATION_FAILED };
      const o = await ge.get();
      if (!o.enabled)
        return { success: !1, error: te.SOUND_DISABLED };
      await this.ensureOffscreenDocument(), await new Promise((c) => setTimeout(c, fe.OFFSCREEN_LOAD_DELAY));
      try {
        const l = await new Promise((a, h) => {
          const A = setTimeout(() => {
            h(new Error(te.MESSAGE_TIMEOUT));
          }, fe.MESSAGE_TIMEOUT);
          chrome.runtime.sendMessage(
            {
              type: oe.PLAY_TTS_SOUND,
              volume: o.volume,
              audioData: s
            },
            (f) => {
              clearTimeout(A), chrome.runtime.lastError ? h(new Error(chrome.runtime.lastError.message)) : a(f);
            }
          );
        });
        return l && l.success ? { success: !0 } : { success: !1, error: (l == null ? void 0 : l.error) || "播放失败" };
      } catch (c) {
        return console.error("Message sending error:", c), { success: !1, error: "无法与音频播放器通信: " + c.message };
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
const ke = [
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
function Oe() {
  const r = Math.floor(Math.random() * ke.length);
  return ke[r];
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
      const t = await se.getNotification();
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
      const s = Math.max(
        me.MIN_PRE_GENERATE_MINUTES,
        Math.min(me.MAX_PRE_GENERATE_MINUTES, e - me.DEFAULT_PRE_GENERATE_MINUTES)
      );
      setTimeout(
        async () => {
          try {
            await this.generateAINotification(), console.log("AI notification pre-generated successfully");
          } catch (o) {
            console.error("Error pre-generating AI notification:", o);
          }
        },
        s * 60 * 1e3
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
      const t = await this.buildNotificationPrompt(), s = await this.callAIService(e, t);
      return s ? (await se.saveNotification(s), console.log("AI notification generated and cached"), s) : this.getDefaultEndMessage();
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
    }), s = (await R.get()).duration;
    return ((await Y.get()).promptTemplate || `现在是${e}，用户刚刚完成了{duration}分钟的专注时间段。请生成一条温暖、鼓励的休息提醒，内容要：
1. 简洁明了（不超过50字）
2. 积极正面，给用户成就感
3. 建议适当的休息活动
4. 语气亲切自然, 邻家女孩口吻或可爱学妹口吻, 带有情感色彩

请直接返回通知内容，不要包含其他解释。`).replace("{duration}", s.toString());
  }
  /**
   * 调用AI服务
   */
  async callAIService(e, t) {
    try {
      const s = this.getAPIEndpoint(e.provider), o = this.prepareRequestBody(e, t), c = new AbortController(), l = setTimeout(() => c.abort(), 1e4), a = await fetch(s, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${e.apiKey}`
        },
        body: JSON.stringify(o),
        signal: c.signal
      });
      if (clearTimeout(l), !a.ok)
        throw new Error(`AI API error: ${a.status} ${a.statusText}`);
      const f = (await a.json()).choices[0].message.content.trim().replace(/^["']|["']$/g, "").replace(/\n+/g, " ").trim();
      return f.length > 100 ? f.substring(0, 97) + "..." : f;
    } catch (s) {
      return console.error("Error calling AI service:", s), null;
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
    const o = e.systemPrompt || `你是一个友好、积极的助手，负责在用户专注工作一段时间后提醒他们休息。
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
        { role: "system", content: o },
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
    return Oe();
  }
  /**
   * 清除通知缓存
   */
  async clearNotificationCache() {
    try {
      await se.clearNotification(), console.log("Notification cache cleared");
    } catch (e) {
      console.error("Error clearing notification cache:", e);
    }
  }
};
B(G, "instance");
let ne = G;
const De = {
  domain: "bilibili.com",
  getSelectors() {
    return ["#nav-searchform", ".center-search__bar"];
  }
}, Be = {
  domain: "baidu.com",
  getSelectors() {
    return ["#s-hotsearch-wrapper", "#con-ceiling-wrapper"];
  },
  getCustomHandler(r) {
    return function(t) {
      console.log("Applying Baidu specific study mode with selectors:", t);
      const s = document.createElement("div");
      s.style.position = "fixed", s.style.top = "70px", s.style.right = "10px", s.style.backgroundColor = "rgba(0, 128, 0, 0.8)", s.style.color = "white", s.style.padding = "12px 16px", s.style.borderRadius = "8px", s.style.zIndex = "9999999", s.style.fontSize = "14px", s.style.fontFamily = "Arial, sans-serif", s.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.2)", s.style.width = "200px", s.style.textAlign = "center";
      const o = document.createElement("div");
      o.textContent = "专注提醒", o.style.fontWeight = "bold", o.style.fontSize = "16px", o.style.marginBottom = "8px", s.appendChild(o);
      const c = document.createElement("div");
      c.textContent = "已为您屏蔽热搜和顶部导航，专注于当前任务", s.appendChild(c), document.body.appendChild(s), setTimeout(() => {
        s.style.transition = "opacity 1s", s.style.opacity = "0", setTimeout(() => {
          document.body.contains(s) && document.body.removeChild(s);
        }, 1e3);
      }, 3e4), t.forEach((a) => {
        try {
          const h = document.querySelectorAll(a);
          h.forEach((A) => {
            A instanceof HTMLElement && (A.style.display = "none", A.dataset.studyModeDisabled = "true");
          }), console.log(`Disabled ${h.length} elements with selector: ${a}`);
        } catch (h) {
          console.error(`Error disabling elements with selector ${a}:`, h);
        }
      });
      const l = new MutationObserver((a) => {
        let h = !1;
        a.forEach((A) => {
          A.type === "childList" && A.addedNodes.length > 0 && (h = !0);
        }), h && t.forEach((A) => {
          try {
            document.querySelectorAll(A).forEach((T) => {
              T instanceof HTMLElement && !T.dataset.studyModeDisabled && (T.style.display = "none", T.dataset.studyModeDisabled = "true");
            });
          } catch (f) {
            console.error(`Error in mutation observer for selector ${A}:`, f);
          }
        });
      });
      l.observe(document.documentElement, {
        childList: !0,
        subtree: !0
      }), window.__studyModeObserver = l;
    };
  }
}, he = [
  De,
  Be
  // 在这里添加更多网站处理器
];
function Fe(r) {
  try {
    const t = new URL(r).hostname;
    console.log("getSiteHandler: Checking URL:", r), console.log("getSiteHandler: Hostname:", t), console.log(
      "getSiteHandler: Available handlers:",
      he.map((o) => o.domain)
    );
    const s = he.find((o) => !!(t === o.domain || t.endsWith("." + o.domain) || (t.startsWith("www.") ? t.substring(4) : t) === o.domain));
    return console.log("getSiteHandler: Found handler:", (s == null ? void 0 : s.domain) || "none"), s;
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
      const s = await R.get();
      if (console.log("UrlBlocker: Focus config:", s), !s.isActive) {
        console.log("UrlBlocker: Focus mode not active, skipping URL check");
        return;
      }
      const o = await C.get();
      console.log("UrlBlocker: Blocked config:", o);
      const c = this.isUrlBlocked(t, o.urls);
      if (console.log("UrlBlocker: Is blocked?", c), c) {
        console.log("UrlBlocker: Blocking URL:", t), await this.showBlockedWarning(e, t);
        return;
      }
      const l = this.isUrlBlocked(t, o.studyModeUrls);
      if (console.log("UrlBlocker: Is study mode?", l), l) {
        console.log("UrlBlocker: Applying study mode to URL:", t), await this.handleStudyModeUrl(e, t, o.studyModeSelectors);
        return;
      }
      console.log("UrlBlocker: URL is allowed:", t);
    } catch (s) {
      console.error("Error checking tab URL:", s);
    }
  }
  /**
   * 检查URL是否被阻止
   */
  isUrlBlocked(e, t) {
    try {
      const o = new URL(e).hostname;
      console.log("UrlBlocker: Checking URL:", e), console.log("UrlBlocker: Domain:", o), console.log("UrlBlocker: Blocked URLs list:", t);
      const c = t.some((l) => {
        let a = l.trim();
        if (a.startsWith("http://") || a.startsWith("https://"))
          try {
            a = new URL(a).hostname;
          } catch {
            a = a.replace(/^https?:\/\//, "").split("/")[0];
          }
        if (console.log("UrlBlocker: Comparing with cleaned URL:", a), a.startsWith("*.")) {
          const k = a.substring(2), O = o.endsWith(k);
          return console.log("UrlBlocker: Wildcard match result:", O), O;
        }
        if (l.includes("/") && !l.startsWith("http")) {
          const k = e.includes(l);
          return console.log("UrlBlocker: Full URL match result:", k), k;
        }
        const h = o === a, A = o.endsWith("." + a), f = a.endsWith("." + o), T = o.startsWith("www.") ? o.substring(4) : o, P = a.startsWith("www.") ? a.substring(4) : a, M = T === P, N = h || A || f || M;
        return console.log("UrlBlocker: Domain match result:", {
          domain: o,
          cleanBlockedUrl: a,
          domainWithoutWww: T,
          cleanBlockedUrlWithoutWww: P,
          exactMatch: h,
          subdomainMatch: A,
          parentDomainMatch: f,
          wwwMatch: M,
          finalResult: N
        }), N;
      });
      return console.log("UrlBlocker: Final blocking result:", c), c;
    } catch (s) {
      return console.error("Error checking if URL is blocked:", s), !1;
    }
  }
  /**
   * 显示阻止警告页面
   */
  async showBlockedWarning(e, t) {
    try {
      const s = chrome.runtime.getURL("blocked.html") + "?url=" + encodeURIComponent(t);
      await chrome.tabs.update(e, { url: s }), console.log("Blocked URL redirected to warning page:", t);
    } catch (s) {
      console.error("Error showing blocked warning:", s);
    }
  }
  /**
   * 处理学习模式URL
   */
  async handleStudyModeUrl(e, t, s) {
    try {
      const c = new URL(t).hostname;
      console.log("UrlBlocker: Handling study mode for URL:", t), console.log("UrlBlocker: Domain:", c);
      const l = Fe(t);
      if (l) {
        console.log("UrlBlocker: Found predefined site handler for domain:", l.domain), await this.applySiteHandler(e, l);
        return;
      }
      console.log("UrlBlocker: No predefined site handler found, checking user selectors");
      const a = s[c] || [];
      if (console.log("UrlBlocker: User selectors for domain:", c, a), a.length === 0) {
        console.log("UrlBlocker: No selectors configured for study mode URL:", t);
        return;
      }
      await this.injectHideElements(e, a), console.log("UrlBlocker: Study mode applied to:", t, "with selectors:", a);
    } catch (o) {
      console.error("Error handling study mode URL:", o);
    }
  }
  /**
   * 注入CSS隐藏元素
   */
  async injectHideElements(e, t) {
    try {
      const s = t.map((o) => `${o} { display: none !important; }`).join(`
`);
      await chrome.scripting.insertCSS({
        target: { tabId: e },
        css: s
      }), console.log("CSS injected to hide elements:", t);
    } catch (s) {
      console.error("Error injecting CSS:", s);
    }
  }
  /**
   * 应用网站特定处理器
   */
  async applySiteHandler(e, t) {
    try {
      const s = t.getSelectors();
      if (t.getCustomHandler) {
        const o = t.getCustomHandler(e);
        await chrome.scripting.executeScript({
          target: { tabId: e },
          func: o,
          args: [s]
        }), console.log("UrlBlocker: Applied custom site handler for:", t.domain);
      } else
        await this.injectHideElements(e, s), console.log("UrlBlocker: Applied default site handler for:", t.domain);
    } catch (s) {
      console.error("Error applying site handler:", s);
    }
  }
  /**
   * 添加阻止的URL
   */
  async addBlockedUrl(e) {
    try {
      await C.addUrl(e), console.log("URL added to blocked list:", e);
    } catch (t) {
      throw console.error("Error adding blocked URL:", t), t;
    }
  }
  /**
   * 移除阻止的URL
   */
  async removeBlockedUrl(e) {
    try {
      await C.removeUrl(e), console.log("URL removed from blocked list:", e);
    } catch (t) {
      throw console.error("Error removing blocked URL:", t), t;
    }
  }
  /**
   * 添加学习模式URL
   */
  async addStudyModeUrl(e) {
    try {
      await C.addStudyModeUrl(e), console.log("URL added to study mode list:", e);
    } catch (t) {
      throw console.error("Error adding study mode URL:", t), t;
    }
  }
  /**
   * 移除学习模式URL
   */
  async removeStudyModeUrl(e) {
    try {
      await C.removeStudyModeUrl(e), console.log("URL removed from study mode list:", e);
    } catch (t) {
      throw console.error("Error removing study mode URL:", t), t;
    }
  }
  /**
   * 获取阻止的URL列表
   */
  async getBlockedUrls() {
    try {
      const e = await C.get();
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
      const e = await C.get();
      let t = !1;
      for (const s of he) {
        const o = s.domain;
        e.studyModeUrls.includes(o) || (e.studyModeUrls.push(o), t = !0, console.log("UrlBlocker: Added predefined site to study mode:", o));
      }
      t && (await C.set(e), console.log("UrlBlocker: Predefined sites initialized"));
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
      chrome.notifications.create(Ue.FOCUS_START, {
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
        const s = Math.ceil(t / 60);
        chrome.action.setBadgeText({ text: s.toString() });
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
      chrome.notifications.create(Ue.FOCUS_END, {
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
      for (const s of e)
        s.id && s.url && !s.url.startsWith("chrome://") && !s.url.startsWith("chrome-extension://") && (console.log("FocusManager: Checking tab:", s.url), await t.checkTabUrl(s.id, s.url));
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
const pe = ye.getInstance(), ve = J.getInstance(), we = ae.getInstance();
chrome.runtime.onMessage.addListener((r, e, t) => r.type === oe.TEST_TTS ? (ve.testTTS(r.text).then((s) => t(s)).catch((s) => {
  console.error("TTS test error:", s), t({ success: !1, error: s.message });
}), !0) : !1);
chrome.storage.onChanged.addListener(async (r, e) => {
  if (e === "local") {
    if (r["focus-time-storage-key"]) {
      const t = r["focus-time-storage-key"].newValue, s = r["focus-time-storage-key"].oldValue;
      t != null && t.isActive && !(s != null && s.isActive) ? await pe.startFocus(t.duration) : !(t != null && t.isActive) && (s != null && s.isActive) && await pe.stopFocus();
    }
    if (r["tts-config-storage-key"]) {
      const t = r["tts-config-storage-key"].newValue, s = r["tts-config-storage-key"].oldValue;
      t != null && t.voiceType && (s != null && s.voiceType) && t.voiceType !== s.voiceType && (console.log("VoiceType changed, clearing voice cache"), await ve.clearVoiceCacheOnVoiceTypeChange(s.voiceType, t.voiceType));
    }
  }
});
chrome.tabs.onUpdated.addListener(async (r, e, t) => {
  e.status === "complete" && t.url && await we.checkTabUrl(r, t.url);
});
chrome.tabs.onActivated.addListener(async (r) => {
  try {
    const e = await chrome.tabs.get(r.tabId);
    e.url && await we.checkTabUrl(r.tabId, e.url);
  } catch (e) {
    console.error("Error handling tab activation:", e);
  }
});
async function Ge() {
  try {
    console.log("Initializing background script...");
    const r = await _e.get();
    console.log("Theme loaded:", r), await pe.initialize(), await we.initializePredefinedSites(), console.log("Background script initialized successfully");
  } catch (r) {
    console.error("Error during initialization:", r);
  }
}
Ge();
