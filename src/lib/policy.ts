import { env } from '$env/dynamic/public';

const POLICIES = ['card-policy'] as const;

export type Policy = typeof POLICIES[number];

const loaded = env.PUBLIC_POLICIES.split(' ');

export function isPolicyEnabled(policy: Policy): boolean {
  return !!loaded.find(x => x === policy);
}