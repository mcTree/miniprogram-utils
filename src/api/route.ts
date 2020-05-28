class ActionMap extends Map {
  constructor() {
    super();
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

type ValueType = number|string|boolean;

interface RouterActionOption{
  path:string
  params?:Record<string, ValueType>
}

export class RouteUtils {
  // 静态成员
  static actionAlias = {
    push: "navigateTo",
    tab: "switchTab",
    redirect: "redirectTo",
    reLaunch: "reLaunch",
  };

  static paramsStrinfy(params) {
    // 'path?key=value&key2=value2'
    let result = "";
    for (const [key, value] of Object.entries(params)) {
      result === "" ? (result += "?") : (result += "&");
      result += `${key}:${value}`;
    }
    return result;
  }

  static baseRoute(path, type, prefix = "") {
    let url = "";
    if (path.startsWith("/")) {
      url = prefix + path;
    } else {
      url = prefix + "/" + path;
    }
    return wx[type]({url})
  }

  // 构造函数
  constructor() {}

  // 实例成员
  utils = RouteUtils
  push(option:RouterActionOption ):void;
  push(path:string, ...params: [string] ):void;
  push(arg, ...rest):any{
    const { baseRoute, paramsStrinfy } = RouteUtils;

    option:{
      // 重载守卫
      if(typeof arg === 'object')break option;
      const { path, params } = arg;
      baseRoute(path + paramsStrinfy(params), 'navigateTo');
      console.log('this option block')
    }

    path:{
      // 重载守卫
      if( typeof arg !== 'string' ) break path;
      console.log('this path block')
      baseRoute(arg, 'navigateTo')
    };
    
  }

  get pages(){
    return getCurrentPages();
  }
}
Object.freeze(RouteUtils);

export const router = new RouteUtils();
