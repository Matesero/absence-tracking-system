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

export const schema = zod.object({
    email: zod.string().trim().optional(),

    fullName: zod.string().trim().optional(),

    groupNumber: zod
        .string()
        .transform((str) => Number(str))
        .optional(),

    role: zod.string().optional(),

    blocked: zod.boolean().default(false).optional(),

    dateStart: zod
        .string()
        .transform((str) => stringToDate(str))
        .optional(),

    dateEnd: zod
        .string()
        .transform((str) => stringToDate(str))
        .optional(),

    date: zod.date().optional(),

    groupNumbers: zod
        .string()
        .transform((str) =>
            str
                .split(';')
                .map((num) => num.trim())
                .filter((str) => str)
                .map((num) => {
                    return Number(num);
                })
                .filter((num) => !isNaN(num)),
        )
        .optional(),

    isAccepted: zod
        .string()
        .transform((str) => {
            if (str.trim()) {
                return str === 'Принятые';
            }
            return undefined;
        })
        .optional(),
});

export type Schema = zod.infer<typeof schema>;
