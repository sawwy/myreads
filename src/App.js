import React from 'react'
import { Route } from 'react-router-dom'

import './App.css'
import * as BooksAPI from './BooksAPI'
import { Bookshelf } from './components/Bookshelf'
import { AddBook } from './components/AddBook'
import { SearchBooks } from './components/SearchBooks'
import { Header } from './components/Header'

export default class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books: []
  }

  handleBookUpdate = (e, book) => {
    let toShelf = e.target.value
    if (this.state.books.indexOf(book)) {
      BooksAPI.update(book, toShelf)
      .then(this.setState((state) => ({
        books: state.books.map(b => {
          if (b.title === book.title) {
            b.shelf = toShelf
            return b
          } else {
            return b
          }
        })
      })))
    } 
    else {
      BooksAPI.update(book, toShelf)
        .then(this.setState((state) => ({
          books: state.books.concat(book)
        })))
        .then(this.forceUpdate())
      }  
    }

  componentWillReceiveProps(nextProps) {
    console.log('nextProps', nextProps)
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })


  }

  render() {  
    console.log('myBooks', this.state.books)
    this.state.books && console.log('firstBook', this.state.books[6])
    
    return (
      <div className="app">
        <Route path='/search' render={ ({history}) => (
          <SearchBooks history={history} handleBookUpdate={this.handleBookUpdate} myBooks={this.state.books}/>
        )} />
        <Route exact path='/' render={() => (
          <div className="list-books">
            <Header />
            <Bookshelf 
              handleBookUpdate={this.handleBookUpdate} 
              books={this.state.books}
            />
          </div>
        )} />
        <Route exact path='/' render={() => (<AddBook></AddBook>)} />
      </div>
    )
  }
}
