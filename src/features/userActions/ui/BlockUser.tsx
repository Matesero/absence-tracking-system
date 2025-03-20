import React from 'react';

import { useForm } from '../model'

import { Button } from '~/shared/ui';

export const BlockButton = (props : { userId: string, isBlocked: boolean }) => {
    const [ , blocked , onSubmit] = useForm('block', props.userId, undefined, props.isBlocked);

    return (
        <>
            {blocked === true ? (
                <form
                    onSubmit={onSubmit}
                >
                    <Button
                        label='Разблокировать'
                        type='submit'
                    />
                </form>
            ) : (
                <form
                    onSubmit={onSubmit}
                >
                    <Button
                        label='Заблокировать'
                        bgColor='bg-red-600'
                        type='submit'
                    />
                </form>
            )}
        </>
    )
}