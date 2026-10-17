import { Link } from 'react-router-dom';
export default function NotFound() {
  return <main id="main-content" className="page-width not-found-page"><span className="tiny-label">404 / A LITTLE OFF THE MAP</span><h1>This page wandered off.</h1><p>There’s still plenty to explore in my little corner of the internet.</p><Link className="text-link" to="/">Back to the notebook</Link></main>;
}
