import { renderToString } from "@vue/server-renderer";
import { html } from "vite-plugin-ssr";
import { createApp } from "./app";
import { PageContext } from "./types";

// See https://vite-plugin-ssr.com/data-fetching
export const passToClient = ["pageProps", "documentProps", "routeParams"];

export async function render(pageContext: PageContext) {
  const app = createApp(pageContext);
  const appHtml = await renderToString(app);

  // See https://vite-plugin-ssr.com/html-head
  const { documentProps } = pageContext;
  const title = (documentProps && documentProps.title) || "Vite app";
  const desc = (documentProps && documentProps.description) || "App using Vite";

  return html`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="${desc}" />
        <title>${title}</title>
      </head>
      <body>
        <div id="app">${html.dangerouslySkipEscape(appHtml)}</div>
      </body>
    </html>`;
}
