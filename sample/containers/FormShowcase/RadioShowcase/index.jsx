import React from 'react';
import { Form } from 'omni-common-ui';

const RadioShowcase = () => <div>
  <Form.RadioList name="radio" label="Radio" items={['foo', 'bar']}></Form.RadioList>
</div>;

export default RadioShowcase;
