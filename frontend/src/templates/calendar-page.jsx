import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import { site } from '../util/templating'
import { Calendar } from '../components/calendar/Calendar'
import { CalendarViewToggle } from '../components/calendar/CalendarViewToggle'
import { eventPropTypeValidator } from '../components/validators'

export const CalendarPage = ({events}) => {
  return (
    <section>
      <CalendarViewToggle view='calendar' />
      <Calendar events={events} />
    </section>
  )
}

CalendarPage.propTypes = {
  content: PropTypes.node,
  contentComponent: PropTypes.elementType,
  events: PropTypes.arrayOf(
      PropTypes.shape({
          node: eventPropTypeValidator
      })
  )
}

const extractor = data => ({events: data.allMarkdownRemark.edges, tabTitle: "Calendar"})

export default site(CalendarPage, { additionalPropsExtractor: extractor, isWide: true })

export const query = graphql`
query calendarPageTemplate($id: String!) {
  markdownRemark(id: { eq: $id }) {
    html
  }
  allMarkdownRemark(filter: {frontmatter: {templateKey: {eq: "event-info"}}}, sort: {fields: frontmatter___dateTimeRange___startDateTime, order: ASC}) {
    edges {
      node {
        ...EventFragment
      }
    }
  }
  heroData: allMarkdownRemark(filter: {id: {eq: $id}}) {
    ...HeroFragment
  }
}
`
