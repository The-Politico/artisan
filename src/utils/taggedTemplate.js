/**
 * This function is a tagged template that can generate a customized template
 * string based on the inputs.
 *
 * @param {Array} strings - An array of template string fragments.
 * @param {...string} args - An array of placeholders to be used as
 *  keys in the data object.
 * @returns {Function} - A function that accepts a data
 *  object and produces the final customized string.
 *
 * @example
 * const example = taggedTemplate`My name is ${'name'} and I am ${'age'}.`;
 * const finalString = example({ name: 'Alice', age: 20 });
 * console.log(finalString); // "My name is Alice and I am 20."
 */
export default function taggedTemplate(strings, ...args) {
  return (data) => strings.reduce(
    (result, str, index) => result + str + (data[args[index]] || ''),
    '',
  );
}
