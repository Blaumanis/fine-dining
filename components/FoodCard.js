import Link from 'next/link'
import styles from '../styles/FoodCard.module.css'

const FoodCard = ({ title, slug, coverPhoto, price, id }) => {
  return (
    <article className={styles.foodItem} key={id}>
      <Link href={`/foods/${slug}`}>
        <div className={styles.card}>
          <img src={coverPhoto.url} alt='alt' />
          <div className={styles.titleContainer}>
            <h2>{title}</h2>
            <h4>{price}£</h4>
          </div>
        </div>
      </Link>
    </article>
  )
}

export default FoodCard
