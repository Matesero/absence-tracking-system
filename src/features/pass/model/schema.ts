import zod from 'zod';

export const schema = zod.object({
    status: zod.enum(['Принят', 'Отклонен']),
});