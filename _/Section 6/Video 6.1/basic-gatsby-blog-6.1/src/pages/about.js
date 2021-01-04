import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"

const Body = (props) => {
  return (
  <div>
    <div>
      Back to <Link to="/">Home page</Link>
    </div>
    {props.posts.map(({ node }) => {
      return (
      <div key={node.frontmatter.title}>
        <h3>{node.frontmatter.title}</h3>
        <p>{node.excerpt}</p>
      </div>
      )
    })}
  </div>
  )
}

export default () => {
  const data = useStaticQuery(
    graphql`
      query {
        allMarkdownRemark(
            filter: {
              frontmatter: {
                title: { eq: "About"}
              }
            }
          ) {
            edges {
              node {
                frontmatter {
                  title
                }
                excerpt
              }
            }
          }
      }
    `
  )
  console.log('data', data)
  return (
    <>
      <Body posts={data.allMarkdownRemark.edges} />
    </>
  )
}
