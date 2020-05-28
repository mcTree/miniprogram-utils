export class Enum {
  constructor();
  constructor(arg: [Array<any>]);
  constructor(...args) {

    // 重载类型守卫
    const isNothing = (args: any): boolean => args.length === 0;
    const isSample = (args: any): boolean => args.length === 1;
    const isMulti = (args: any): boolean => args.length > 1;

    const dataKey = Symbol('EnumDataKey')
    this[dataKey] = new Map()
    /**
     * 无参数的重载
     */
    nothing: {
      if (!isNothing(args)) break nothing;
      return;
    }

    array: {
      let origin = [];
      sample: {
        if (!isSample(args)) break sample;
        origin = args[0]
      }
      multi: {
        if (!isMulti(args)) break multi;
        origin = args;
      }
      if(origin.length===0) break array;
      for (const [key, value] of origin) {
        Object.defineProperty(this, key,{
          enumerable:true,
          get(){
            return this[dataKey].get(key)
          },
          set(nv){
            return this[dataKey].set(key,nv)
          }
        })
        this[key] = value;
      }
    }
  }
}
