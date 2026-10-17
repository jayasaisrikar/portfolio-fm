import test from 'node:test';
import assert from 'node:assert/strict';
import { simulatePlan } from '../src/lib/fork-demo';
test('demo policy distinguishes executable, review-required, and overdrawn proposals', () => {
  assert.equal(simulatePlan('measured').status, 'ALLOW');
  assert.equal(simulatePlan('measured').remaining, 800);
  assert.equal(simulatePlan('review').status, 'HOLD');
  assert.equal(simulatePlan('overdraw').status, 'BLOCK');
  assert.equal(simulatePlan('measured', 100).status, 'BLOCK');
});
