export function ComparisonTime(create, update) {
    return update === create;
}

export function getNewTime (date) {
    const newDate = new Date(date);
    return`
        ${
        newDate.getDate() < 9 
            ? `0${newDate.getDate()}` 
            : newDate.getDate()
        }.${newDate.getMonth() < 9
            ? `0${newDate.getMonth() + 1}`
            : newDate.getMonth() + 1}
    `
}