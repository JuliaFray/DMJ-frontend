import React from "react";
import {DatePicker, Form, Input, Select, TimePicker} from "antd";

const FormItem = Form.Item;
const {Option} = Select;

const CreateAntField = (AntComponent: any) => ({field, form, hasFeedback, label, selectOptions, submitCount, type, ...props}:
    { field: any, form: any, hasFeedback: boolean, label: string, selectOptions: any, submitCount: any, type: any }) => {
    const touched = form.touched[field.name];
    const submitted = submitCount > 0;
    const hasError = form.errors[field.name];
    const submittedError = hasError && submitted;
    const touchedError = hasError && touched;
    // @ts-ignore
    const onInputChange = ({target: {value}}) =>
        form.setFieldValue(field.name, value);
    const onChange = (value: any) => form.setFieldValue(field.name, value);
    const onBlur = () => form.setFieldTouched(field.name, true);

    return (
        <div className="field-container">
            <FormItem
                label={label}
                hasFeedback={(hasFeedback && submitted) || (hasFeedback && touched) ? true : false}
                help={submittedError || touchedError ? hasError : false}
                validateStatus={submittedError || touchedError ? "error" : "success"}>
                <AntComponent
                    {...field}
                    {...props}
                    onBlur={onBlur}
                    onChange={type ? onInputChange : onChange}>
                    {selectOptions &&
                    selectOptions.map((name: string) => <Option key={name}>{name}</Option>)}
                </AntComponent>
            </FormItem>
        </div>
    );
};

export const AntSelect = CreateAntField(Select);
export const AntDatePicker = CreateAntField(DatePicker);
export const AntInput = CreateAntField(Input);
// export const AntTimePicker = CreateAntField(TimePicker);
