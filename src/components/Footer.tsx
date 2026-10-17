import { useState } from 'react';
import { Asterisk } from './NotebookArt';

export default function Footer() {
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const email = 'bjayasaisrikar2004@gmail.com';
  async function copyEmail() {
    try { await navigator.clipboard.writeText(email); setCopied(true); setCopyError(false); }
    catch { setCopyError(true); }
  }
  return <footer id="contact" className="notebook-footer page-width">
    <div className="footer-letter"><div><span className="tiny-label">GOOD THINGS START WITH A CONVERSATION</span><h2>Got a curious idea?<br /><a href={`mailto:${email}`}>I’m all ears. <span>↗</span></a></h2><p>Something to build, a film to recommend, or just a hello.</p></div><Asterisk className="footer-star" /></div>
    <div className="footer-contact"><a href={`mailto:${email}`}>{email}</a><button onClick={copyEmail} className="copy-email" aria-label="Copy email address">{copied ? 'Copied ✓' : 'Copy email ↗'}</button><span role="status" className="copy-status">{copyError ? 'Please use the email link to get in touch.' : ''}</span></div>
    <div className="footer-bottom"><span className="hand-note">See you around, Jay.</span><div className="social-links"><a href="https://github.com/jayasaisrikar" target="_blank" rel="noreferrer">GitHub ↗</a><a href="https://x.com/jayasaisrikar" target="_blank" rel="noreferrer">X / Twitter ↗</a><a href="https://quoril.in" target="_blank" rel="noreferrer">Quoril ↗</a></div><span>Made with intent. © {new Date().getFullYear()}</span></div>
  </footer>;
}
