import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'
import { HTMLContent } from '../components/Content'
import '../styling/styles.scss'
import { StrawberryTiles } from '../components/StrawberryCard'
import { Layout } from '../components/Layout'
import { site } from '../util/templating'

// This is used by the websitesite and for CMS previews
export const AboutPage = ({title, subtitle, image, content, contentComponent, strawberryTiles}) => {
    const BodyComponent = contentComponent || HTMLContent

    return (
      <Layout>
        <section className="section">
          <div className="container">
            <h1 className="title is-1">{title}</h1>
            <h2 className="subtitle">{subtitle}</h2>
            <figure>
              <PreviewCompatibleImage imageInfo={image} />
            </figure>
          </div>
        </section>
        <section className="section">
          <div className="container">
            <div className="columns reverse-columns">
              <StrawberryTiles tileTextArray={strawberryTiles}/>
              <div className="column">
                <BodyComponent content={content} />
              </div>
            </div>
          </div>
        </section>
      </Layout>
)}

AboutPage.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  image: PropTypes.object.isRequired,
  content: PropTypes.string.isRequired,
  contentComponent: PropTypes.elementType,
  strawberryTiles: PropTypes.arrayOf(PropTypes.string)
}

export default site(AboutPage)

export const query = graphql`
query aboutPageTemplate($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        subtitle
        image {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
        strawberryTiles
      }
      html
    }
  }
`


