import { RouteUtils } from "../api/route"
const pageKeys = [
  "data"
];

const lifeHooks = [
  "onLoad", //	function			生命周期回调—监听页面加载
  "onShow", //	function			生命周期回调—监听页面显示
  "onReady", //	function			生命周期回调—监听页面初次渲染完成
  "onHide", //	function			生命周期回调—监听页面隐藏
  "onUnload", //	function			生命周期回调—监听页面卸载
  "onPullDownRefresh", //	function			监听用户下拉动作
  "onReachBottom", //	function			页面上拉触底事件的处理函数
  "onShareAppMessage", //	function			用户点击右上角转发
  "onPageScroll", //	function			页面滚动触发事件的处理函数
  "onResize", //	function			页面尺寸改变时触发，详见 响应显示区域变化
  "onTabItemTap", // function			当前是 tab 页时，点击 tab 时触发
];

export class AbstractProxy {
  nativeInstance
  constructor(...args){}
  /**
   * @name diff
   * @description 用于比对值
   * @param {Object} value 
   */
  diff(value){
    return value
  }
  setData(value){
    if(this.diff(value)){
      this.nativeInstance.setData(value)
    }
  }
  get data(){
    return this.nativeInstance.data;
  }

  
  static create(...args){
    return new this(...args)
  }
}

interface PageProxyOption{
  [name:string]: Function | Object
}

export class PageProxy extends AbstractProxy {
  $router = new RouteUtils();
  constructor(options:PageProxyOption) {
    super();
    let nativeObjOption = {};
    let proxyObj = this;
    
    this.nativeInstance = undefined;
    for (const [key, value ] of Object.entries(options)) {
      
      // 拦截 声明周期 钩子，绑定获取 Page 实例
      if(lifeHooks.includes(key) && (typeof value === "function") ){
        nativeObjOption[key] = function(...args){
          if(key === 'onLoad'){
            proxyObj.nativeInstance = this;
          }
          value.call(proxyObj, ...args)
        }
        continue;
      }

      // 将 Page 实例方法交给 代理对象 代理
      if(typeof value==='function'){
        this[key] =  value.bind(this);
        nativeObjOption[key] = function(...args){
          return proxyObj[key](...args)
        }
        continue;
      }

      console.log(key)
      // 将原生参数直传进去
      nativeObjOption[key] = value;
    }

    // 生成 Page 实例
    Page(nativeObjOption);
  }

  get pages(){
    return getCurrentPages();
  }
}

export class ComponentProxy extends AbstractProxy{
  constructor(option){
    super();
  }
} 

export const PageCreater = (option) => new PageProxy(option);

export const ComponentCreater = (option) => new ComponentProxy(option);
