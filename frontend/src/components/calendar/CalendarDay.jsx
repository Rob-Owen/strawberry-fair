import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

import { eventPropTypeValidator } from '../validators'
import { EventMediaBlock } from './Upcoming'

// Represents a day in the calendar. Will either be empty or contain a preview of an event.
// Later will have to add support for multiple events.
const CalendarDay = ({dateTime, events}) => {
    // TODO: Change the method of indicating it's "today", so as still to be visible when there's an event today
    const date = new Date(dateTime)  // The actual Date this CalendarDay is representing
    const today = new Date()         // Today's date
    const isTodayHighlight = areSameDay(date, today)

    // Are we showing the modal?
    const [ showModal, setShowModal ] = useState(false)

    // Image setting for revolving images
    const [ currentImage, setCurrentImage ] = useState(0)

    const modalOn = () => {
        setShowModal(true)
    }

    const modalOff = () => {
        setShowModal(false)
    }

    let internals = null

    if (events.length == 1) {
        internals = (
            <React.Fragment>
                <CalendarDayModal date={date} events={events} close={modalOff} active={showModal} />
                <div className="box button has-text-left calendar-day has-text-white has-text-weight-bold" onClick={modalOn} style={{
                        backgroundImage: `url(${events[0].frontmatter.image.childImageSharp.editedFluid.src})`}}>
                    <p>{date.toLocaleDateString('en-GB', dateDisplayFormatOptions)}</p>
                    {events.map(event => <p key={event.fields.slug}><Link className="has-text-white has-text-weight-medium" to={event.fields.slug}>{event.frontmatter.title}</Link></p>)}
                </div>
            </React.Fragment>
        )
    } else if (events.length > 1) {
        const nImages = events.length
        const imageRotateTimeMS = 4000
        //const imageFadeTimeS = 0.5

        useEffect(() => {
            setTimeout(() => {
                // Update current shown image counter
                setCurrentImage((currentImage + 1) % nImages)
            }, imageRotateTimeMS)
        })

        internals = (
            <React.Fragment>
                <CalendarDayModal date={date} events={events} close={modalOff} active={showModal} />
                <div className="box button has-text-left calendar-day has-text-white has-text-weight-bold" onClick={modalOn} style={{
                        backgroundImage: `url(${events[currentImage].frontmatter.image.childImageSharp.editedFluid.src})`}}>
                    <p>{date.toLocaleDateString('en-GB', dateDisplayFormatOptions)}</p>
                    {events.map(event => <p key={event.fields.slug}><Link className="has-text-white has-text-weight-medium" to={event.fields.slug}>{event.frontmatter.title}</Link></p>)}
                </div>
            </React.Fragment>
        )
    } else {
        internals = (
            <React.Fragment>
                <NoEventsModal date={date} close={modalOff} active={showModal} />
                <div className={"box button has-text-left calendar-day" + (isTodayHighlight ? " is-primary" : "")} onClick={modalOn}>
                    <p>{date.toLocaleDateString('en-GB', dateDisplayFormatOptions)}</p>
                </div>
            </React.Fragment>
        )
    }

    return (
        <div className="column is-half-mobile is-one-quarter-tablet is-2-desktop">
            {internals}
        </div>
    )
}

const CalendarDayModal = ({date, events, close, active}) => {
    if (events.length > 0) {
        return (
            <div className={"modal" + (active ? " is-active" : "")}>
                <div className="modal-background" onClick={close}></div>
                <div className="modal-content">
                    <div className="message">
                        <h1 className="message-header is-primary">{date.toLocaleDateString('en-GB', longDateFormatOptions)}</h1>
                        <div className="message-body">
                            {events.map(event => <EventMediaBlock key={event.fields.slug} event={event} />)}
                        </div>
                    </div>
                </div>
                <button className="modal-close is-large" aria-label="close" onClick={close}></button>
            </div>
        )
    } else {
        return null
    }
}

const NoEventsModal = ({date, close, active}) => (
    <div className={"modal" + (active ? " is-active" : "")}>
        <div className="modal-background" onClick={close}></div>
        <div className="modal-content">
            <div className="notification">
                <p>No events on {date.toLocaleDateString('en-GB', longDateFormatOptions)}.</p>
            </div>
        </div>
        <button className="modal-close is-large" aria-label="close" onClick={close}></button>
    </div>
)

const dateDisplayFormatOptions = {weekday: 'short', day: 'numeric'}
const longDateFormatOptions = {weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'}

export default CalendarDay

export function areSameDay(date1, date2) {
    const daysMatch = date1.getDate() === date2.getDate()           // Do the days (of the month) match?
    const monthsMatch = date1.getMonth() === date2.getMonth()       // Do the months match?
    const yearsMatch = date1.getFullYear() === date2.getFullYear()  // Do the years match?
    return daysMatch && monthsMatch && yearsMatch                   // Then they render to the same day
}

CalendarDay.propTypes = {
    dateTime: PropTypes.instanceOf(Date),
    events: PropTypes.arrayOf(
        eventPropTypeValidator
    )
}

CalendarDayModal.propTypes = {
    date: PropTypes.instanceOf(Date),
    events: CalendarDay.propTypes.events,
    close: PropTypes.func,
    active: PropTypes.bool
}

NoEventsModal.propTypes = {
    date: PropTypes.instanceOf(Date),
    close: PropTypes.func,
    active: PropTypes.bool
}
