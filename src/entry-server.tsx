import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import App from './App';
import { StaticDocumentContext } from './lib/rendering';
export { renderHead, indexedPaths, site } from './lib/seo';

export function render(url: string) {
  return renderToString(<StaticDocumentContext.Provider value={true}><StaticRouter location={url}><App /></StaticRouter></StaticDocumentContext.Provider>);
}
