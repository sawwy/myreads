import React, { Component } from 'react'

import { BookshelfSection } from './BookshelfSection'

const shelf = {
  CURRENTLY_READING: 'currentlyReading',
  WANT_TO_READ: 'wantToRead',
  READ: 'read'
}

export class Bookshelf extends Component {

  render() {
    const { books, handleBookUpdate } = this.props
    const currentlyReading = books.filter((book) => book.shelf === shelf.CURRENTLY_READING)
    const wantToRead = books.filter((book) => book.shelf === shelf.WANT_TO_READ)
    const read = books.filter((book) => book.shelf === shelf.READ)

    return (
      <div className="list-books-content">
        <BookshelfSection handleBookUpdate={handleBookUpdate} books={wantToRead} bookshelfSectionTitle={'Want to Read'} />
        <BookshelfSection handleBookUpdate={handleBookUpdate} books={currentlyReading} bookshelfSectionTitle={'Currently Reading'}/>
        <BookshelfSection handleBookUpdate={handleBookUpdate} books={read} bookshelfSectionTitle={'Read'}/>
      </div>
    )
  }
}
