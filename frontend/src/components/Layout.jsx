import React from 'react'
import { Header } from './Header'
import { Footer } from './Footer'
import '../styling/styles.sass'


/* All page templates should be wrapped in the Layout component to provide common styling */

export const Layout = ({children}) => (
    <div>
        <Header className="section"/>
        <main className="section">{children}</main>
        <Footer className="section"/>
    </div>
)