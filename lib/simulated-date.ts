export function getSimulatedDate(id: number, maxDaysBack: number = 60): Date {

    const wave = Math.sin(id * 0.3) * 10;
    const daysBack = Math.abs(Math.floor((id + wave) % maxDaysBack));

    const date = new Date();
    date.setDate(date.getDate() - daysBack);
    return date;
}