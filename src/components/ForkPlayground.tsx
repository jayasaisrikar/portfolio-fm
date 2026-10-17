import { useState } from 'react';
import { demoBalance, demoPlans, simulatePlan, type PlanId } from '../lib/fork-demo';
import Reveal from './Reveal';

export default function ForkPlayground() {
  const [selected, setSelected] = useState<PlanId>('measured');
  const [phase, setPhase] = useState<'choose' | 'simulated' | 'approved' | 'executed'>('choose');
  const plan = simulatePlan(selected);
  const [entries, setEntries] = useState<string[]>([]);
  function choose(id: PlanId) { setSelected(id); setPhase('choose'); setEntries([]); }
  function reset() { setPhase('choose'); setSelected('measured'); setEntries([]); }
  return <section id="fork-playground" className="fork-playground page-width"><Reveal className="playground-paper">
    <div className="playground-intro"><span className="tiny-label">FORK / A TINY HANDS-ON EXAMPLE</span><h2>What would you<br />let an agent do?</h2><p>Try the idea behind FORK: a proposal is a starting point. Simulate it, check the rules, and let a person make the call.</p><span className="hand-note">You’re the human in the loop.</span><p className="demo-caption">Illustrative browser-only demo. Fictional credits, fixed sample plans. No AI calls, signed intents, or real payments.</p><a className="text-link" href="https://fork-dun.vercel.app/" target="_blank" rel="noreferrer">Explore the full FORK project</a></div>
    <div className="decision-notebook"><div className="demo-ledger"><span>SAMPLE LEDGER</span><strong>{phase === 'executed' ? plan.remaining.toLocaleString('en-IN') : demoBalance.toLocaleString('en-IN')} <small>credits</small></strong></div>
      <fieldset disabled={phase === 'approved' || phase === 'executed'}><legend>1. Pick an agent’s proposed plan</legend>{demoPlans.map(p => <label className={`demo-plan ${selected === p.id ? 'selected-plan' : ''}`} key={p.id}><input type="radio" name="fork-plan" value={p.id} checked={selected === p.id} onChange={() => choose(p.id)} /><span><strong>{p.name}</strong><span>{p.note}</span></span><b>{p.amount.toLocaleString('en-IN')}</b></label>)}</fieldset>
      <div className="demo-result" aria-live="polite">{phase !== 'choose' && <><span className={`policy-stamp policy-${plan.status.toLowerCase()}`}>{plan.status}</span><p>{plan.reason}</p><p>Projected balance: <strong>{plan.remaining.toLocaleString('en-IN')} credits</strong></p></>}{phase === 'approved' && <p className="demo-approved">Approved. The selected plan is locked for this run.</p>}{phase === 'executed' && <p className="demo-approved">Posted once to the sample ledger. This run is complete.</p>}</div>
      <div className="demo-actions">{phase === 'choose' && <button className="ink-button" onClick={() => { setPhase('simulated'); setEntries([`Simulated “${plan.name}” against a ${demoBalance}-credit snapshot.`, `Policy decision: ${plan.status}.`]); }}>2. Simulate the plan</button>}{phase === 'simulated' && <button className="ink-button" disabled={plan.status !== 'ALLOW'} onClick={() => { setPhase('approved'); setEntries(e => [...e, `Human approved “${plan.name}” for ${plan.amount} credits.`]); }}>3. Approve this plan</button>}{phase === 'approved' && <button className="ink-button" onClick={() => { setPhase('executed'); setEntries(e => [...e, `Posted: sample reserve −${plan.amount}; sample project +${plan.amount}.`]); }}>4. Execute approved plan</button>}{phase === 'executed' && <button className="ink-button" disabled>Executed once ✓</button>}<button className="quiet-button" onClick={reset}>Start over</button></div>
      {entries.length > 0 && <ol className="demo-audit" aria-label="Sample execution log">{entries.map((entry, i) => <li key={`${i}-${entry}`}><span>{String(i + 1).padStart(2, '0')}</span>{entry}</li>)}</ol>}
    </div>
  </Reveal></section>;
}
