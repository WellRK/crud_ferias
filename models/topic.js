import mongoose, { Schema } from "mongoose";

const vacationSchema = new Schema({
  startDate: Date,
  endDate: Date,
});

const topicSchema = new Schema(
  {
    name: String,
    position: String,
    hireDate: Date,
    //startDate: Date,
    //endDate: Date,
    vacations: [vacationSchema], 
  },
  {
    timestamps: true,
  }
);

const Topic = mongoose.models.Topic || mongoose.model("Topic", topicSchema);

export default Topic;
