import { model, Schema } from 'mongoose';

const projectSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: String,
  course: {
    type: String,
    required: true,
  },
  students: {
    type: [String],
  },
  status: {
    type: Boolean,
    require: true,
    default: true,
  },
  members: Number,
  tasks: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Task',
    },
  ],
});

const Project = model('Project', projectSchema);
export default Project;
