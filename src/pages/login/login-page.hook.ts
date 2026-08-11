import { useFormik } from 'formik';
import * as Yup from 'yup';

import { useLoginMutation } from 'shared/api';
import { useAppDispatch, useAppSelector } from 'shared/hook';
import { authActions, authSelector } from 'shared/model';
import { ILoginData } from 'shared/types';

export const useLogin = () => {
  const isFetching = useAppSelector(authSelector.getIsFetching);

  const dispatch = useAppDispatch();

  const [login] = useLoginMutation();

  const handleSubmit = (formData: ILoginData) => {
    login({ data: formData });
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().required('Обязательно для заполнения'),
    password: Yup.string().required('Обязательно для заполнения'),
  });

  const formikConfig = useFormik({
    initialValues: { email: '', password: '' } as ILoginData,
    onSubmit: (formData: ILoginData) => handleSubmit(formData),
    enableReinitialize: true,
  });

  return {
    validationSchema,
    isFetching,
    handleSubmit,
    handleChange: () => {
      dispatch(authActions.setGlobalError(null));
    },
    formikConfig,
  };
};
