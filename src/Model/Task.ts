import { model, Schema } from 'mongoose';

const taskSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: String,
  comments: [String],
  message: String,
  files: [String],
  status: {
    type: Boolean,
    require: true,
    default: true,
  },
  qualification: Number,
});

const Task = model('Task', taskSchema);
export default Task;
