import mongoose from 'mongoose';

export interface RegionDoc extends mongoose.Document {
  name: string;
  description: string;
}

const RegionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
  },
  description: {
    type: String,
    required: true,
  },
});

export default mongoose.model<RegionDoc>('Region', RegionSchema);
