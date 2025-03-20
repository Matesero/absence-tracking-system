import zod from 'zod';

export const schema = zod.object({
    role: zod
        .enum(['Студент', 'Преподаватель', 'Деканат'])
        .optional(),

    isBlocked: zod
        .boolean()
        .optional()
})