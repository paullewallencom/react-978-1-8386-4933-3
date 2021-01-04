import React from "react"
import { graphql } from "gatsby"
import { Helmet } from "react-helmet"

export default ({data}) => {
  console.log('data', data)
  //console.log(data)
  //const post = data.markdownRemark allJsonplaceholderapiPosts
  return (
    <>
			<Helmet title={data.allJsonplaceholderapiPosts.edges[0].node.title} />
      <h2>{data.allJsonplaceholderapiPosts.edges[0].node.title}</h2>
      <p>{data.allJsonplaceholderapiPosts.edges[0].node.body}</p>
    </>
  )
}

export const query = graphql`
  query($slug: String!) {
    allJsonplaceholderapiPosts(
      filter: {
        fields: { 
          slug: { eq: $slug }
        }
      }
    ) {
      edges {
        node {
          title
          body
        }
      }
    } 
  }
`
