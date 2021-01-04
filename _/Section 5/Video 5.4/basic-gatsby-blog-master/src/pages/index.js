import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"

const Header = (props) => {
  return (
	  <>
      <div>
        Go to <Link to="/about">About page</Link>
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
      <div key={node.frontmatter.title}>
        <p><em>{node.frontmatter.date}</em></p>
        <h3>{node.frontmatter.title}</h3>
        <p>{node.excerpt}</p>
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
        allMarkdownRemark(
            filter: {
              frontmatter: {
                title: { ne: "About"}
              }
            }
          ) {
            edges {
              node {
                frontmatter {
                  title
                  date(formatString: "dddd DD MMMM YYYY")
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
