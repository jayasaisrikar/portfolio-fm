import { useState } from 'react';
import { ArrowUpRight, Check, Copy } from 'lucide-react';
export default function Footer() {
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied' | 'error'>('idle');
  const email = 'bjayasaisrikar2004@gmail.com';
  async function copyEmail() {
    try { await navigator.clipboard.writeText(email); setCopyStatus('copied'); }
    catch { setCopyStatus('error'); }
  }
  return <footer id="contact" className="portfolio-footer">
    <div className="page-width">
      <div className="footer-topline"><span className="tiny-label">HAVE SOMETHING IN MIND?</span><span className="tiny-label">LET’S MAKE IT REAL.</span></div>
      <a className="footer-invitation" href={`mailto:${email}`}>Good things start<br />with a <span className="serif">conversation.</span><ArrowUpRight aria-hidden="true" /></a>
      <div className="footer-email"><a href={`mailto:${email}`}>{email}</a><button type="button" onClick={copyEmail} aria-label="Copy email address">{copyStatus === 'copied' ? <Check size={17} /> : <Copy size={17} />}</button><span role="status">{copyStatus === 'copied' ? 'Copied' : copyStatus === 'error' ? 'Use the email link to get in touch.' : ''}</span></div>
      <div className="footer-baseline"><a className="portfolio-wordmark" href="#main-content" aria-label="Back to top">jay.</a><span>Thoughtfully built, from Vizag.</span><div><a href="https://github.com/jayasaisrikar" target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={13} /></a><a href="https://x.com/jayasaisrikar" target="_blank" rel="noreferrer">Twitter / X <ArrowUpRight size={13} /></a><a href="https://quoril.in" target="_blank" rel="noreferrer">Quoril <ArrowUpRight size={13} /></a></div><span>© {new Date().getFullYear()}</span></div>
    </div>
  </footer>;
}
