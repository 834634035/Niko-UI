export const isNumber = (val: any): val is number => typeof val === "number";

export const isString = (val: any): val is string => typeof val === "string";

export const isBoolean = (val: any): val is boolean => typeof val === "boolean";

export const isFunction = (val: any): val is Function =>
  typeof val === "function";

export const isArray = (val: any): val is Array<any> => Array.isArray(val);

export const isPlainObject = (val: any): val is Object =>
  Object.prototype.toString.call(val) === "[object Object]";

export const isPromise = <T = any>(val: any): val is Promise<T> =>
  val instanceof Promise;

export const isDef = <T = any>(val?: T): val is T =>
  val !== undefined && val !== null;

export const isUndefined = (val: any): val is undefined => val === undefined;

export const isNull = (val: any): val is null => val === null;

export const isObject = (val: any): val is Object => val instanceof Object;

export const isObjects = (val: any): val is Object =>
  val instanceof Object &&
  !Array.isArray(val) &&
  !isFunction(val) &&
  !isNull(val);
