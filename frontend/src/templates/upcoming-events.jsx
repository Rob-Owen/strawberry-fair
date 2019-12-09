import React from 'react'
import { graphql, Link } from 'gatsby'

import { site } from '../util/templating'
import { Layout } from '../components/Layout'
import { Upcoming } from '../components/calendar/Upcoming'
import { CalendarViewToggle } from '../components/calendar/CalendarViewToggle'

export const UpcomingEvents = ({events}) => (
  <Layout>
    <section>
      <CalendarViewToggle view='upcoming' />
      <Upcoming events={events} />
    </section>
  </Layout>
)

export default site(UpcomingEvents, data => {return {events: data.allMarkdownRemark.edges}})

export const query = graphql`
query upcomingEventsTemplate($id: String!) {
  markdownRemark(id: { eq: $id }) {
    frontmatter {
      title
    }
  }
  allMarkdownRemark(filter: {fields: {slug: {regex: "$//events//", ne: "/events/"}}}, sort: {fields: frontmatter___dateTime, order: ASC}) {
    edges {
      node {
        frontmatter {
          title
          image {
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid
              }
              resize(width: 64, height: 64) {
                src
              }
            }
          }
          dateTime
          isMeeting
        }
        html
        fields {
          slug
        }
      }
    }
  }
}
`