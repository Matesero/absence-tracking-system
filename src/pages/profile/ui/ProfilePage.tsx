import React from 'react';

import { Layout } from '~/app/layout';
import { authorizationFeature } from '~/features';

const { ProfileForm } = authorizationFeature.ui;

export const ProfilePage = () => {
    return (
        <Layout>
            <ProfileForm />
        </Layout>
    );
};
