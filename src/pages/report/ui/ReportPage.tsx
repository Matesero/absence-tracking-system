import React from 'react';

import { filtrationFeature } from '~/features';
import { useForm } from '~/features/filtration/model';

const { ReportFilter } = filtrationFeature.ui;

export const ReportPage = () => {
    const [, , errors, groups, onSubmit] = useForm('report');

    return (
        <div className="flex flex-col gap-3 w-full sm:w-4/5 3xl:max-w-screen-full p-5 sm:pt-4 sm:p-4 sm:pb-4 items-center self-start">
            <ReportFilter errors={errors} groups={groups} onSubmit={onSubmit} />
        </div>
    );
};
