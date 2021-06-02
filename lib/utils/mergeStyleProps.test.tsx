import { mergeStyleProps } from './mergeStyleProps';

test('merge basic props', () => {
  expect(
    mergeStyleProps(
      {},
      {
        padding: 'medium',
        margin: 'large'
      },
      {
        padding: {
          left: 'large'
        },
        margin: {
          horizontal: 'small'
        }
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
    mergeStyleProps(
      {},
      {
        padding: { horizontal: 'small' }
      },
      { padding: 'medium' }
    )
  ).toEqual({
    padding: 'medium'
  });
});

test('merge border props', () => {
  expect(
    mergeStyleProps(
      {},
      { border: 'black' },
      {
        border: {
          right: 'red'
        }
      }
    )
  ).toEqual({
    border: {
      top: 'black',
      bottom: 'black',
      left: 'black',
      right: 'red'
    }
  });
  expect(
    mergeStyleProps(
      {},
      {
        border: {
          width: '1px',
          color: 'black'
        }
      },
      {
        border: {
          right: 'red'
        }
      }
    )
  ).toEqual({
    border: {
      top: {
        width: '1px',
        color: 'black'
      },
      bottom: {
        width: '1px',
        color: 'black'
      },
      left: {
        width: '1px',
        color: 'black'
      },
      right: 'red'
    }
  });
  expect(
    mergeStyleProps(
      {},
      {
        border: {
          left: {
            width: '1px',
            color: 'black'
          }
        }
      },
      {
        border: {
          vertical: 'red'
        }
      }
    )
  ).toEqual({
    border: {
      top: 'red',
      bottom: 'red',
      left: {
        width: '1px',
        color: 'black'
      }
    }
  });
});
