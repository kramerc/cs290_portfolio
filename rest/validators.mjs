export const isNotEmptyString = (str) => typeof str === 'string' && str.length > 0;
export const isPositiveInteger = (num) => Number.isInteger(num) && num > 0;
export const isUnitValid = (unit) => ['kgs', 'lbs'].includes(unit);
export const isDateValid = (date) => /^\d\d-\d\d-\d\d$/.test(date);

export const isExerciseValid = ({ name, reps, weight, unit, date }) => (
    isNotEmptyString(name) &&
    isPositiveInteger(reps) &&
    isPositiveInteger(weight) &&
    isUnitValid(unit) &&
    isDateValid(date)
);
