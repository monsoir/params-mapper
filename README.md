# params-mapper

⚠️ 请移步到重构后的 [params-mapper](https://github.com/Monsoir/params-mapper2)

将前端页面参数映射到返回给服务端的参数

Install

```sh
npm i params-mapper
```

Code this:

```js
const paramsMapper = require('params-mapper');
const BaseParamObject = paramsMapper.BaseParamObject;
const autoTransfer = paramsMapper.autoTransfer;

// or

import { autoTransfer, BaseParamObject } from 'params-mapper';

const TransformationPayload = {
    emptyObject: {
      paramKey: 'empty_object',
      alwaysKeep: true,
    },
    emptyObjectNotKeep: {
      paramKey: 'empty_object_not_keep',
    },
    notEmptyObject: {
      paramKey: 'not_empty_object',
    },
  
    emptyArray: {
      paramKey: 'empty_array',
      alwaysKeep: true,
    },
    emptyArrayNotKeep: {
      paramKey: 'empty_array_not_keep',
    },
    notEmptyArray: {
      paramKey: 'not_empty_array',
    },
  };
  
  const payload = {
    emptyObject: {},
    emptyObjectNotKeep: {},
    notEmptyObject: { a: 1 },
  
    emptyArray: [],
    emptyArrayNotKeep: [],
    notEmptyArray: [1, 2, 3],
  };
  
  class A extends BaseParamObject {}
  autoTransfer(TransformationPayload)(A);
  
  // 或者
  // or this:
  const A = autoTransfer(TransformationPayload)(class extends BaseParamObject {});
  
  const temp = new A(payload);
  const params = temp.getParams();
  console.log(params);
```

Result in:

```
{
    "empty_object": {},
    "not_empty_object": {
        "a": 1
    },
    "empty_array": [],
    "not_empty_array": [
        1,
        2,
        3
    ]
}
```



