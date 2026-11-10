import {describe,it,expect} from 'vitest';
import {schedule} from '../lib/scheduler';
describe('deterministic review scheduling',()=>{it('resets after an unsuccessful recall',()=>{expect(schedule('AGAIN',4,14).repetitions).toBe(0);expect(schedule('AGAIN',4,14).intervalDays).toBe(1)});it('spaces successful recall',()=>{expect([0,1,2,3].map(n=>schedule('GOOD',n,7).intervalDays)).toEqual([1,3,7,14])});it('uses exact UTC day intervals',()=>{expect(schedule('HARD',0,0,new Date('2026-01-01T00:00:00Z')).dueAt.toISOString()).toBe('2026-01-03T00:00:00.000Z')})});
