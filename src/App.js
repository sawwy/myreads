import React from 'react'
import { Route, Link } from 'react-router-dom'

import './App.css'
import * as BooksAPI from './BooksAPI'
import { Bookshelf } from './components/Bookshelf'
import { AddBook } from './components/AddBook'
import { Book } from './components/Book'

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

    BooksAPI.update(book, toShelf)
    .then(
      this.setState((state) => ({
        books: state.books.map(b => {
          if (b.title === book.title) {
            b.shelf = toShelf
            return b
          } else {
            return b
          }
        })
      }))
    )
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  render() {
    return (
      <div className="app">
        <Route path='/search' render={ ({history}) => (
          <div>
            <div className="search-books">
              <div className="search-books-bar">
                <Link to='/' className="close-search">Close</Link>
                <div className="search-books-input-wrapper">
                  <input type="text" placeholder="Search by title or author"/>
                </div>
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                {this.state.books.map( book => <Book history={history} update={this.handleBookUpdate} book={book} key={book.industryIdentifiers[0].identifier} />)}
              </ol>
            </div>
          </div>
        )} />
        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <Bookshelf update={this.handleBookUpdate} books={this.state.books}/>
            </div>
          </div>
        )} />
        <Route exact path='/' render={() => (<AddBook></AddBook>)} />
      </div>
    )
  }
}
