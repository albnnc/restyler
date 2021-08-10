import { mergeThemes } from './mergeThemes';

test('remove consecutive duplicate styles', () => {
  expect(
    mergeThemes(
      {},
      { style: { color: 'red' } },
      { style: { color: 'red' } },
      { style: { color: 'blue' } }
    )
  ).toEqual({
    style: [{ color: 'red' }, { color: 'blue' }]
  });
});
