enum typeNameEnum {
  "null", // done
  "undefined", // done
  "NaN", // done
  "string", // done
  "number", // done
  "boolean", // done
  "function", // done
  "symbol", // done
  "Array", // done
  "Map", // done
  "Set", // done
  "object", // done
  "bigint", // done
}

type typeName = keyof typeof typeNameEnum;

const valueTypeSet = new Set(["string", "number", "boolean", "bigint"]);

// guards
export const isUndefined = (sample: any): boolean =>
  typeof sample === "undefined";

export const isString = (sample: any): boolean => typeof sample === "string";

export const isNumber = (sample: any): boolean => typeof sample === "number";

export const isBoolean = (sample: any): boolean => typeof sample === "boolean";

export const isFunction = (sample: any): boolean =>
  typeof sample === "function";

export const isSymbol = (sample: any): boolean => typeof sample === "symbol";

export const isNull = (sample: any): boolean => sample === null;

export const isValueType = (sample: any): boolean =>
  valueTypeSet.has(typeof sample);

export const isArray = (sample: any): boolean => Array.isArray(sample);

const _isObject = (sample: any): boolean => typeof sample === "object";

export const isMap = (sample: any): boolean =>
  _isObject(sample) && sample instanceof Map;

export const isSet = (sample: any): boolean =>
  _isObject(sample) && sample instanceof Set;

// export const isNaN = isNaN;

const CollectionGuards = {
  Array: isArray,
  Map: isMap,
  Set: isSet,
};

export const typeOf = (sample: any): typeName => {
  if (isNull(sample)) return "null";
  if (isNaN(sample)) return "NaN";
  if (_isObject(sample)) {
    for (const [typename, guard] of Object.entries(CollectionGuards)) {
      if (guard(sample)) return <typeName>typename;
    }
  }
  return typeof sample;
};
