const path = require('path');

exports.createPages = ({ graphql, actions }) => {
  const { createPages } = actions;
  const blogPostTemplate = path.resolve('src/templates/blogPost.js');

  return graphql`
    allMarkdownRemark {
      edges {
        node {
          frontmatter {
            path
          }
        }
      }
    }
  `.then(result => {
    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      const path = node.frontmatter.path;
      createPage({
        path,
        component: blogPostTemplate,
        context: {
          pathSlug: path,
        },
      });
    });
  });
};
