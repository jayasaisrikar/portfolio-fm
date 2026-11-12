import HalftoneArt, { type HalftoneArtKind } from './HalftoneArt';

const plates: Record<string, { kind: HalftoneArtKind; caption: string }> = {
  outspool: { kind: 'telephone', caption: 'Signal → connection' },
  fork: { kind: 'signal', caption: 'Simulate. Approve. Execute.' },
  crosswake: { kind: 'ticker', caption: 'Find the signal.' },
  quoril: { kind: 'typewriter', caption: 'Space to focus.' },
};

/** Abstract identities for the projects: an analogue tool per idea, not a screenshot. */
export default function ProjectVisual({ kind }: { kind: string }) {
  const plate = plates[kind] ?? plates.outspool;
  return <div className={`project-visual visual-${kind}`} aria-hidden="true">
    <span className="visual-caption">{plate.caption}</span>
    <HalftoneArt kind={plate.kind} className="visual-plate" />
  </div>;
}
