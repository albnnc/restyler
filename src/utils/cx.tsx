type ClassNameArg =
  | string
  | boolean
  | { [key: string]: boolean }
  | Array<ClassNameArg>
  | null
  | void;

export const cx = (...args: ClassNameArg[]): string => {
  let className = '';
  for (let i = 0; i < args.length; i++) {
    let arg = args[i];
    if (arg == null) {
      continue;
    }
    let toAdd = '';
    switch (typeof arg) {
      case 'boolean':
        break;
      case 'object': {
        if (Array.isArray(arg)) {
          toAdd = cx(arg);
        } else {
          toAdd = '';
          for (const k in arg) {
            if (arg[k] && k) {
              toAdd && (toAdd += ' ');
              toAdd += k;
            }
          }
        }
        break;
      }
      default: {
        toAdd = arg;
      }
    }
    if (toAdd) {
      className && (className += ' ');
      className += toAdd;
    }
  }
  return className;
};
