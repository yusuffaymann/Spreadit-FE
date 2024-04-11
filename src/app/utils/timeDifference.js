import { parseISO, differenceInDays, differenceInHours, differenceInMinutes, differenceInMonths, differenceInWeeks, differenceInYears} from 'date-fns';

function getTimeDifferenceString(dateString) {

  const date = parseISO(dateString);
  const now = new Date();

  // Handle moments (less than a day)
  const diffInMinutes = Math.round(differenceInMinutes(now, date));
  if (diffInMinutes === 0) {
    return 'just now';
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes === 1 ? '' : 's'} ago`;
  }

  // Handle hours
  const diffInHours = differenceInHours(now, date);
  if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours === 1 ? '' : 's'} ago`;
  }

  // Handle days, weeks, months, and years
  const diffInDays = differenceInDays(now, date);
  if (diffInDays < 7) {
    return `${diffInDays} day${diffInDays === 1 ? '' : 's'} ago`;
  } else if (diffInDays < 30) {
    const diffInWeeks = differenceInWeeks(now, date);
    return `${diffInWeeks} week${diffInWeeks === 1 ? '' : 's'} ago`;
  } else if (diffInDays < 365) {
    const diffInMonths = differenceInMonths(now, date);
    return `${diffInMonths} month${diffInMonths === 1 ? '' : 's'} ago`;
  } else {
    const diffInYears = differenceInYears(now, date);
    return `${diffInYears} year${diffInYears === 1 ? '' : 's'} ago`;
  }
}

export default getTimeDifferenceString;