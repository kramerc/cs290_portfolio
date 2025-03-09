export const isNotEmptyString = (str) => typeof str === 'string' && str.length > 0;
export const isPositiveInteger = (num) => Number.isInteger(num) && num > 0;
export const isUnitValid = (unit) => ['kgs', 'lbs'].includes(unit);
export const isDateValid = (date) => {
    if (!/^\d\d-\d\d-\d\d$/.test(date)) {
        return false;
    }

    const [month, day, year] = date.split('-').map(str => Number(str));
    if (month < 1 || month > 12 || day < 1) {
        return false;
    }

    // February
    if (month === 2) {
        // Leap year check valid for 2000-2099
        const isLeapYear = year % 4 === 0;
        if (day > 28) {
            if (isLeapYear && day === 29) {
                return true;
            }

            return false;
        }

        return true;
    }

    // Months with 31 days: January, March, May, July, August, October, December
    const monthHas31 = (month <= 7 && month % 2 === 1) || (month > 7 && month % 2 === 0);
    if (day > 30) {
        if (monthHas31 && day === 31) {
            return true;
        }
        
        return false;
    }

    return true;
};

export const isExerciseValid = ({ name, reps, weight, unit, date }) => (
    isNotEmptyString(name) &&
    isPositiveInteger(reps) &&
    isPositiveInteger(weight) &&
    isUnitValid(unit) &&
    isDateValid(date)
);
