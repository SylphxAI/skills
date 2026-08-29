export const calls = [];

export function apply(ctx, config) {
  calls.push({ ctx, config });
  return { ctx, config };
}
