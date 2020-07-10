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

  schema.set('toJSON', {
    transform: function (doc, ret, options) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
    },
  });

  schema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  return gradesModel;
};
