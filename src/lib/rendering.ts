import { createContext, useContext } from 'react';
// The static document and first hydration render match and remain fully readable.
export const StaticDocumentContext = createContext(false);
export const useStaticDocument = () => useContext(StaticDocumentContext);
