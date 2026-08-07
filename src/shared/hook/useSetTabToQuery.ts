import { Dispatch, SetStateAction, useEffect } from 'react';

export const useSetTabToQuery = (
  params: {
    setter: Dispatch<SetStateAction<string>> | Dispatch<SetStateAction<number>>;
    queryParams: string | number;
    additional: string | number;
  }[],
) => {
  useEffect(() => {
    params.forEach((param) => {
      // @ts-ignore
      param.setter(param.queryParams || param.additional);
    });
  }, [params]);
};
