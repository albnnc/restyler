import React from 'react';
import { getChildrenKey } from './getChildrenKey';

const children = {
  a: <div key="a" />,
  b: <div id="b" />,
  c: <div />
};

test('equal on same order', () => {
  const getKey = () =>
    getChildrenKey(Object.values(children), { pivots: ['id'] });
  expect(getKey()).toEqual(getKey());
});

test('differ on different order', () => {
  const first = getChildrenKey([children.a, children.b, children.c]);
  const second = getChildrenKey([children.c, children.a, children.b]);
  expect(first).not.toEqual(second);
});
