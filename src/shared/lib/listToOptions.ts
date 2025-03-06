type Props = string[];

export const listToOptions = (list: Props) => {
    const options: { value: string; label: string }[] = [];

    list.forEach((item) => {
        const option = {
            value: item,
            label: item.toString(),
        };

        options.push(option);
    });

    return options;
};
