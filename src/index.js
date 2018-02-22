const { GraphQLServer } = require('graphql-yoga')
const fetch = require('node-fetch')

const baseURL = `https://rest-demo-hyxkwbnhaz.now.sh`

const resolvers = {
  Query: {
    users: () => {
      return fetch(`${baseURL}/users`).then(res => res.json())
    },
    user: (parent, args) => {
      const { id } = args
      return fetch(`${baseURL}/users/${id}`).then(res => res.json())
    },
    posts: () => {
      return fetch(`${baseURL}/posts`).then(res => res.json())
    },
    post: (parent, args) => {
      const { id } = args
      return fetch(`${baseURL}/posts/${id}`).then(res => res.json())
    },
  },
  Post: {
    author: parent => {
      const { id } = parent
      return fetch(`${baseURL}/posts/${id}/user`).then(res => res.json())
    }
  },
  User: {
    posts: parent => {
      const { id } = parent
      return fetch(`${baseURL}/users/${id}/posts`).then(res => res.json())
    }
  }
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
})

server.start(() => console.log(`Server is running on http://localhost:4000`))
