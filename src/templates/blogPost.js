import React from 'react';
import { graphql, Link } from 'gatsby';

const Template = ({ data, pageContext }) => {
  const { title } = data.markdownRemark.frontmatter;
  const { html } = data.markdownRemark;
  const { next, prev } = pageContext;
  console.log(pageContext);
  return (
    <div style={{ fontFamily: 'avenir' }}>
      <h1>{title}</h1>
      <div className="blogpost" dangerouslySetInnerHTML={{ __html: html }} />
      <div style={{ marginBottom: '1rem' }}>
        {next && (
          <Link to={next.frontmatter.path}>
            Next: {`${next.frontmatter.title}`}
          </Link>
        )}
      </div>
      <div>
        {prev && (
          <Link to={prev.frontmatter.path}>
            Previous: {`${prev.frontmatter.title}`}
          </Link>
        )}
      </div>
    </div>
  );
};

export const query = graphql`
  query($pathSlug: String!) {
    markdownRemark(frontmatter: { path: { eq: $pathSlug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`;

export default Template;
