export const demoBalance = 1000;
export const demoPlans = [
  { id: 'measured', name: 'Keep a buffer', amount: 200, note: 'A small allocation that keeps the reserve intact.' },
  { id: 'review', name: 'Take a bigger step', amount: 500, note: 'A valid amount, but it exceeds the demo’s approval policy.' },
  { id: 'overdraw', name: 'Go all in (and then some)', amount: 1200, note: 'An amount the sample ledger cannot cover.' },
] as const;
export type PlanId = typeof demoPlans[number]['id'];
export function simulatePlan(id: PlanId, balance = demoBalance) {
  const plan = demoPlans.find(p => p.id === id)!;
  const status = plan.amount > balance ? 'BLOCK' : plan.amount > 300 ? 'HOLD' : 'ALLOW';
  return { ...plan, status, remaining: balance - plan.amount, reason: status === 'BLOCK' ? 'Insufficient balance. This plan cannot execute.' : status === 'HOLD' ? 'Above the 300-credit policy limit. Revise the plan before approval.' : 'Within policy and balance. Ready for a human to approve.' };
}
