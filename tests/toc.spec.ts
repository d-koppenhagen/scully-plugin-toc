import { headingLevel } from '../src/toc';

test('should return the heading level number', () => {
  expect(headingLevel('h1')).toBe(1);
});
