import Image from 'next/image';

import dbConnect from '../../lib/dbConnect';
import Movie from '../../models/movie';
import Reviews from '../../components/Reviews';
import Screenings from '../../components/Screenings';

import styles from './moviepage.module.css';

export const getServerSideProps = async (context) => {
  const movieId = context.query.id;
  await dbConnect();

  const result = await Movie.find({ id: movieId });
  const movie = result.map((doc) => {
    const movieData = doc.toObject();
    // Convert mongoDB document id to string
    movieData._id = movieData._id.toString();
    return movieData;
  });
  if (movie.length === 0) {
    return {
      notFound: true,
    };
  } else {
    return { props: { movie: movie[0] } };
  }
};

const MoviePage = ({ movie }) => {
  return (
    <div className={styles.container}>
      <Reviews reviews={movie.reviews} />
      <Image alt='cover image' src={movie.imgUrl} width={240} height={380} />
      <div>
        <h1 className={styles.title}>{movie.title}</h1>
        <p>{movie.description}</p>
      </div>
      <Screenings screenings={movie.screenings} />
    </div>
  );
};

export default MoviePage;

/*
  Link screenings to booking with Link
  Add styling, padding removed
*/
