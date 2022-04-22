import mongoose from 'mongoose';

const MemberSchema = new mongoose.Schema({
  id: String,
  userName: String,
  password: String,
  bookings: [
    {
      id: String,
      movieId: String,
      screeningId: String,
      date: String,
      time: String,
    },
  ],
});
