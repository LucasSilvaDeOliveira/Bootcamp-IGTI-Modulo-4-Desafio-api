export default (mongoose) => {
  const schema = mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
      required: true,
      //Valida se a nota inserida e' menor que zero
      validate(value) {
        if (value < 0) throw new Error('Valor negativo para nota');
      },
    },
    lastModified: {
      type: Date,
      default: Date.now,
    },
  });

  schema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const gradesModel = mongoose.model('grades', schema, 'grades');

  return gradesModel;
};
