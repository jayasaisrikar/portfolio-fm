import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { renderHead } from '../lib/seo';

export default function Seo() {
  const { pathname } = useLocation();
  useEffect(() => {
    const next = new DOMParser().parseFromString(`<html><head>${renderHead(pathname)}</head></html>`, 'text/html');
    document.head.querySelectorAll('[data-seo]').forEach(node => node.remove());
    next.head.querySelectorAll('[data-seo]').forEach(node => document.head.appendChild(document.importNode(node, true)));
  }, [pathname]);
  return null;
}
