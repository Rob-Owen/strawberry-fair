import React from 'react'
import { graphql } from 'gatsby'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'
import { HTMLContent } from '../components/Content'
import '../styling/styles.sass'

class VerticalTileColumn extends React.Component {
  render() {
  return (
    <div className="column is-one-quarter">
      <div className="tile is-ancestor">
        <div className="tile is-parent is-vertical">
          {this.props.children}
        </div>
      </div>
    </div>
  )
  }

}

// This is used by the websitesite and for CMS previews
export const AboutPageContent = ({title, subtitle, image, content, contentComponent}) => {
    const BodyComponent = contentComponent || HTMLContent

    return (
    <body>
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
              <div className="tile is-child has-background-primary box">
                <figure className="image is-64x64">
                  <img  src="/img/strawberry-icon.png" alt={'A strawberry'}  />
                </figure>
                <p className="has-text-white">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore</p>
              </div>
              <div className="tile is-child has-background-primary box">
                <figure className="image is-64x64">
                  <img  src="/img/strawberry-icon.png" alt={'A strawberry'}  />
                </figure>
                <p className="has-text-white">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore</p>
              </div>
              <div className="tile is-child has-background-primary box">
                <figure className="image is-64x64">
                  <img  src="/img/strawberry-icon.png" alt={'A strawberryS'}  />
                </figure>
                <p className="has-text-white">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore</p>
              </div>
            </VerticalTileColumn>
            <div className="column">
              <BodyComponent content={content} />
            </div>
          </div>
        </div>
      </section>
    </body>
)}




const AboutPage = ({data: {markdownRemark}}) => (
    <AboutPageContent
        title={markdownRemark.frontmatter.title}
        subtitle={markdownRemark.frontmatter.subtitle}
        image={markdownRemark.frontmatter.image}
        content={markdownRemark.html}
    />
)

export default AboutPage

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


