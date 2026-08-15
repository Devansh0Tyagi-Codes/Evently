/**
 * cn — lightweight className merger utility
 * Joins class strings, filtering out falsy values.
 *
 * @param  {...string} classes
 * @returns {string}
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}
