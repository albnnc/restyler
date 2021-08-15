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
    return {
      width: '100%',
      lineHeight: 'calc(1.5 * 1rem)',
      fontSize: 3
    };
  };
  const createBorderStyle = ({ props, color, focusColor }) => {
    const { colors = {} } = props.theme ?? {};
    return {
      width: '100%',
      transition: 'border 0.2s linear, box-shadow 0.2s linear',
      border: '1px solid',
      borderColor: color,
      ...(canBeFocused
        ? createConditionalStyle({
            selector: '&:focus',
            isForced: props.focused,
            style: {
              border: '1px solid',
              borderColor: focusColor,
              boxShadow: `inset 0 0 0 1px ${colors[focusColor] ?? focusColor}`
            }
          })
        : {}),
      ...(canBeDisabled
        ? createConditionalStyle({
            selector: '&:disabled',
            isForced: props.disabled,
            style: {
              border: '1px dashed',
              borderColor: color,
              pointerEvents: 'none'
            }
          })
        : {}),
      ...(canBeHovered
        ? {
            cursor: 'pointer',
            '&:hover': {
              border: '1px solid',
              borderColor: focusColor
            }
          }
        : {})
    };
  };

  return {
    style: props => ({
      padding: 2,
      borderRadius: 2,
      border: 'none',
      background: 'transparent',
      outline: 'none',
      ...createBasicStyle(),
      ...(canBeInvalid && props.invalid
        ? createBorderStyle({
            props,
            color: 'danger',
            focusColor: 'danger'
          })
        : createBorderStyle({
            props,
            color: 'border',
            focusColor: 'primary'
          }))
    })
  };
};

export const input: Theme = createInputLikeTheme({
  canBeDisabled: true,
  canBeFocused: true,
  canBeHovered: false,
  canBeInvalid: true
});
