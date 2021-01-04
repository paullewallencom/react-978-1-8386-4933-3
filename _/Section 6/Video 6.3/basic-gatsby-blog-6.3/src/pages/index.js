import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"

const Header = (props) => {
  return (
    <>
      <div>
        Go to <Link to="/about">About page</Link>&nbsp;<Link to="/images">Images page</Link>
      </div>
      <h2>{props.title}</h2>
    </>
  )
}

const Body = (props) => {
  return (
  <div>
    <p>{props.body}</p>
    {props.posts.map(({ node }) => (
      <div key={node.id}>
{/*        <p><em>{node.date}</em></p> */}
        <h3>{node.title}</h3>
        <p>{node.body}</p>
        {node.fields && <div>
          <Link 
            to={node.fields.slug}
					>
					  Read more...
          </Link>
        </div>}
        <hr/>
      </div>
    ))}
  </div>
  )
}

export default () => {
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            body
          }
        }
        allJsonplaceholderapiPosts (limit: 8) {
          edges {
            node {
              id
              title
              body
              fields {
                slug
              }
            }
          }
        }
      }
    `
  )
  // console.log('data', data)
  return (
    <>
      <Header title={data.site.siteMetadata.title} />
      <Body body={data.site.siteMetadata.body} 
            posts={data.allJsonplaceholderapiPosts.edges}
      />
    </>
  )
}
