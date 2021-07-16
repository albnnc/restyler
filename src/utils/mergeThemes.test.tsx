import { mergeThemes } from './mergeThemes';

test('merge margin and padding props', () => {
  expect(
    mergeThemes(
      {},
      { padding: 'medium', margin: 'large' },
      {
        padding: { left: 'large' },
        margin: { horizontal: 'small' }
      }
    )
  ).toEqual({
    padding: {
      top: 'medium',
      bottom: 'medium',
      left: 'large',
      right: 'medium'
    },
    margin: {
      top: 'large',
      bottom: 'large',
      left: 'small',
      right: 'small'
    }
  });
  expect(
    mergeThemes({}, { padding: { horizontal: 'small' } }, { padding: 'medium' })
  ).toEqual({ padding: 'medium' });
});

test('merge border props', () => {
  expect(
    mergeThemes({}, { border: 'black' }, { border: { right: 'red' } })
  ).toEqual({
    border: {
      top: 'black',
      bottom: 'black',
      left: 'black',
      right: 'red'
    }
  });
  expect(
    mergeThemes(
      {},
      { border: { width: '1px', color: 'black' } },
      { border: { right: 'red' } }
    )
  ).toEqual({
    border: {
      top: { width: '1px', color: 'black' },
      bottom: { width: '1px', color: 'black' },
      left: { width: '1px', color: 'black' },
      right: 'red'
    }
  });
  expect(
    mergeThemes(
      {},
      { border: { left: { width: '1px', color: 'black' } } },
      { border: { vertical: 'red' } }
    )
  ).toEqual({
    border: {
      top: 'red',
      bottom: 'red',
      left: { width: '1px', color: 'black' }
    }
  });
});

test('remove consecutive duplicate extensions', () => {
  expect(
    mergeThemes(
      {},
      { extend: { color: 'red' } },
      { extend: { color: 'red' } },
      { extend: { color: 'blue' } }
    )
  ).toEqual({
    extend: [{ color: 'red' }, { color: 'blue' }]
  });
});
