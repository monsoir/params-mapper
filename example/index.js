const BaseParamObject = require('../dist/index').BaseParamObject;
const autoTransfer = require('../dist/index').autoTransfer;

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
const temp = new A(payload);
const params = temp.getParams();
console.log(params);