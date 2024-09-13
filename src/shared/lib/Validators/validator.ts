export type ValidatorType = (value: string) => string | undefined;

export const requiredField: ValidatorType = (value) => {
    if(value) return undefined;
    return 'Field is required';
};

export const maxLengthCreator = (maxLength: number): ValidatorType => {
    return (value) => {
        if(value && value.length > maxLength) return `Max length is ${maxLength} symbols`;
        return undefined;
    }
};
