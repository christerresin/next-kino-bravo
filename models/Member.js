import mongoose from 'mongoose';

const MemberSchema = new mongoose.Schema({
  id: String,
  firstname: String,
  lastname: String,
  username: String,
  password: String,
  email: String,

  bookings: [String],
});

export default mongoose.models.Member || mongoose.model('Member', MemberSchema);
