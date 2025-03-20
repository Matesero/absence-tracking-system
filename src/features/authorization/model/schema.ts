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
        .min(1, 'Поле является обязательным')
        .trim()
        .refine((value) => /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/.test(value), {
            message: 'Некорректно набран email',
        })
        .optional(),

    password: zod
        .string()
        .min(1, 'Поле является обязательным')
        .optional(),

    fullName: zod
        .string()
        .min(1, 'Поле является обязательным')
        .trim()
        .refine((value) => !/[A-Za-z]/.test(value), {
            message: 'ФИО должно состоять только из русских букв',
        })
        .refine((value) => /^([А-Я][а-я]+ ){2}[А-Я][а-я]+$/.test(value), {
            message: 'Некорректно введены ФИО',
        })
        .optional(),

    groupNumber: zod
        .string()
        .transform((str) => Number(str))
        .optional(),
});

export type Schema = zod.infer<typeof schema>;
