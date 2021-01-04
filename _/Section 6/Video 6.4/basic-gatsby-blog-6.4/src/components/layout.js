import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import Helmet from "react-helmet"
import Container from "@material-ui/core/Container"
import Navigation from "./Navigation/Navigation"

const Header = (props) => {
  return (
    <>
      <div>
        Go to <Link to="/about">About page</Link>&nbsp;<Link to="/images">Images page</Link>&nbsp;<Link to="/">Home page</Link>
      </div>
      <h2>{props.title}</h2>
    </>
  )
}

export default ({ children }) => {
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
      <Helmet>
		    <title>{data.site.siteMetadata.title}</title>
		  </Helmet>
      <Container>
        <Header title={data.site.siteMetadata.title} />
        <Navigation siteTitle={data.site.siteMetadata.title} />
        <main>
          {children}
        </main>
      </Container>
	  </>
  )
}
