import React from 'react'
import {useStaticQuery, graphql} from 'gatsby'

import Layout from '../components/Layout'
import SEO from '../components/Seo'
import {Wrapper, Image } from './templateStyles/computerStyles'
import { COLORS } from '../constants'

const ComputerTemplate = ({data: {wpcontent: {computer: {title, computerMeta: {behuizing, behuizingFoto, extra, geheugen, harddisks, koeling, moederbord, operatingSystem, processor, solidStateDrives, videokaart, voeding, description}, types: {edges: types}}}}}) => {
    return (
        <Layout>
            <SEO title='Computer'/>
            <Wrapper>
                <div className='computer-container'>
                    <div className='computer-image'>
                        <Image alt={behuizingFoto.altText} fluid={behuizingFoto.imageFile.childImageSharp.fluid} />
                        <div className='types'>
                            {types.map(({node: {name}}) => (
                                <div className='type'>
                                    {name}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='computer-info'>
                        <h2>{title}</h2>
                        <p className='description'>{description}</p>
                        <p className='info'>
                            <strong>Behuizing:</strong> {behuizing}
                        </p>
                        <p className='info'>
                            <strong>Processor:</strong> {processor}
                        </p>
                        <p className='info'>
                            <strong>Koeling:</strong> {koeling}
                        </p>
                        <p className='info'>
                            <strong>Moederbord:</strong> {moederbord}
                        </p>
                        <p className='info'>
                            <strong>Videokaart:</strong> {videokaart}
                        </p>
                        <p className='info'>
                            <strong>Geheugen:</strong> {geheugen}
                        </p>
                        <p className='info'>
                            <strong>Voeding:</strong> {voeding}
                        </p>
                        {solidStateDrives !== '/' &&
                        <p className='info'>
                            <strong>SSD:</strong> {solidStateDrives}
                        </p>
                        }
                        {harddisks &&
                        <p className='info'>
                            <strong>HDD:</strong> {harddisks}
                        </p>
                        }
                        <p className='info'>
                            <strong>OS:</strong> {operatingSystem}
                        </p>
                        {extra && 
                        <p className='info'>
                            <strong>Extra:</strong> {extra}
                        </p>
                        }
                    </div>
                </div>
            </Wrapper>
        </Layout>
    )
}

export default ComputerTemplate

export const pageQuery = graphql`
query ($id: ID!) {
    wpcontent {
      computer(id: $id, idType: ID) {
        types {
          edges {
            node {
              name
            }
          }
        }
        title
        computerMeta {
          behuizing
          behuizingFoto {
            altText
            sourceUrl
            imageFile {
              childImageSharp {
                fluid(quality: 100) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
          processor
          koeling
          moederbord
          videokaart
          geheugen
          voeding
          solidStateDrives
          harddisks
          operatingSystem
          extra
          description
        }
      }
    }
  }
`
