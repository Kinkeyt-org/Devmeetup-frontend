import test from 'node:test';
import assert from 'node:assert/strict';
import { filterUpcomingEvents } from './utils.js';

test('filters out events that are already in the past', () => {
  const now = new Date('2026-06-29T12:00:00.000Z');
  const events = [
    { id: 1, title: 'Past event', date: '2026-06-28T10:00:00.000Z' },
    { id: 2, title: 'Future event', date: '2026-06-30T10:00:00.000Z' },
    { id: 3, title: 'No date event' },
  ];

  const visible = filterUpcomingEvents(events, now);

  assert.deepEqual(visible.map((event) => event.id), [2, 3]);
});

test('keeps hidden events out of the visible list', () => {
  const now = new Date('2026-06-29T12:00:00.000Z');
  const events = [
    { id: 1, title: 'Visible', date: '2026-06-30T10:00:00.000Z' },
    { id: 2, title: 'Hidden', date: '2026-06-30T10:00:00.000Z', hidden: true },
  ];

  const visible = filterUpcomingEvents(events, now);

  assert.equal(visible.length, 1);
  assert.equal(visible[0].id, 1);
});
