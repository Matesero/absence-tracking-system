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

export const schema = zod.object({
    email: zod
        .string()
        .trim()
        .optional()
        .refine(value => {
            if (!value || value.trim() === '') {return true}
            return /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)
        }, {
            message: 'Некорректно набран email',
        }),

    fullName: zod
        .string()
        .trim()
        .refine(value => {
            if (!value || value.trim() === '') {return true}
            return !/[A-Za-z]/.test(value)
        }, {
            message: 'ФИО должно состоять только из русских букв',
        })
        .refine(value => {
            if (!value || value.trim() === '') {return true}
            return /^([А-Я][а-я]+ ){2}[А-Я][а-я]+$/.test(value)
        }, {
            message: 'Некорректно введены ФИО',
        })
        .optional(),

    groupNumber: zod
        .string()
        .transform((str) => Number(str))
        .optional(),

    role: zod
        .string()
        .optional(),

    blocked: zod
        .boolean()
        .default(false),
});

export type Schema = zod.infer<typeof schema>;
