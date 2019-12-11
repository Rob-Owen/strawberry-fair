import React, { useState } from 'react'

import PreviewCompatibleImage from '../PreviewCompatibleImage'
import OutsideClickHandler from 'react-outside-click-handler'
import { useStaticQuery, graphql, Link } from 'gatsby'

const separator = '/'
const navBarTabs = ['About Us', 'Areas & Events', 'News', 'Traders', 'Support the Fair', 'Contact']
const titleToLinkMap = {
  News: {
    link: '/news/',
    title: 'News',
    noDropdown: true,
  },
}

const NavBar = () => {
  const [menuActive, setMenuState] = useState(false)
    
  let navBarLinks = []
  try {
    const data = useStaticQuery(graphql`
      query navBarQuery {
        navBarInfo: allMarkdownRemark(filter: {fields: {slug: {regex: "$//navbar//", ne: "/navbar/"}}}) {
          edges {
            node {
              frontmatter {
                title 
                pageTitles {
                  pageTitle
                }
              }
            }
          }
        }
        allPages: allMarkdownRemark {
          edges {
            node {
              frontmatter {
                title
              }
              fields {
                slug
              }
            }
          }
        }
      }`
    )
    let pageTitleToSlugMap = {} 
    data.allPages.edges.forEach(edge => pageTitleToSlugMap[edge.node.frontmatter.title] = edge.node.fields.slug)
    data.navBarInfo.edges.forEach(edge => addSlugs(pageTitleToSlugMap, edge))
    navBarLinks = generateLinks(navBarTabs, titleToLinkMap, data.navBarInfo.edges)
  } catch (err) {
    console.error(err)
  }
  
  return (
    <header>
      <nav className="navbar is-fixed-top">
        <div className="navbar-brand">
          <Link className="navbar-item" to="/">
            <PreviewCompatibleImage imageInfo={{ alt: "Strawberry Fair Logo", image: "/img/1-line-logo.png" }} />
          </Link>
          <NavBurger target="navigationBar" active={menuActive} setState={setMenuState} />
        </div>
        {generateNavMenu(navBarLinks, menuActive)}
      </nav>
    </header>
  )
}

const addSlugs = (map, graphqlEdge) => {
  graphqlEdge.node.frontmatter.pageTitles.forEach(o => o.slug = map[getTitle(o.pageTitle)])
}

const getTitle = (pageTitle) => pageTitle.split(separator)[1]

const generateLinks = (navBarTabs, titleToLinkMap, graphqlEdges) => {
  return navBarTabs.map(tabName => {
      const associatedEdge = graphqlEdges.find(edge => edge.node.frontmatter.title === tabName)
      return associatedEdge || titleToLinkMap[tabName] || undefined
    }).filter(link => link !== undefined)
}

const generateNavMenu = (navBar, menuActive) => (
  <NavMenu active={menuActive}>
    {navBar.map(generateNavDropdown)}
  </NavMenu>
)

const generateNavDropdown = (tab, tabIndex) => {
  if(tab.noDropdown) {
    return (
      <NavTab link={tab.link} title={tab.title} key={tabIndex} />
    )
  } else {
    return (
      <NavDropdown title={tab.node.frontmatter.title} key={tabIndex}>
        {tab.node.frontmatter.pageTitles.map(generateNavItems)}
      </NavDropdown>
    )
  }
}
  

const generateNavItems = ({ pageTitle, slug }, itemIndex) => (
  <NavLink link={slug} title={getTitle(pageTitle)} key={itemIndex}/>
)

export default NavBar

const NavBurger = ({target, active, setState}) => (
  <a className={getClassName("navbar-burger burger","is-active", active)} data-target={target} onClick={() => setState(!active)}>
    <span></span>
    <span></span>
    <span></span>
  </a>
)

const getClassName = (baseName, toggleName, active) => `${baseName} ${active ? toggleName : ""}`

const NavMenu = ({children, active}) => (
  <ul id="navigationBar" className={getClassName("navbar-menu", "is-active", active)}>
    <div className="navbar-start">
      {children}
    </div>
  </ul>
)

const NavDropdown = ({title, children}) => {
  const [active, setState] = useState(false)

  return (
    <li className={getClassName("navbar-item has-dropdown", "is-active", active)}>
      <div className="dropdown">
        <div className="dropdown-trigger">
          <OutsideClickHandler onOutsideClick={() => setState(false)}>
            <button className="button" onClick={() => setState(!active)}>
              {title}
            </button>
          </OutsideClickHandler>
        </div>
        <ul className={getClassName("navbar-dropdown", "is-hidden-touch", !active)}>
          {children}
        </ul>
      </div>
    </li>
  )
}

const NavTab = ({title, link}) => {
  return (
    <li className="navbar-item has-dropdown">
      <Link to={link}>
        <button className="button" >
          {title}
        </button>
      </Link>
    </li>
  )
}

const NavLink = ({title, link}) => (
  <li className="navbar-item">
    <Link to={link} className="dropdown-item">
      {title}
    </Link>
  </li>
)
