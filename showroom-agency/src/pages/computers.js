import React from 'react'
import {useStaticQuery, graphql} from 'gatsby'

import Layout from '../components/Layout'
import SEO from '../components/Seo'
import {Wrapper, Image, BottomEdgeDown, Computer, BottomEdgeUp } from '../pageStyles/pageStyles'
import { COLORS } from '../constants'

const Computers = () => {
    const {wpcontent: {computers: {edges: computers}, page: {computersmeta: {bannerFoto, kleineBeschrijving}}}} = useStaticQuery(graphql`
    query {
        wpcontent {
          page(id: "Computers", idType: URI) {
            computersmeta {
              kleineBeschrijving
              bannerFoto {
                altText
                sourceUrl
                imageFile {
                  childImageSharp {
                    fluid(quality: 75){
                        ...GatsbyImageSharpFluid_withWebp
                    }
                  }
                }
              }
            }
          }
          computers {
            edges {
              node {
                slug
                title
                computerMeta {
                    behuizingFoto {
                      altText
                      sourceUrl
                      imageFile {
                        childImageSharp {
                          fluid(quality: 50){
                            ...GatsbyImageSharpFluid_withWebp
                          }
                        }
                      }
                    }
                  }
              }
            }
          }
        }
      }
    `)
    return (
        <Layout>
            <SEO title='Computers'/>
            <Wrapper computersColor={COLORS.BLACK} descriptionColor={COLORS.SECONDARY}>
                <div className='banner'>
                    <Image alt={bannerFoto.altText} fluid={bannerFoto.imageFile.childImageSharp.fluid}/>
                    <BottomEdgeDown color={COLORS.BLACK}/>
                </div>
                <div className='description'>
                    <h2>Equilibrium, pinnacle of technologie</h2>
                    <p>{kleineBeschrijving}</p>
                    <BottomEdgeUp color={COLORS.BLACK}/>
                </div>
                <div className='computers'>
                    <h2>Our Products</h2>
                    <div className="computer-items">
                        {computers.map(({node: {computerMeta: {behuizingFoto}, slug, title}}) => (
                            <Computer to={`/computers/${slug}`}>
                                <Image alt={behuizingFoto.altText} fluid={behuizingFoto.imageFile.childImageSharp.fluid} />
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

export default Computers
