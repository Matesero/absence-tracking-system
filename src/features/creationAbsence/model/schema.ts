import zod, { type ZodError } from 'zod';

export const zod2errors = (
    zodErrors: ZodError<Schema>,
): Record<string, string> => {
    const zodErrorsFormats = zodErrors.format();
    const errors: Record<string, string> = {};

    Object.entries(zodErrorsFormats).forEach(([key, value]) => {
        if ('_errors' in value && value._errors.length > 0) {
            errors[key] = value._errors[0];
        }
    });

    return errors;
};

const stringToDate = (str: string): Date | undefined => {
    const [day, month, year] = str.split('.').map(Number);
    if (!day || !month || !year) {
        return undefined;
    }
    const date = new Date(year, month - 1, day);
    return isNaN(date.getTime()) ? undefined : date;
};

export const schema = zod
    .object({
        dateStart: zod
            .string()
            .min(1, 'Поле является обязательным')
            .transform((str) => stringToDate(str))
            .optional(),

        dateEnd: zod
            .string()
            .min(1, 'Поле является обязательным')
            .transform((str) => stringToDate(str)),

        message: zod.string().trim().optional(),
    })
    .refine(
        (data) => {
            if (data.dateStart && data.dateEnd) {
                return data.dateEnd >= data.dateStart;
            }
            return true;
        },
        {
            message: 'Дата окончания должна быть не раньше даты начала',
            path: ['dateEnd'],
        },
    );

export type Schema = zod.infer<typeof schema>;
