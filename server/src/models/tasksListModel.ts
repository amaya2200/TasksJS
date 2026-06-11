import { Schema, model, Types, Document } from 'mongoose';

export interface taskDocument extends Document {
  title: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface tasksListDocument extends Document {
  name: string;
  user: Types.ObjectId;
  tasks: Types.DocumentArray<taskDocument>;
  createdAt: Date;
  updatedAt: Date;
}

const taskSchema = new Schema<taskDocument>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {timestamps: true}
);

const tasksListSchema = new Schema<tasksListDocument>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    tasks: {
      type: [taskSchema],
      default: [],
    },
  },
  {timestamps: true}
);

const tasksListModel = model<tasksListDocument>('tasksList', tasksListSchema);

export default tasksListModel;