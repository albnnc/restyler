import { Theme } from '../../models';

export interface CreateInputLikeThemeOptions {
  canBeDisabled?: boolean;
  canBeFocused?: boolean;
  canBeHovered?: boolean;
  canBeInvalid?: boolean;
}

export const createInputLikeTheme = ({
  canBeDisabled,
  canBeFocused,
  canBeHovered,
  canBeInvalid
}) => {
  const createConditionalStyle = ({ selector, isForced, style }) => ({
    [selector]: style,
    ...(isForced ? style : {})
  });

  const createBasicStyle = () => {
    return { width: '100%' };
  };

  const createBorderStyle = ({ createStyle, props, color, focusColor }) => {
    const palette = props.theme.variables?.palette ?? {};
    return {
      width: '100%',
      transition: ['border 0.2s', 'box-shadow 0.2s'].join(', '),
      ...createStyle({ border: color }),
      ...(canBeFocused
        ? createConditionalStyle({
            selector: '&:focus',
            isForced: props.focused,
            style: {
              ...createStyle({ border: focusColor }),
              boxShadow: `inset 0 0 0 1px ${palette[focusColor] ?? focusColor}`
            }
          })
        : {}),
      ...(canBeDisabled
        ? createConditionalStyle({
            selector: '&:disabled',
            isForced: props.disabled,
            style: createStyle({
              border: { width: '1px', color, style: 'dashed' }
            })
          })
        : {}),
      ...(canBeHovered
        ? {
            cursor: 'pointer',
            '&:hover': createStyle({ border: focusColor })
          }
        : {})
    };
  };

  return {
    padding: 'small',
    radius: 'small',
    extend: options => {
      const { props } = options;
      return {
        ...createBasicStyle(),
        ...(canBeInvalid && props.invalid
          ? createBorderStyle({
              ...options,
              color: 'danger',
              focusColor: 'danger'
            })
          : createBorderStyle({
              ...options,
              color: 'border',
              focusColor: 'primary'
            }))
      };
    }
  };
};

export const input: Theme = createInputLikeTheme({
  canBeDisabled: true,
  canBeFocused: true,
  canBeHovered: false,
  canBeInvalid: true
});
