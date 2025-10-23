import { resolve as _resolve } from 'path';

export const resolve = {
  alias: {
    shared: _resolve(__dirname, 'src/shared/*'),
    entities: _resolve(__dirname, 'src/entities/*'),
    features: _resolve(__dirname, 'src/features/*'),
    widgets: _resolve(__dirname, 'src/widgets/*'),
    pages: _resolve(__dirname, 'src/pages/*'),
    app: _resolve(__dirname, 'src/app/*'),
  },
};
