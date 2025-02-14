import { format } from "date-fns";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "./MovieReviewsItem.module.css";

const MovieReviewsItem = ({ dataReviews, isLoading }) => {
  if (isLoading) {
    return (
      <div className={styles.reviewItem}>
        <Skeleton height={20} width="50%" className={styles.skeletonAuthor} />
        <Skeleton height={15} width="30%" className={styles.skeletonUsername} />
        <Skeleton height={15} width="40%" className={styles.skeletonDate} />
        <Skeleton height={60} width="100%" className={styles.skeletonContent} />
      </div>
    );
  }

  const { author, author_details, content, created_at } = dataReviews;
  const formattedDate = format(new Date(created_at), "MMMM dd yyyy HH:mm:ss");

  return (
    <div className={styles.reviewItem}>
      <h2 className={styles.reviewAuthor}>{author}</h2>
      <p className={styles.reviewUsername}>
        <span className={styles.label}>Username:</span> {author_details.username}
      </p>
      <p className={styles.reviewDate}>{formattedDate}</p>
      <p className={styles.reviewContent}>{content}</p>
    </div>
  );
};

export default MovieReviewsItem;