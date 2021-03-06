import styles from './style.postcss';

import React from 'react';
import { shallow } from 'enzyme';
import StudentPicture from 'components/StudentPicture';
import AdultPicture from 'components/AdultPicture';
import Person from './';

test('renders StudentPicture if provided', () => {
  const wrapper = shallow(<Person><StudentPicture /></Person>);
  expect(wrapper.find(StudentPicture)).toHaveLength(1);
});

test('renders AdultPicture if provided', () => {
  const wrapper = shallow(<Person><AdultPicture /></Person>);
  expect(wrapper.find(AdultPicture)).toHaveLength(1);
});

test('renders only the first picture provided', () => {
  const wrapper = shallow(<Person>
    <AdultPicture />
    <AdultPicture />
    <StudentPicture />
  </Person>);
  expect(wrapper.find(AdultPicture)).toHaveLength(1);
  expect(wrapper.find(StudentPicture)).toHaveLength(0);
});

test('renders all the other children as "lines"', () => {
  const wrapper = shallow(<Person>
    <AdultPicture />
    <div id="line-1" />
    <h1 id="line-2">Line 2</h1>
    <div id="line-3" />
  </Person>);
  const lines = wrapper.find(`.${styles.Person_lines}`);
  expect(lines.find('#line-1')).toHaveLength(1);
  expect(lines.find('#line-2')).toHaveLength(1);
  expect(lines.find('#line-3')).toHaveLength(1);
});
