import React from "react"
import { useStaticQuery, graphql } from "gatsby"

const Header = (props) => {
  return (
    <h2>{props.title}</h2>
  )
}

const Body = (props) => {
  return (
    <p>{props.body}</p>
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
      }
    `
  )
  console.log('data', data)
  return (
    <>
      <Header title={data.site.siteMetadata.title} />
      <Body body={data.site.siteMetadata.body} />
    </>
  )
}
