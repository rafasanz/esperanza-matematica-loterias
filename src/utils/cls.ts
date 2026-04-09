/**
 * Utility function to concatenate class names conditionally.
 *
 * Filters out falsy values (false, null, undefined, empty string) and joins the rest with a space.
 * Useful for conditionally applying CSS classes in React components.
 *
 * @param classNames - List of class names or falsy values to be joined.
 * @returns A single string of class names separated by spaces, or undefined if no valid class names are provided.
 *
 * @example
 * // Returns 'foo bar'
 * cls('foo', false, 'bar', undefined, null)
 *
 * @example
 * // Returns undefined
 * cls(false, null, undefined)
 *
 * @example
 * // Usage in a React component
 * <button className={cls('btn', isActive && 'active', isDisabled && 'disabled')} />
 */
export function cls(...classNames: Array<false | null | string | undefined>): string | undefined {
  const classes = classNames.filter(Boolean);
  if (classes.length === 0) {
    return undefined;
  }
  return classes.join(' ');
}
