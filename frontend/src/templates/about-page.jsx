import React from 'react'
import { graphql } from 'gatsby'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'
import { HTMLContent } from '../components/Content'
import '../styling/styles.scss'
import VerticalTileColumn from '../components/VerticalTileColumn'
import { StrawberryTile } from '../components/VerticalTileColumn'
import { Layout } from '../components/Layout'
import { site } from '../util/templating'

// This is used by the websitesite and for CMS previews
export const AboutPage = ({title, subtitle, image, content, contentComponent}) => {
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
              <VerticalTileColumn>
                <StrawberryTile image="/img/strawberry-icon.png" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore"/>
                <StrawberryTile image="/img/strawberry-icon.png" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore"/>
                <StrawberryTile image="/img/strawberry-icon.png" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore"/>
              </VerticalTileColumn>
              <div className="column">
                <BodyComponent content={content} />
              </div>
            </div>
          </div>
        </section>
      </Layout>
)}

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
      }
      html
    }
  }
`

