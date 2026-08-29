export async function resolve(specifier, context, nextResolve) {
  if (specifier === '@deepseek-ai/dsh-skill-filesystem') {
    return {
      shortCircuit: true,
      url: new URL('./dsh_filesystem_mock.mjs', import.meta.url).href,
    };
  }
  return nextResolve(specifier, context);
}
