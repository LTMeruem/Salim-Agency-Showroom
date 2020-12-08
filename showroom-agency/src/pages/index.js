import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Layout from "../components/Layout"
import SEO from "../components/Seo"
import {Wrapper, Image, BottomEdgeDown, Computer } from './pageStyles/pageStyles'
import { COLORS } from '../constants'

const IndexPage = () => {
  const {wpcontent: {page: {homeMeta: {title, kleineBeschrijving, featuredProducts, bannerFoto}}}} = useStaticQuery(graphql`
    query{
      wpcontent {
        page(id: "Home Page", idType: URI) {
          homeMeta {
            title
            kleineBeschrijving
            featuredProducts {
              ... on WPGraphql_Computer {
                id
                title
                slug
                computerMeta {
                  behuizingFoto {
                    altText
                    sourceUrl
                    imageFile {
                      childImageSharp {
                        fluid(quality: 100){
                          ...GatsbyImageSharpFluid_withWebp
                        }
                      }
                    }
                  }
                }
              }
            }
            bannerFoto {
              altText
              sourceUrl
              imageFile {
                childImageSharp {
                  fluid(quality: 100){
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
            }
          }
        }
      }
    }
  `)
  return(
    <Layout>
      <SEO title="Home" />
      <Wrapper>
        <div className='banner'>
          <Image alt={bannerFoto.altText} fluid={bannerFoto.imageFile.childImageSharp.fluid} />
          <div className="inner-div">
            <p className="header-title">{title}</p>
            <p className="header-description">{kleineBeschrijving}</p>
          </div>
          <BottomEdgeDown color={COLORS.BLACK}/>
        </div>
        <div className="computers">
          <h2>Featured Computers</h2>
          <div className="computer-items">
            {featuredProducts.map(({title, slug, computerMeta}) => (
              <Computer key={title} to={`/computers/${slug}`}>
                <Image fluid={computerMeta.behuizingFoto.imageFile.childImageSharp.fluid} alt={computerMeta.behuizingFoto.altText} />
                <div className="computer-info">
                  <p>{title}</p>
                </div>
              </Computer>
            ))}
          </div>
        </div>
      </Wrapper>
    </Layout>
  )
}

export default IndexPage
