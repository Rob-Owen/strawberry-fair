import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

import { FaCalendar, FaListUl } from 'react-icons/fa'

export const CalendarViewToggle = ({view}) => (
    <React.Fragment>
        {['is-hidden-touch', 'is-hidden-desktop is-centered'].map(modifier => (
            <div className={`tabs is-boxed ${modifier}`} key={modifier}>
                <ul>
                    <li className={view == 'calendar' ? 'is-active' : ''}>
                        <Link to="/calendar">
                            <span className="icon is-small"><FaCalendar /></span><h1>Calendar</h1>
                        </Link>
                    </li>
                    <li className={view == 'upcoming' ? 'is-active' : ''}>
                        <Link to="/events">
                            <span className="icon is-small"><FaListUl /></span><h1>Events list</h1>
                        </Link>
                    </li>
                </ul>
            </div>
        ))}
    </React.Fragment>
)

CalendarViewToggle.propTypes = {
    view: PropTypes.oneOf(['calendar', 'upcoming'])
}
