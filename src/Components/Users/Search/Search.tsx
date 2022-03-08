import {ErrorMessage, Field, Form, Formik} from 'formik';
import React from 'react';
import {FilterType} from '../../../types/types';
import s from './Search.module.css';
import {useSelector} from 'react-redux';
import {getUsersFilter} from '../../../redux/users-selectors';
import {Button, Input, Select,} from 'antd';

type PropsType = {
    onSubmit: (values: FilterType) => void,
    isFetching: boolean
}

type FriendFormType = 'null' | 'true' | 'false';
type FormType = {
    term: string,
    friend: FriendFormType
}

const searchFormValidate = (values: FormType) => {
    const errors: any = {};
    return errors;
};
const {Option} = Select;

const SearchForm: React.FC<PropsType> = React.memo((props) => {


    const filter = useSelector(getUsersFilter);

    const searchFormSubmit = (values: FormType, {setSubmitting}: { setSubmitting: (isSubmitting: boolean) => void }) => {
        const convertedValues: FilterType = {
            term: values.term,
            friend: values.friend === 'null'
                ? null
                : values.friend === 'false'
                    ? false
                    : true
        };

        props.onSubmit(convertedValues);
        setSubmitting(props.isFetching);
    };

    return <div>


        {/*<Input.Group compact>*/}
        {/*    <Input name={'term'} style={{width: '70%'}} placeholder={'Search...'}/>*/}
        {/*    <Select style={{width: '20%'}} defaultValue="null">*/}
        {/*        <Option value={'null'}>All</Option>*/}
        {/*        <Option value={'true'}>Friends</Option>*/}
        {/*        <Option value={'false'}>Enemies</Option>*/}
        {/*    </Select>*/}
        {/*    <Button type="primary" disabled={props.isFetching}>Search</Button>*/}
        {/*</Input.Group>*/}

        <Formik initialValues={{term: filter.term, friend: String(filter.friend) as FriendFormType}}
                enableReinitialize
                validate={searchFormValidate}
                onSubmit={searchFormSubmit}>
            {() => (
                <Form className={s.search}>
                    <Field type="text" name="term"/>
                    <ErrorMessage name="term" component="div"/>
                    <Field name={'friend'} as={'select'}>
                        <option value={'null'}>All</option>
                        <option value={'true'}>Friends</option>
                        <option value={'false'}>Enemies</option>
                    </Field>
                    <button className={s.btn} type="submit" disabled={props.isFetching}>
                        Find
                    </button>
                </Form>
            )}
        </Formik>
    </div>
});

export default SearchForm;
