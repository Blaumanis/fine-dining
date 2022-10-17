import { GraphQLClient, gql } from 'graphql-request'
import Link from 'next/link'
import styles from '../../styles/Slug.module.css'

// fetching data from Graph CMS API
const graphcms = new GraphQLClient(
  'https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/cl9bp0cvy3x2t01ta1sea37y9/master'
)

// querying the data from API
const QUERY = gql`
  query Food($slug: String!) {
    food(where: { slug: $slug }) {
      title
      slug
      coverPhoto {
        url
      }
      content {
        text
      }
      price
      chef {
        name
      }
    }
  }
`

const FOODLIST = gql`
  {
    foods {
      slug
    }
  }
`

export async function getStaticPaths() {
  const { foods } = await graphcms.request(FOODLIST)
  return {
    paths: foods.map((food) => ({ params: { slug: food.slug } })),
    fallback: false,
  }
}

// fetch request
export async function getStaticProps({ params }) {
  const slug = params.slug
  const data = await graphcms.request(QUERY, { slug })
  const food = data.food
  return {
    props: {
      food,
    },
    revalidate: 10,
  }
}

const Slug = ({ food }) => {
  return (
    <>
      <div className={styles.homeLink}>
        <Link href='/'>Home</Link>
      </div>
      <main className={styles.container}>
        <article className={styles.foodContainer}>
        <img src={food.coverPhoto.url} alt={food.title} />
        <div className={styles.textContainer}>
          <div className={styles.titleContainer}>
            <h1>{food.title}</h1>
            <h4>{food.price}£</h4>
          </div>
          <p>{food.content.text}</p>
          <h3>Made By {food.chef.name}</h3>
        </div>
        </article>
      </main>
    </>
  )
}

export default Slug
