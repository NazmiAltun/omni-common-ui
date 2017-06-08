import styles from './style.postcss';

import React from 'react';
import { shallow, mount } from 'enzyme';
import { Field } from './';

describe('Form', () => {
  describe('Field', () => {
    test('applies error style if showError returns true', () => {
      const wrapper = shallow(<Field showError={() => true}
          showRequired={() => false}
          getErrorMessage={() => ''} />);
      expect(wrapper.find(`.${styles.__error}`)).toHaveLength(1);
    });

    test('does not apply error style if showError returns false', () => {
      const wrapper = shallow(<Field showError={() => false}
          showRequired={() => false}
          getErrorMessage={() => ''} />);
      expect(wrapper.find(`.${styles.__error}`)).toHaveLength(0);
    });

    test('shows the error message provided by getErrorMessage if showError returns true', () => {
      const errorMessage = 'This is not a valid email';
      const wrapper = shallow(<Field showError={() => true}
          showRequired={() => false}
          getErrorMessage={() => errorMessage} />);
      expect(wrapper.text()).toBe(errorMessage);
    });

    test('does not show the error message provided by getErrorMessage ' +
        'if showError returns false', () => {
      const wrapper = shallow(<Field showError={() => false}
          showRequired={() => false}
          getErrorMessage={() => ''} />);
      const errorClass = styles.Field_wrap_inputContainer_validationError;
      expect(wrapper.find(`.${errorClass}`)).toHaveLength(0);
    });

    test('applies required styles if showRequired retuns true', () => {
      const wrapper = mount(<Field showError={() => false}
          showRequired={() => true}
          getErrorMessage={() => ''} />);
      expect(wrapper.find(`.${styles.__required}`)).toHaveLength(1);
    });

    test('does not apply required styles if showRequired retuns false', () => {
      const wrapper = mount(<Field showError={() => false}
          showRequired={() => false}
          getErrorMessage={() => ''} />);
      expect(wrapper.find(`.${styles.__required}`)).toHaveLength(0);
    });

    test('does not use a label if useLabel is not provided', () => {
      const wrapper = mount(<Field showError={() => false}
          showRequired={() => false}
          getErrorMessage={() => ''} />);
      expect(wrapper.find('label')).toHaveLength(0);
    });

    test('uses a label if useLabel is provided', () => {
      const wrapper = mount(<Field showError={() => false}
          showRequired={() => false}
          getErrorMessage={() => ''}
          useLabel />);
      expect(wrapper.find('label')).toHaveLength(1);
    });
  });
});
