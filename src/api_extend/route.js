class ActionMap extends Map {
  constructor() {
    super();
  }

  superSet(...args) {
    return super.set(args);
  }

  superGet(...args) {
    return super.get(args);
  }

  /**
   * @overwrite
   */
  set(key, value) {
    return super.set(ActionMap._PrivateKeyCreat(key), value);
  }

  /**
   * @overWrite
   */
  get(key) {
    return super.get(ActionMap._PrivateKeyCreat(key));
  }

  action(args) {
    let _key = [];
    for (const arg of args) {
      _key.push(typeof arg);
    }
    this.get(_key)(args);
  }

  static _PrivateKeyCreat(key) {
    let resultKey = "";
    for (const keyItem of key) {
      resultKey += `${keyItem};`;
    }
    return resultKey;
  }
}

export class RouteUtils {
  constructor(){
    this.init('nav')
    this.init('switch')
    this.utils = RouteUtils
  }
  init(name){
    const { baseRoute, paramsStrinfy } = RouteUtils
    this[`${name}ActionMap`] = new ActionMap();
    this[`${name}ActionMap`].set(["string"], (args) => baseRoute(args[0], name));
    this[`${name}ActionMap`].set(["object"], (args) => {
      const { path, params } = args[0];
      baseRoute(path + paramsStrinfy(params), name)
    });
  }
  $push(...args) {
    this.navActionMap.action(args);
  }
  $toTab(...args) {
    this.switchActionMap.action(args);
  }

  static paramsStrinfy(params) {
    // 'path?key=value&key2=value2'
    let result = "";
    for (const [key, value] of Object.entries(params)) {
      result === "" ? (result += "?") : (result += "&");
      result += `${key}:${value}`;
    }
    return result;
  }

  static actionAlias = {
    nav: "navigateTo",
    switch: "switchTab"
  };

  static baseRoute(path, type) {
    const { actionAlias }= RouteUtils
    let url = "";
    if (path.startsWith("/")) {
      url = "/pages" + path;
    } else {
      url = "/pages/" + path;
    }
    return new Promise((resolve, reject) => {
      wx[actionAlias[type]]({
        url,
        success: (result) => {
          resolve(result);
        },
        fail: (e) => {
          reject(e);
        },
        complete: () => {},
      });
    });
  }
}

Object.seal(RouteUtils.actionAlias)
