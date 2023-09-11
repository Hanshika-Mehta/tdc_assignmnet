const yup = require('yup');

const bookSchema = yup.object().shape({
  title: yup.string().required(),
  author: yup.string().required(),
  publisher: yup.string().required(),
  genre: yup.string().required(),
  publish_year: yup.number().required().positive().integer(),
  price: yup.string().required(),
  image_url: yup.string().required().url()
});

module.exports = { bookSchema };
