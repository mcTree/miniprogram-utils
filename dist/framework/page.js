import { RouteUtils } from "../api/route";
const pageKeys = [
    "data"
];
const lifeHooks = [
    "onLoad",
    "onShow",
    "onReady",
    "onHide",
    "onUnload",
    "onPullDownRefresh",
    "onReachBottom",
    "onShareAppMessage",
    "onPageScroll",
    "onResize",
    "onTabItemTap",
];
export class AbstractProxy {
    constructor(...args) { }
    /**
     * @name diff
     * @description 用于比对值
     * @param {Object} value
     */
    diff(value) {
        return value;
    }
    setData(value) {
        if (this.diff(value)) {
            this.nativeInstance.setData(value);
        }
    }
    get data() {
        return this.nativeInstance.data;
    }
    static create(...args) {
        return new this(...args);
    }
}
export class PageProxy extends AbstractProxy {
    constructor(options) {
        super();
        this.$router = new RouteUtils();
        let nativeObjOption = {};
        let proxyObj = this;
        this.nativeInstance = undefined;
        for (const [key, value] of Object.entries(options)) {
            // 拦截 声明周期 钩子，绑定获取 Page 实例
            if (lifeHooks.includes(key) && (typeof value === "function")) {
                nativeObjOption[key] = function (...args) {
                    if (key === 'onLoad') {
                        proxyObj.nativeInstance = this;
                    }
                    value.call(proxyObj, ...args);
                };
                continue;
            }
            // 将 Page 实例方法交给 代理对象 代理
            if (typeof value === 'function') {
                this[key] = value.bind(this);
                nativeObjOption[key] = function (...args) {
                    return proxyObj[key](...args);
                };
                continue;
            }
            console.log(key);
            // 将原生参数直传进去
            nativeObjOption[key] = value;
        }
        // 生成 Page 实例
        Page(nativeObjOption);
    }
    get pages() {
        return getCurrentPages();
    }
}
export class ComponentProxy extends AbstractProxy {
    constructor(option) {
        super();
    }
}
export const PageCreater = (option) => new PageProxy(option);
export const ComponentCreater = (option) => new ComponentProxy(option);
//# sourceMappingURL=page.js.map