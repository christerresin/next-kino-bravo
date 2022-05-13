import mongoose from 'mongoose';

const MovieSchema = new mongoose.Schema({
  title: String,
  id: String,
  description: String,
  imgUrl: String,
  screenings: [
    {
      date: String,
      time: String,
    },
  ],
  reviews: [
    {
      date: String,
      comment: String,
      rating: String,
    },
  ],
});

export default mongoose.models.Movie || mongoose.model('Movie', MovieSchema);
