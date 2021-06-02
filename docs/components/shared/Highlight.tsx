import Prism, { defaultProps, PrismTheme } from 'prism-react-renderer';

export interface HighlightProps {
  code: string;
}

export const Highlight = ({ code }: HighlightProps) => (
  <Prism {...defaultProps} theme={theme} code={code} language="jsx">
    {({ style, tokens, getLineProps, getTokenProps }) => (
      <pre
        css={{
          maxWidth: '100%',
          textAlign: 'left',
          overflow: 'auto',
          margin: 0,
          padding: '1em',
          font: '16px "Roboto Mono", monospace',
          '& .token-line': {
            lineHeight: '1.3em',
            height: '1.3em'
          }
        }}
        style={style}
      >
        {tokens.map((line, i) => (
          <div
            key={i}
            css={{ display: 'table-row' }}
            {...getLineProps({ line, key: i })}
          >
            <span
              css={{
                display: 'table-cell',
                textAlign: 'right',
                paddingRight: '1em',
                userSelect: 'none',
                opacity: '0.5'
              }}
            >
              {i + 1}
            </span>
            <span css={{ display: 'table-cell' }}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token, key })} />
              ))}
            </span>
          </div>
        ))}
      </pre>
    )}
  </Prism>
);

const theme: PrismTheme = {
  plain: {
    color: '#282a2e',
    backgroundColor: '#fafafa'
  },
  styles: [
    {
      types: ['comment'],
      style: { color: 'rgb(197, 200, 198)' }
    },
    {
      types: ['string', 'number', 'builtin', 'variable'],
      style: { color: '#8b8e8b' }
    },
    {
      types: ['class-name', 'function', 'tag'],
      style: { color: 'rgb(40, 42, 46)' }
    },
    {
      types: ['attr-name'],
      style: {
        fontStyle: 'italic',
        color: '#8b8e8b'
      }
    },
    {
      types: ['attr-value'],
      style: { color: '#8b8e8b' }
    }
  ]
};
