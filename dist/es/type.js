var typeNameEnum;
(function (typeNameEnum) {
    typeNameEnum[typeNameEnum["null"] = 0] = "null";
    typeNameEnum[typeNameEnum["undefined"] = 1] = "undefined";
    typeNameEnum[typeNameEnum["NaN"] = 2] = "NaN";
    typeNameEnum[typeNameEnum["string"] = 3] = "string";
    typeNameEnum[typeNameEnum["number"] = 4] = "number";
    typeNameEnum[typeNameEnum["boolean"] = 5] = "boolean";
    typeNameEnum[typeNameEnum["function"] = 6] = "function";
    typeNameEnum[typeNameEnum["symbol"] = 7] = "symbol";
    typeNameEnum[typeNameEnum["Array"] = 8] = "Array";
    typeNameEnum[typeNameEnum["Map"] = 9] = "Map";
    typeNameEnum[typeNameEnum["Set"] = 10] = "Set";
    typeNameEnum[typeNameEnum["object"] = 11] = "object";
    typeNameEnum[typeNameEnum["bigint"] = 12] = "bigint";
})(typeNameEnum || (typeNameEnum = {}));
const valueTypeSet = new Set(["string", "number", "boolean", "bigint"]);
// guards
export const isUndefined = (sample) => typeof sample === "undefined";
export const isString = (sample) => typeof sample === "string";
export const isNumber = (sample) => typeof sample === "number";
export const isBoolean = (sample) => typeof sample === "boolean";
export const isFunction = (sample) => typeof sample === "function";
export const isSymbol = (sample) => typeof sample === "symbol";
export const isNull = (sample) => sample === null;
export const isValueType = (sample) => valueTypeSet.has(typeof sample);
export const isArray = (sample) => Array.isArray(sample);
const _isObject = (sample) => typeof sample === "object";
export const isMap = (sample) => _isObject(sample) && sample instanceof Map;
export const isSet = (sample) => _isObject(sample) && sample instanceof Set;
// export const isNaN = isNaN;
const CollectionGuards = {
    Array: isArray,
    Map: isMap,
    Set: isSet,
};
export const typeOf = (sample) => {
    if (isNull(sample))
        return "null";
    if (isNaN(sample))
        return "NaN";
    if (_isObject(sample)) {
        for (const [typename, guard] of Object.entries(CollectionGuards)) {
            if (guard(sample))
                return typename;
        }
    }
    return typeof sample;
};
//# sourceMappingURL=type.js.map