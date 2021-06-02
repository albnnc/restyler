export function deepFreeze<T extends object>(data: T): T {
  Reflect.ownKeys(data).forEach(key => {
    if (typeof data[key] == 'object' && data[key] !== null) {
      deepFreeze(data[key]);
    }
  });
  return Object.freeze(data);
}
