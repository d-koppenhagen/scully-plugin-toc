import { headingLevel } from '../src';

test('should return the heading level number', () => {
  expect(headingLevel('h1')).toBe(1);
});
