const path = require('path');

module.exports = {
    resolve: {
        alias: {
            shared: path.resolve(__dirname, 'src/shared/*'),
            entities: path.resolve(__dirname, 'src/entities/*'),
            features: path.resolve(__dirname, 'src/features/*'),
            widgets: path.resolve(__dirname, 'src/widgets/*'),
            pages: path.resolve(__dirname, 'src/pages/*'),
            app: path.resolve(__dirname, 'src/app/*'),
        }
    }
}
