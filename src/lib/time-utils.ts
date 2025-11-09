import { DayOfWeek, TimeRange, Deal } from './types';

export function getCurrentDay(): DayOfWeek {
  const days: DayOfWeek[] = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  return days[new Date().getDay()];
}

export function getCurrentTime(): string {
  const now = new Date();
  return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
}

export function isTimeInRange(time: string, range: TimeRange): boolean {
  const timeNum = parseInt(time.replace(':', ''));
  const startNum = parseInt(range.start.replace(':', ''));
  const endNum = parseInt(range.end.replace(':', ''));
  
  if (endNum < startNum) {
    return timeNum >= startNum || timeNum <= endNum;
  }
  
  return timeNum >= startNum && timeNum <= endNum;
}

export function isDealActiveNow(deal: Deal): boolean {
  const currentDay = getCurrentDay();
  const currentTime = getCurrentTime();
  
  return deal.daysActive.includes(currentDay) && isTimeInRange(currentTime, deal.timeRange);
}

export function formatTime(time: string): string {
  const [hours, minutes] = time.split(':').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  return `${displayHours}${minutes > 0 ? ':' + minutes.toString().padStart(2, '0') : ''}${period}`;
}

export function formatTimeRange(range: TimeRange): string {
  return `${formatTime(range.start)} - ${formatTime(range.end)}`;
}

export function getRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffHours / 24);
  
  if (diffHours < 1) return 'Just updated';
  if (diffHours < 24) return `Updated ${diffHours}h ago`;
  if (diffDays === 1) return 'Updated yesterday';
  return `Updated ${diffDays}d ago`;
}
