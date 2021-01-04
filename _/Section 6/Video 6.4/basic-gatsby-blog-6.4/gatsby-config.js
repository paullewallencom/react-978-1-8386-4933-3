/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  /* Your site config here */
    siteMetadata: {
      title: `Recent Posts`,
      body: `What's been on our mind...`,
			description: `basic gatsby blog`,
			author: `Victor Kane`,
    },
  plugins: [
    'gatsby-plugin-top-layout',
    {
      resolve: 'gatsby-plugin-material-ui',
      options: {
      }
    },
    {
      resolve: `gatsby-source-apiserver`,
      options: {
        typePrefix: 'jsonplaceholderapi__',
        url: `https://jsonplaceholder.typicode.com/posts`,
        method: 'get',
        headers: {
          'Content-Type': 'application/json'
        },
        name: `posts`,
        verboseOutput: true,
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`
      }
    },
    `gatsby-transformer-remark`,
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
  ],
}
