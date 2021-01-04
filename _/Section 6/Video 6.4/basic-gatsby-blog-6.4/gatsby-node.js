const path = require(`path`)
exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `jsonplaceholderapi__posts`) {

    // console.log(`\n`, node.title)
    
    if (typeof node.title !== undefined) { 
      let slug = ""
      slug = node.title
      if (slug) { 
        slug = slug.replace(/\s/g, "-")
        // console.log(`\n`, node.title)
        // console.log(`\n`, slug)
        createNodeField({
          node,
          name: `slug`,
          value: slug,
        })
      }
    }
  }
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return graphql(`
    {
      allJsonplaceholderapiPosts(limit: 8) {
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
).then(result => {
    // console.log(JSON.stringify(result, null, 4))
    result.data.allJsonplaceholderapiPosts.edges.forEach(({ node }) => {
		if (typeof node.fields !== "undefined" && node.fields !== null) {
      createPage({
        path: node.fields.slug,
        component: path.resolve(`./src/templates/blog-post.js`),
        context: {
          // Data passed to context is available
          // in page queries as GraphQL variables.
          slug: node.fields.slug,
        },
      })
		}
    })
  })
}
