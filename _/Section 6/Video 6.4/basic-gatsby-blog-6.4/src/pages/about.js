import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

const Body = (props) => {
  return (
  <div>
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
    <Layout>
		  <SEO title="About" />
      <Body posts={data.allMarkdownRemark.edges} />
    </Layout>
  )
}
