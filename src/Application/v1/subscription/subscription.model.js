import mongoose from 'mongoose';
// import getModelName from 'Utils/getModelName';

const { Schema } = mongoose;
const modelName = 'Subscriptions';
// const { singularName, pluralName } = getModelName('company');

const schema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'Users'
    },
    plan: {
      type: Schema.Types.ObjectId,
      ref: 'Plans'
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
    created_at: {
      type: Date,
      default: Date.now,
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
export default mongoose.models.Subscription || mongoose.model(modelName, schema);
