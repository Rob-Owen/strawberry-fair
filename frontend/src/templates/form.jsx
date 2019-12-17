import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import { HTMLContent } from '../components/Content'
import { Layout } from '../components/Layout'
import { FormFrame } from '../components/FormFrame'
import { site } from '../util/templating'

// This is used by the website and for CMS previews
export const FormPage = ({title, form, content, contentComponent}) => {
    const BodyComponent = contentComponent || HTMLContent

    return (
      <Layout>
        <h1 className="title has-text-centered has-text-primary">{title}</h1>
        <BodyComponent content={content} />
        <FormFrame form={form} />
      </Layout>
    )
}

FormPage.propTypes = {
  title: PropTypes.string.isRequired,
  form: FormFrame.propTypes.form,
  content: PropTypes.string.isRequired,
  contentComponent: PropTypes.elementType  // Not required
}

export default site(FormPage)

export const query = graphql`
query formPageTemplate($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        ...FormFragment
      }
      html
    }
  }
`
