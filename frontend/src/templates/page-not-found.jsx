import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import { HTMLContent } from '../components/Content'
import { site } from '../util/templating'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'
import { FaKaaba } from 'react-icons/fa'

export const PageNotFound = ({image}) => {
  const style = {
    width: "60%",
    height: "60%"
  }
  style["background-color"]="blue"

  return (
    <section className="section">
      <div className="container">
        <div className="columns is-centered">
          <div className="column is-half">
              <div align="center">
                <PreviewCompatibleImage imageInfo={image} style={style}/>
                <p className="is-size-2"><strong >Oh no!</strong></p>
                <p className="is-size-3">This page is not suitable for consumption :(</p>
              </div>
          </div>
        </div>
      </div>
    </section>
)}

export default site(PageNotFound)

export const query = graphql`
query pageNotFound($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        image {
          alt
          src {
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
      html
    }
    heroData: allMarkdownRemark(filter: {id: {eq: $id}}) {
      ...HeroFragment
    }
  }
`


