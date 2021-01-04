import React from "react"
import { useStaticQuery, graphql } from "gatsby"

const Header = (props) => {
  return (
    <h2>{props.title}</h2>
  )
}

const Body = (props) => {
  return (
  <div>
    <p>{props.body}</p>
    {props.posts.map(({ node }) => (
      <div key={node.id}>
        <h3>{node.frontmatter.title} {node.frontmatter.date}</h3>
        <p>{node.excerpt}</p>
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
        allMarkdownRemark {
          edges {
            node {
              html
              frontmatter {
                title
                date
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
      <Header title={data.site.siteMetadata.title} />
      <Body body={data.site.siteMetadata.body} posts={data.allMarkdownRemark.edges} />
    </>
  )
}
