import AutoReplace from 'slate-auto-replace';

const plugins = [
  AutoReplace({
    trigger: /(")/,
    before: /\s$/,
    transform: (transform, event, matches) => {
      return transform.insertText('“'); // smart double quote (left)
    },
  }),
  AutoReplace({
    trigger: /(")/,
    before: /\S$/,
    transform: (transform, event, matches) => {
      return transform.insertText('\u201d'); // smart double quote (right)
    },
  }),
  AutoReplace({
    trigger: /(')/,
    before: /\s$/,
    transform: (transform, event, matches) => {
      return transform.insertText('\u2018'); // smart single quote (left)
    },
  }),
  AutoReplace({
    trigger: /(')/,
    before: /\S$/,
    transform: (transform, event, matches) => {
      return transform.insertText('\u2019'); // smart single quote (right)
    },
  }),
];

export default plugins;
