import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const Body = (props) => {
  return (
  <div>
    <Typography variant="h6">{props.body}</Typography>
    {props.posts.map(({ node }) => {
		  return(
      <Paper style={{margin: 10, padding: 4}} elevation={4} key={node.id}>
{/*        <p><em>{node.date}</em></p> */}
        <Typography variant="h5">{node.title}</Typography>
        <Typography component="p">{node.body}</Typography>
        {node.fields && <div>
          <Link 
            to={node.fields.slug}
					>
					  Read more...
          </Link>
        </div>}
      </Paper>
			)
    })}
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
						description
						author
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
    <Layout>
		  <SEO title="Home" />
      <Body body={data.site.siteMetadata.body} 
            posts={data.allJsonplaceholderapiPosts.edges}
      />
    </Layout>
  )
}
