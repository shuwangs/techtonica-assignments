import {sum} from './sum.js'
import {expect, test} from 'vitest';

test('add 1 + 2 to equal3', () =>{
    expect(sum(1, 2)).toBe(3)
})