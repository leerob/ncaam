'use server';

import { updateTag } from 'next/cache';

export async function refreshScores() {
  updateTag('scores');
}

export async function refreshSchedule() {
  updateTag('schedule');
}

export async function refreshConference() {
  updateTag('conference');
}

export async function refreshAll() {
  updateTag('scores');
  updateTag('schedule');
  updateTag('conference');
}
