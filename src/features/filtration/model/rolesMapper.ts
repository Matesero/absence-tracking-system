const mapRoleTo = (role: string) => {
    const roles = {
        Студент: 'student',
        Деканат: 'deanery',
        Преподаватель: 'teacher',
        Админ: 'admin',
    };

    return roles[role];
};

const mapRoleFrom = (role: string) => {
    const roles = {
        student: 'Студент',
        deanery: 'Деканат',
        teacher: 'Преподаватель',
        admin: 'Админ',
    };

    return roles[role];
};

export { mapRoleTo, mapRoleFrom };
