const Errors = require('./errors').P2;

const hoursBetween = (date1, date2) => {
  let time1 = date1.getTime();
  let time2 = date2.getTime();

  let diff = (time2 - time1) / 1000; // milliseconds -> seconds
  diff /= (60 * 60); // seconds -> minutes -> hours
  return Math.abs(Math.round(diff));
}

const getNbDays = (start, end) => {
  
  // Check parameters
  if (!start) return Errors.DATE_START_MISSING;
  const date_start = new Date(start);
  if (date_start == 'Invalid Date') return Errors.INVALID_DATE_START;

  if (!end) return (date_start.getDate() - 1) + ' jours'; // we can return now if there is no end parameter
  const date_end = new Date(end);
  if (date_end == 'Invalid Date') return Errors.INVALID_DATE_END;
  
  // Find how many hours between the last day of the month and date end
  const nbDaysInMonth = new Date(date_end.getFullYear(), date_end.getMonth() + 1, 0).getDate(); // get the number of day of the end month
  const UTCTrick =  (date_end.getUTCHours() ? 0 : -date_end.getTimezoneOffset() / 60); // hours offset to adjust utc if we precised the hour
  const lastDayOfMonth = new Date(date_end.getFullYear(), date_end.getMonth(), nbDaysInMonth, UTCTrick);
  let hoursBetweenLastDayOfMonthAndDateEnd = hoursBetween(date_end, lastDayOfMonth);
  
  let nbDays, nbHours;
  if (isNaN(hoursBetweenLastDayOfMonthAndDateEnd))
    nbDays = date_start.getDate() - 1 + lastDayOfMonth.getDate() - date_end.getDate();
  else { // Update the number of days with the hours, keep the rest as hours
    nbDays = date_start.getDate() - 1 + Math.trunc(hoursBetweenLastDayOfMonthAndDateEnd / 24);
    nbHours = hoursBetweenLastDayOfMonthAndDateEnd % 24;
  }

  // Returned string
  if (!nbDays && !nbHours) return '0 jours';
  let res = '';
  if (nbDays) res += nbDays + ' jours';
  if (nbHours) res += (nbDays ? ', ' : '') + nbHours + ' heures';
  return res;
};

exports.getNbDays = getNbDays;