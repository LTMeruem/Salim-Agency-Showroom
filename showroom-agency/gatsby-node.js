const { createRemoteFileNode } = require(`gatsby-source-filesystem`)
const { graphql } = require("gatsby")
const path = require("path")

exports.createPages = ({graphql, actions}) => {
  const {createPage} = actions;
  return graphql(`
  {
    wpcontent {
      computers {
        edges {
          node {
            slug
            id
          }
        }
      }
    }
  }
  `).then(res => {
    if(res.errors){
      res.errors.forEach(e => console.error(e.toString()));
      return Promise.reject(res.errors);
    }
    const computers = res.data.wpcontent.computers.edges;
    computers.forEach(computer => {
      const {id, slug} = computer.node;
      createPage({
        path: `/computers/${slug}`,
        component: path.resolve(`src/templates/computer.js`),
        context: {
          id,
          slug
        }
      })
    })
  })
}

/* Aan de hand van dit stukje code worden de images vanuit WPgraphql omgezet tot images waarop Gatsby image optimization kan toepassen */
exports.createResolvers = async ({
  actions,
  cache,
  createNodeId,
  createResolvers,
  store,
  reporter,
}) => {
  const { createNode } = actions

  await createResolvers({
    WPGraphql_MediaItem: {
      imageFile: {
        type: "File",
        async resolve(source) {
          let sourceUrl = source.sourceUrl

          if (source.mediaItemUrl !== undefined) {
            sourceUrl = source.mediaItemUrl
          }

          return await createRemoteFileNode({
            url: encodeURI(sourceUrl),
            store,
            cache,
            createNode,
            createNodeId,
            reporter,
          })
        },
      },
    },
  })
}