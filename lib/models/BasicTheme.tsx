export interface BasicTheme {
  style?: object | ((props: { [key: string]: any }) => object);
  kinds?: { [kind: string]: BasicTheme };
  components?: { [kind: string]: BasicTheme };
  [other: string]: any;
}
