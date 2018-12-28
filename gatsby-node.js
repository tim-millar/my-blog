const path = require('path');

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  const blogPostTemplate = path.resolve(`./src/templates/blogPost.js`);

  return new Promise((resolve, reject) => {
    resolve(
      graphql(`
        query {
          allMarkdownRemark(
            sort: { order: ASC, fields: [frontmatter___date] }
          ) {
            edges {
              node {
                frontmatter {
                  path
                }
              }
            }
          }
        }
      `).then(result => {
        const posts = result.data.allMarkdownRemark.edges;
        posts.forEach(({ node }, index) => {
          const { path } = node.frontmatter;
          createPage({
            path,
            component: blogPostTemplate,
            context: {
              pathSlug: path,
              prev: index === 0 ? null : posts[index - 1].node,
              next: index === posts.length - 1 ? null : posts[index + 1].node,
            },
          });
        });
        return;
      }),
    );
  });
};
