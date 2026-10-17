import { StrictMode, useEffect, useState } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import { StaticDocumentContext } from './lib/rendering';
import './index.css';

const root = document.getElementById('root')!;
const prerendered = root.hasAttribute('data-prerendered');
function ClientApp() {
  const [staticDocument, setStaticDocument] = useState(prerendered);
  useEffect(() => { setStaticDocument(false); }, []);
  return <StaticDocumentContext.Provider value={staticDocument}><BrowserRouter><App /></BrowserRouter></StaticDocumentContext.Provider>;
}
const app = <StrictMode><ClientApp /></StrictMode>;
if (prerendered) hydrateRoot(root, app);
else createRoot(root).render(app);
