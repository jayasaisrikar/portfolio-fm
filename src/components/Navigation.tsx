import { Link, useLocation } from 'react-router-dom';
import { Asterisk } from './NotebookArt';

export default function Navigation() {
  const { pathname } = useLocation();
  return <header className="notebook-header page-width">
    <div className="masthead-top"><span>A small corner of the internet.</span><span>Vizag, India <span className="header-coordinates"> / 17.6868° N, 83.2185° E</span></span></div>
    <div className="masthead-main">
      <Link className="wordmark" to="/" aria-label="Jay — home">jay<Asterisk />.</Link>
      <nav aria-label="Primary"><Link to="/#projects">The work <span>↗</span></Link><Link to="/profile" aria-current={pathname === '/profile' ? 'page' : undefined}>The person <span>↗</span></Link><a href="mailto:bjayasaisrikar2004@gmail.com">Say hello <span>↗</span></a></nav>
    </div>
  </header>;
}
