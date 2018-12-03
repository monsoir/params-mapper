import { TypeOf, Types } from "./TypeOf";

export interface ITransformPayload {
  /**
   * value 为返回到服务端的字段名称
   */
  paramKey: string;

  /**
   * 验证值是否合法的函数
   */
  validator?: (param1: any, ...$n: any[]) => Boolean;

  /**
   * 验证失败的提示
   */
  validationFailureMessage?: string;

  /**
     * 是否总是保留参数，有些接口没值时不需要传
     *
     * 当此值为 true 时，总是传， false 时忽略空值
     * 空置情况：普通对象 -> 自有属性个数为 0, 数组 -> 长度为 0, 字符串，数字 -> 零值
     *
     * 默认是 false
     */
  alwaysKeep?: Boolean;
  [key: string]: any;
}

interface ITransferPayloadParam {
  [key: string]: ITransformPayload;
}

export function autoTransfer(transformationPayload: ITransferPayloadParam) {
  if (!transformationPayload) throw new Error('Parameters should be provided');
  return ((target: Function) => {
    Object.defineProperty(target.prototype, 'transformationPayload', {
      value: transformationPayload,
    });
    return target;
  });
}

interface IPayload {
  [key: string]: any;
}

export class BaseParamObject {
  payload: IPayload;
  transformationPayload?: ITransformPayload;

  constructor(payload: IPayload) {
    this.payload = payload;
  }

  getParams(): {[key: string]: any} {
    const mapper = this.transformationPayload;
    if (!mapper) return {};

    const params = Object.keys(mapper).reduce((acc: {[key: string]: any}, currentKey: string) => {
      const value = (this.payload || {})[currentKey];
      const transformInfo = mapper[currentKey];

      // 检验
      if (transformInfo.validator) {
        const validated = transformInfo.validator(value);
        if (!validated) {
          throw new Error(transformInfo.validationFailureMessage || '');
        }
      }

      // 判断空的要不要传
      if (transformInfo.alwaysKeep) {
        // 总是保留
        acc[transformInfo.paramKey] = value;
      } else {
        let shouldKeep = false;
        switch (TypeOf(value)) {
          case Types.object:
            shouldKeep = Object.keys(value || {}).length > 0;
            break;
          case Types.array:
            shouldKeep = (value || []).length > 0;
            break;
          case Types.string:
          case Types.number:
            shouldKeep = !!value;
            break;
          default:
            break;
        }

        if (shouldKeep) {
          acc[transformInfo.paramKey] = value;
        }
      }

      return acc;
    }, {});
    return params;
  }

}
