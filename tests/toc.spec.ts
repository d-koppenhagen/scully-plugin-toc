import { headingLevel } from '../src/toc';

test('should return the heading level number', () => {
  expect(headingLevel('h1')).toBe(1);
  expect(headingLevel('h2')).toBe(2);
});
