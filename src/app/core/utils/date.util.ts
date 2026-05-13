export class DateUtil {
  static formatDate(date: Date | string): string {
    const d = new Date(date);
    return d.toLocaleDateString();
  }

  static formatDateTime(date: Date | string): string {
    const d = new Date(date);
    return d.toLocaleString();
  }

  static isToday(date: Date | string): boolean {
    const today = new Date();
    const checkDate = new Date(date);
    return today.toDateString() === checkDate.toDateString();
  }

  static addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  static getDaysDifference(date1: Date, date2: Date): number {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  }
}