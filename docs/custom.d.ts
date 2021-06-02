declare module '*.jpg' {
  const data: string;
  export = data;
}

declare module '*.tsx?raw' {
  const compoundLoaderDemo: string;
  export default compoundLoaderDemo;
}
