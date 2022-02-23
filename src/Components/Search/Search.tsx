import {ErrorMessage, Field, Form, Formik} from 'formik';
import React from 'react';
import {FilterType} from '../../types/types';

type PropsType = {
    onSubmit: (values: FilterType) => void,
    isFetching: boolean
}

type FormType = {
    term: string,
    friend: 'null' | 'true' | 'false'
}

const searchFormValidate = (values: FormType) => {
    const errors: any = {};
    return errors;
};

const SearchForm: React.FC<PropsType> = React.memo((props) => {

    const searchFormSubmit = (values: FormType, {setSubmitting}: { setSubmitting: (isSubmitting: boolean) => void }) => {
        const convertedValues: FilterType = {
            term: values.term,
            friend: values.friend === 'null'
                ? null
                : values.term === 'false'
                    ? false
                    : true
        };

        props.onSubmit(convertedValues);
        setSubmitting(props.isFetching);
    };

    return <div>
        <Formik initialValues={{term: '', friend: 'null'}}
                validate={searchFormValidate}
                onSubmit={searchFormSubmit}>
            {() => (
                <Form>
                    <Field type="text" name="term"/>
                    <ErrorMessage name="term" component="div"/>
                    <Field name={'friend'} as={'select'}>
                        <option value={'null'}>All</option>
                        <option value={'true'}>Friends</option>
                        <option value={'false'}>Enemies</option>
                    </Field>
                    <button type="submit" disabled={props.isFetching}>
                        Find
                    </button>
                </Form>
            )}
        </Formik>
    </div>
});

export default SearchForm;
