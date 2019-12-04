import React from 'react'
import { graphql } from 'gatsby'

import PreviewCompatibleImage from '../components/PreviewCompatibleImage'
import { HTMLContent } from '../components/Content'


// used by website and CMS previews
export const EventInfoContent = ({title, dateTime, image, content, isMeeting, contentComponent}) => {
    const BodyComponent = contentComponent || HTMLContent

    const date = new Date(dateTime)
    const isMeetingBool = Boolean(isMeeting)

    return (
    <section>
        <h1>{title}</h1>
        <p>{date.toLocaleString('en-GB', {timeStyle: 'short'})}</p>
        <BodyComponent content={content} />
        <PreviewCompatibleImage imageInfo={image} />
    </section>
)}

const EventInfo = ({data: {markdownRemark}}) => (
    <EventInfoContent
        title={markdownRemark.frontmatter.title}
        dateTime={markdownRemark.frontmatter.dateTime}
        image={markdownRemark.frontmatter.image}
        body={markdownRemark.html}
        isMeeting={markdownRemark.frontmatter.isMeeting}
    />
)

export default EventInfo

export const query = graphql`
query eventInfoTemplate($id: String!) {
    markdownRemark(id: { eq: $id }) {
        frontmatter {
            title
            image {
                childImageSharp {
                    fluid {
                        ...GatsbyImageSharpFluid
                    }
                }
            }
            dateTime
            isMeeting
        }
        html
    }
}
`