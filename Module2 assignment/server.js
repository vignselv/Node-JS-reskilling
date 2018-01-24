const express = require('express') 
const logger = require('morgan')
const errorhandler = require('errorhandler')
const bodyParser = require('body-parser')
const routes = require('./routes')

let store = {
  posts: [
    {name: 'vigneshwaran',
    url: 'https://webapplog.com/es6',
    text: 'Hi,how are you?',
    comments: [
      {text:'Hi,vignesh'},
      {text: 'fine ,what about you?'}
     ]
  }
]
}


let app = express()

app.use(bodyParser.json())
app.use(logger('dev'))
app.use(errorhandler())
app.use((req, res, next) => {
  req.store = store
  next()
})
app.post('/posts', routes.posts.addPost)
app.get('/posts', routes.posts.getPosts)
app.put('/posts/:postId', routes.posts.updatePost)
app.delete('/posts/:postId', routes.posts.removePost)

app.get('/posts/:postId/comments', routes.comments.getComments)
app.post('/posts/:postId/comments', routes.comments.addComment)
app.put('/posts/:postId/comments/:commentId', routes.comments.updateComment)
app.delete('/posts/:postId/comments/:commentId', routes.comments.removeComment)


app.listen(3000)