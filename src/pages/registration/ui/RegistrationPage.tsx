import React from 'react';

import { Layout } from '~/app/layout';
import { authorizationFeature } from '~/features';

const { RegistrationForm } = authorizationFeature.ui;

export const RegistrationPage = () => {
    return (
        <Layout>
            <RegistrationForm />
        </Layout>
    );
};
