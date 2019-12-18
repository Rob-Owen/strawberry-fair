// Do two dateTimes occur on the same day?
export function areSameDay(date1, date2) {
    const daysMatch = date1.getDate() === date2.getDate()           // Do the days (of the month) match?
    const monthsMatch = date1.getMonth() === date2.getMonth()       // Do the months match?
    const yearsMatch = date1.getFullYear() === date2.getFullYear()  // Do the years match?
    return daysMatch && monthsMatch && yearsMatch                   // Then they render to the same day
}

// Does this date occur on or after the given day?
export function isOnOrAfterDay(baseDate, testDate) {
    const afterDay = testDate.getDate() >= baseDate.getDate()
    const afterMonth = testDate.getMonth() >= baseDate.getMonth()
    const afterYear = testDate.getFullYear() >= baseDate.getFullYear()
    return afterDay && afterMonth && afterYear
}
