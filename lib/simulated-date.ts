export function getSimulatedDate(id:number, maxDaysBack: number = 30): string {

    const daysAgo = id % maxDaysBack;

    const date = new Date();

    date.setDate(date.getDate() - daysAgo);

    return date.toISOString().split('T')[0];
}