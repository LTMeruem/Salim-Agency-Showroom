import React from 'react'
import {useStaticQuery, graphql} from 'gatsby'

import Layout from '../components/Layout'
import SEO from '../components/Seo'
import {Wrapper, Image } from './templateStyles/computerStyles'
import { COLORS } from '../constants'

const ComputerTemplate = () => {
    return (
        <Layout>
            <SEO title=''/>
            <Wrapper>
                
            </Wrapper>
        </Layout>
    )
}

export default ComputerTemplate
