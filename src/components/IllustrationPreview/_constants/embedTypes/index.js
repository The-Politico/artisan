import startCase from 'lodash/startCase';

import
BrowserWidthFull,
{ NAME as BROWSER_WIDTH_FULL_NAME } from './browser-width-full';

import
BrowserWidth,
{ NAME as BROWSER_WIDTH_NAME } from './browser-width';

import
BumpIn,
{ NAME as BUMP_IN_NAME } from './bump-in';

import
BumpOut,
{ NAME as BUMP_OUT_NAME } from './bump-out';

import
PageWidth,
{ NAME as PAGE_WIDTH_NAME } from './page-width';

import
Standard,
{ NAME as STANDARD_NAME } from './standard';

export const ALL_TYPE_NAMES = [
  STANDARD_NAME,
  BUMP_IN_NAME,
  BUMP_OUT_NAME,
  PAGE_WIDTH_NAME,
  BROWSER_WIDTH_NAME,
  BROWSER_WIDTH_FULL_NAME,
];

export const ALL_TYPE_LABELS = ALL_TYPE_NAMES.map((name) => ({
  label: startCase(name),
  value: name,
}));

export const ALL_TYPES = {
  [STANDARD_NAME]: Standard,
  [BUMP_IN_NAME]: BumpIn,
  [BUMP_OUT_NAME]: BumpOut,
  [PAGE_WIDTH_NAME]: PageWidth,
  [BROWSER_WIDTH_NAME]: BrowserWidth,
  [BROWSER_WIDTH_FULL_NAME]: BrowserWidthFull,
};
