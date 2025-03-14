import React from 'react';

import { authorizationFeature } from '~/features';

const { RegistrationForm } = authorizationFeature.ui;

export const RegistrationPage = () => {
    return <RegistrationForm />;
};
