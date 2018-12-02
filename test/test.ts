import { expect } from 'chai';
import { describe, it } from 'mocha';
import { sayHello } from '../lib/index';

describe('ts-test say hello', () => {
  it("should return 'hello world'", () => {
    const result = sayHello();
    expect(result).to.equal('hello world');
  });
});
