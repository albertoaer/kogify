import { PUBLIC_POLICIES } from '$env/static/public';

const POLICIES = ['card-policy'] as const;

export type Policy = typeof POLICIES[number];

const loaded = PUBLIC_POLICIES.split(' ');

export function isPolicyEnabled(policy: Policy): boolean {
  return !!loaded.find(x => x === policy);
}