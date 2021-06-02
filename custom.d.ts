declare module '*.css' {
  const data: string;
  export = data;
}

declare module '*.jpg' {
  const data: string;
  export = data;
}

declare module '*.tsx?raw' {
  const content: string;
  export default content;
}

declare module '*.jsx?raw' {
  const content: string;
  export default content;
}
