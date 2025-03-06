const getEnvVar = (key: string) => {
    if (import.meta.env[key] === undefined) {
        throw new Error(`Env ${key} отсутствует`);
    }

    return import.meta.env[key] || '';
};

export const API_HOST = getEnvVar('VITE_API_HOST');
