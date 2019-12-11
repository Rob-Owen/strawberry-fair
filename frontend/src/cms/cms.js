import CMS from 'netlify-cms-app'

import '../styling/styles.scss'
import { HomePage } from '../templates/home-page'
import { NewsOverview } from '../templates/news-overview'
import { preview } from '../util/templating'
import { NewsArticle } from '../templates/news-article'
import { EventInfo } from '../templates/event-info'
import { AboutPage } from '../templates/about-page'
import { UpcomingEvents } from '../templates/upcoming-events'

const placeholderArticle = {
    node: {
      fields: {
        slug: '/'
      },
      frontmatter: {
        image: {
          image: '/img/strawberry.jpg'
        },
        title: 'Placeholder'
      }
    }
}

const placeholderArticles = new Array(3).fill(placeholderArticle)

const placeholderEvent = {
  node: {
    frontmatter: {
      title: 'Event',
      image: {
        image: '/img/strawberry.jpg'
      },
      dateTime: new Date(),
      eventTypes: []
    },
    html: '<h2>This is a sample event.</h2>\n<p>This is a sample event.</p>'
  }
}

const placeholderEvents = new Array(3).fill(placeholderEvent)

const homePageAdditionalPropsExtractor = (dataProps, { widgetsFor }) => {
  const contentBlocksMarkdown = widgetsFor('contentBlocks')
    .map(blk => blk.getIn(['widgets', '_markdown_contentBody']))
    .toObject()

  return { 
    contentBlocksHtml: contentBlocksMarkdown,
  }
}

CMS.registerPreviewTemplate('home', preview(HomePage, {newsArticles: placeholderArticles}, homePageAdditionalPropsExtractor))
CMS.registerPreviewTemplate('about', preview(AboutPage))
CMS.registerPreviewTemplate('events', preview(EventInfo))
CMS.registerPreviewTemplate('news', preview(NewsArticle))
CMS.registerPreviewTemplate('news-home', preview(NewsOverview, {newsArticles: placeholderArticles}))
CMS.registerPreviewTemplate('upcoming-events', preview(UpcomingEvents, {events: placeholderEvents}))
