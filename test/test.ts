import { expect } from 'chai';
import { describe, it } from 'mocha';
import Validator from './Validator';

import { BaseParamObject, autoTransfer, ITransformPayload } from '../lib/index';

describe('Check if instance has the property', () => {
  it('Instance should have the property', () => {
    @autoTransfer({})
    class A extends BaseParamObject {}

    const temp = new A({});
    expect(temp.transformationPayload).is.not.undefined;
  });
});

describe('Function autoTransfer also return the Class', () => {
  it('Class wrapped by function autoTransfer should also return itself, and should have the property', () => {
    class A extends BaseParamObject {}
    const WrappedA = autoTransfer({})(A) as any;

    expect(WrappedA).is.not.undefined;

    const temp = new WrappedA({});
    expect(temp.transformationPayload).is.not.undefined;
  });
});

interface IPayload {
  [key: string]: ITransformPayload;
}

const TransformationPayloadKeepValue: IPayload = {
  objectParam: {
    paramKey: 'object_param',
    alwaysKeep: true,
  },
  arrayParam: {
    paramKey: 'array_param',
    alwaysKeep: true,
  },
  stringParam: {
    paramKey: 'string_param',
    alwaysKeep: true,
  },
  numberParam: {
    paramKey: 'number_param',
    alwaysKeep: true,
  },
};

const TransformationPayloadNotKeepValue: IPayload = {
  objectParam: {
    paramKey: 'object_param',
  },
  arrayParam: {
    paramKey: 'array_param',
  },
  stringParam: {
    paramKey: 'string_param',
  },
  numberParam: {
    paramKey: 'number_param',
  },
};

describe('Keep values?', () => {
  const payload = {
    objectParam: {},
    arrayParam: [],
    stringParam: '',
    numberParam: 0,
  };
  it('Always keep values', () => {
    @autoTransfer(TransformationPayloadKeepValue)
    class A extends BaseParamObject {}

    const temp = new A(payload);
    const params = temp.getParams();
    expect(params.object_param).to.be.instanceOf(Object);
    expect(params.array_param).to.be.instanceOf(Array);
    expect(params.string_param).to.equals('');
    expect(params.number_param).to.equals(0);
  });

  it('Not keep empty values', () => {
    @autoTransfer(TransformationPayloadNotKeepValue)
    class A extends BaseParamObject {}

    const temp = new A(payload);
    const params = temp.getParams();
    expect(params.object_param).to.be.undefined;
    expect(params.array_param).to.be.undefined;
    expect(params.string_param).to.be.undefined;
    expect(params.number_param).to.be.undefined;
  });
});

const TransformationPayloadValidate: IPayload = {
  emptyString: {
    paramKey: 'empty_string',
    validator: Validator.notEmptyString,
    validationFailureMessage: 'should not be empty(string)',
  },
  emptyArray: {
    paramKey: 'empty_array',
    validator: Validator.notEmptyArray,
    validationFailureMessage: 'should not be empty(array)',
  },
};

describe('validate', () => {
  it('tip for empty string', () => {
    @autoTransfer(TransformationPayloadValidate)
    class A extends BaseParamObject {}

    const payload = {
      emptyString: '',
      emptyArray: [1, 2, 3],
    };

    const temp = new A(payload);
    let params = null;
    try {
      params = temp.getParams();  
    } catch (e) {
      expect(e.message).to.be.equals('should not be empty(string)');
    }
  });

  it('tip for empty array', () => {
    @autoTransfer(TransformationPayloadValidate)
    class A extends BaseParamObject {}

    const payload = {
      emptyString: 'abc',
      emptyArray: [],
    };

    const temp = new A(payload);
    let params = null;
    try {
      params = temp.getParams();
    } catch (e) {
      expect(e.message).to.be.equals('should not be empty(array)');
    }
  });
});

const TransformationPayload: IPayload = {
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

  emptyString: {
    paramKey: 'empty_string',
    alwaysKeep: true,
  },
  emptyStringNotKeep: {
    paramKey: 'empty_string_not_keep',
  },
  notEmptyString: {
    paramKey: 'not_empty_string',
  },

  nilNumber: {
    paramKey: 'nil_number',
    alwaysKeep: true,
  },
  nilNumberNotKeep: {
    paramKey: 'nil_number_not_keep',
  },
  notNilNumber: {
    paramKey: 'not_nil_number',
  },
};

describe('can get params', () => {
  const payload = {
    emptyObject: {},
    emptyObjectNotKeep: {},
    notEmptyObject: { a: 1 },

    emptyArray: [],
    emptyArrayNotKeep: [],
    notEmptyArray: [1, 2, 3],

    emptyString: '',
    emptyStringNotKeep: '',
    notEmptyString: 'abc',

    nilNumber: 0,
    nilNumberNotKeep: 0,
    notNilNumber: 1000,
  };

  it('get params', () => {
    @autoTransfer(TransformationPayload)
    class A extends BaseParamObject {}

    const temp = new A(payload);
    const params = temp.getParams();

    expect(params.empty_object).is.instanceOf(Object);
    expect(Object.keys(params.empty_object).length).equals(0);
    expect(params.empty_object_not_keep).is.undefined;
    expect(params.not_empty_object).is.not.undefined;
    expect(Object.keys(params.not_empty_object).length).is.above(0);

    expect(params.empty_array).is.instanceOf(Array);
    expect(params.empty_array.length).is.equals(0);
    expect(params.empty_array_not_keep).is.undefined;
    expect(params.not_empty_array).is.instanceOf(Array);
    expect(params.not_empty_array.length).is.above(0);

    expect(params.empty_string).is.equals('');
    expect(params.empty_string_not_keep).is.undefined;
    expect(typeof params.not_empty_string).is.equals('string');
    expect(params.not_empty_string.length).is.above(0);

    expect(params.nil_number).is.equals(0);
    expect(params.nil_number_not_keep).is.undefined;
    expect(typeof params.not_nil_number).is.equals('number')
    expect(params.not_nil_number).is.above(0);
  });
});
