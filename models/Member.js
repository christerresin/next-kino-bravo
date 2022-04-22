import mongoose from 'mongoose';

const MemberSchema = new mongoose.Schema({
  id: String,
  username: String,
  password: String,
  bookings: [
    {
      userId: String,
      movieId: String,
      screeningId: String,
      date: String,
      time: String,
    },
  ],
});

export default mongoose.models.Member || mongoose.model('Member', MemberSchema);
