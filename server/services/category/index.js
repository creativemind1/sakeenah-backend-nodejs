let CategoryModel = require('../../model/Category');
module.exports = {
    list: (req, callback) => {
        let responseObj = { status: 'FAILED', data: null };
        let filters = { active: true };
        const projection = {
            _id: 0,
            categoryId: 1,
            categoryName: 1,
            description: 1,
        };
        CategoryModel.find(filters, projection, (err, docs) => {
            if (docs && docs.length) {
                responseObj.status = 'SUCCESS';
                responseObj.data = docs;
            }
            callback(responseObj);
        });
    },
};
