import React, {FC} from 'react';
import {Field, WrappedFieldProps} from "redux-form";
import {ValidatorType} from "../../../Utils/Validators/validator";
import styles from './FormControls.module.css'

const FormControl: React.FC<WrappedFieldProps> = ({meta: {touched, error}}, children) => {
    const hasError = touched && error;
    return (
        <div className={styles.formControl + " " + (hasError ? styles.error : "")}>
            <div>
                {children}
            </div>
            {hasError && <span>{error}</span>}
        </div>
    )
};

export const TextArea: React.FC<WrappedFieldProps> = (props) => {
    const {input, meta, ...restProps} = props;
    return <FormControl {...props}> <textarea {...input} {...restProps} /></FormControl>
};

export const Input: React.FC<WrappedFieldProps> = (props) => {
    const {input, meta, ...restProps} = props;
    return <FormControl {...props}> <input {...input}{...restProps}/></FormControl>
};

export const CheckBox: React.FC<WrappedFieldProps> = (props) => {
    const {input, meta, ...restProps} = props;
    return <FormControl {...props}> <input type={'checkbox'} {...input}{...restProps}/> </FormControl>
};

export function createField<FormsKeyType extends string>(placeholder: string, name: FormsKeyType, validators: Array<ValidatorType>,
    component: FC<WrappedFieldProps>, props = {}, text = ''
) {
    return (
        <div>
            <Field placeholder={placeholder}
                   name={name}
                   validate={validators}
                   component={component}
                   {...props}/> {text}
        </div>
    )
}

export type GenericFormDataKeys<T> = Extract<keyof T, string>;
