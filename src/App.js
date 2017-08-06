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
    books: []
  }

  handleBookUpdate = (e, book) => {
    let toShelf = e.target.value
    console.log('Book Update', this.state.books.indexOf(book))
    if (this.state.books.indexOf(book) >= 0) {
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
    }  
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  componentWillReceiveProps(nextProps) {
    BooksAPI.getAll().then((books) => {
          this.setState({ books })
    })
  }

  render() {  
    console.log('myBooks', this.state.books)
    console.log('props', this.props )
    return (
      <div className="app">
        <Route path='/search' render={ () => (
          <SearchBooks 
            handleBookUpdate={this.handleBookUpdate} 
            myBooks={this.state.books}/>
        )}/>
        <Route exact path='/' render={() => (
          <div>
            <div className="list-books">
              <Header />
              <Bookshelf 
                handleBookUpdate={this.handleBookUpdate} 
                books={this.state.books}
              />
            </div>
            <AddBook></AddBook>
          </div>
        )}/>
      </div>
    )
  }
}
