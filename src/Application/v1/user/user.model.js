import mongoose from 'mongoose';
// import getModelName from 'Utils/getModelName';

const { Schema } = mongoose;
const modelName = 'Users';
// const { singularName, pluralName } = getModelName('company');

const schema = new Schema(
  {
    name: {
      type: String,
      isRequired: true,
    },
    lastname: {
      type: String,
      isRequired: true,
    },
    pass: {
      type: String,
      isRequired: true,
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
    email: {
      type: String,
      isRequired: true,
    }
  },
  {
    versionKey: false,
  }
);

// Ensure virtual fields are serialised.
schema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform(_doc, ret) {
    delete ret._id;
  },
});

// rename name Example to singular Model
export default mongoose.models.User || mongoose.model(modelName, schema);
