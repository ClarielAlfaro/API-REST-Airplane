import mongoose from 'mongoose';
// import getModelName from 'Utils/getModelName';

const { Schema } = mongoose;
const modelName = 'planes';
// const { singularName, pluralName } = getModelName('plane');

const schema = new Schema(
  {
    model: {
      type: String,
      isRequired: true,
    },
    company: {
      type: Schema.Types.ObjectId,
      ref: 'Companies'
    },
    problem: {
      type: String,
      isRequired: true,
    },
    diagnostic: {
      type: String,
      isRequired: true,
    },
    status: {
      type: String,
      enum: ['repaired', 'unrepaired', 'discarded'],
      default: 'unrepaired',
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
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
export default mongoose.models.Plane || mongoose.model(modelName, schema);
