export function getBathhousDay() {
    const today = new Date() // 2025-10-10T06:56:10.093Z
    const numWeekDay = today.getDay() // 1
    const daysBeforeFriday = (5 - numWeekDay + 7) % 7 // 4
    const numBathhousDay = today.setDate(today.getDate() + daysBeforeFriday + 7) // 1760079370093
    const bathhousDay = new Date(numBathhousDay).toLocaleDateString('ru-Ru') // 10.10.2025

    return bathhousDay
}
