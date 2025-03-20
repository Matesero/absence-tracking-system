import zod from 'zod';

const stringToDate = (str: string): Date | undefined => {
    const [day, month, year] = str.split('.').map(Number);
    if (!day || !month || !year) {
        return undefined;
    }
    const date = new Date(year, month - 1, day);
    return isNaN(date.getTime()) ? undefined : date;
};

export const schema = zod.object({
    status: zod
        .enum(['Принят', 'Отклонен'])
        .optional(),

    dateStart: zod
        .string()
        .transform((str) => stringToDate(str))
        .optional(),

    dateEnd: zod
        .string()
        .transform((str) => stringToDate(str))
        .optional(),

    message: zod
        .string()
        .optional(),
});