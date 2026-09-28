export function getSimulatedDate(id:number, maxDaysBack: number = 30): Date {

    const daysAgo = id % maxDaysBack;

    const date = new Date();

    date.setDate(date.getDate() - daysAgo);

    return date;
}