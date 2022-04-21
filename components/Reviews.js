import styles from './Reviews.module.css';

const Reviews = ({ reviews }) => {
  if (reviews.length > 0) {
    return (
      <div className={styles.container}>
        <h4>Recensioner</h4>
        <ul className={styles.reviews}>
          {reviews.map((review) => {
            return (
              <li className={styles.review} key={review.comment}>
                <p>{review.date}</p>
                <p className={styles.comment}>{review.comment}</p>
                <p className={styles.rating}>{review.rating}/5</p>
              </li>
            );
          })}
        </ul>
      </div>
    );
  } else {
    return (
      <div className={styles.container}>
        <h4>Recensioner</h4>
        <p>Inga recensioner</p>
      </div>
    );
  }
};

export default Reviews;
