import React, { useState } from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

export default () => {
  const [index, setIndex] = useState(0)
  const { allFile } = useStaticQuery(
    graphql`
      query {
        allFile(filter: {relativeDirectory: {eq: "images"}, extension: {eq: "jpg"} }) {
          edges {
            node {
              id
              name
              childImageSharp {
                fluid(maxWidth: 600) {
                  ...GatsbyImageSharpFluid_withWebp_tracedSVG
                }
              }
            }
          }
        }
      }
    `
  )
  const length = allFile.edges.length - 1
  const handleNext = () => index === length ? setIndex(0) : setIndex(index + 1)
  const handlePrevious = () => index === 0 ? setIndex(length) : setIndex(index - 1)
  const { node } = allFile.edges[index]
  return (
    <div>
      <h2>World Tour!</h2>
      <div>
        <Img
          fluid={node.childImageSharp.fluid}
          key={node.id}
          alt=""
        />
      </div>
      <div>
        <button onClick={() => handlePrevious()}>&#x21A9;</button>
        <button onClick={() => handleNext()}>&#x21AA;</button>
      </div>
    </div>

  )
}

// Based on Jordan Jones' <Slideshow> component at https://github.com/Pr0x1m4/gatsby-slide-example/blob/master/src/components/slideshow.js (my own query though :) )
