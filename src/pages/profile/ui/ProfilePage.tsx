import React from 'react';

import { authorizationFeature } from '~/features';

const { ProfileForm } = authorizationFeature.ui;

export const ProfilePage = () => {
    return (
        <ProfileForm />
    );
};
