import html, { makeHtmlAttributes } from '@rollup/plugin-html';

const template = ({ attributes, files, meta, publicPath, title }) => {
  const scripts = (files.js || [])
    .map(({ fileName }) => {
      const attrs = makeHtmlAttributes(attributes.script);
      return `<script src="${publicPath}${fileName}"${attrs}></script>`;
    })
    .join('\n');

  const links = (files.css || [])
    .map(({ fileName }) => {
      const attrs = makeHtmlAttributes(attributes.link);
      return `<link href="${publicPath}${fileName}" rel="stylesheet"${attrs}>`;
    })
    .join('\n');

  const metas = meta
    .map(input => {
      const attrs = makeHtmlAttributes(input);
      return `<meta${attrs}>`;
    })
    .join('\n');

  return `
    <!doctype html>
    <html${makeHtmlAttributes(attributes.html)}>
      <head>
        ${metas}
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto+Mono:ital@0;1&display=swap"
          rel="stylesheet"
        />
        <title>${title}</title>
        ${links}
      </head>
      <body>
        <div id="root"></div>
        ${scripts}
      </body>
    </html>
  `;
};

export default () =>
  html({
    template,
    title: 'Restyler',
    meta: [
      { charset: 'UTF-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
      { 'http-equiv': 'X-UA-Compatible', content: 'ie=edge' }
    ],
    publicPath: process.env.BASE_URL
  });
