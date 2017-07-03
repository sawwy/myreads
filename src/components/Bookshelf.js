import React, { Component } from 'react'

import { BookshelfSection } from './BookshelfSection'

const shelf = {
  CURRENTLY_READING: 'currentlyReading',
  WANT_TO_READ: 'wantToRead',
  READ: 'read'
}

export class Bookshelf extends Component {

  render() {
    const props = this.props
    const currentlyReading = props.books.filter((book) => book.shelf === shelf.CURRENTLY_READING)
    const wantToRead = props.books.filter((book) => book.shelf === shelf.WANT_TO_READ)
    const read = props.books.filter((book) => book.shelf === shelf.READ)

    return (
      <div>
        <BookshelfSection books={wantToRead} bookshelfSectionTitle={'Want to Read'} />
        <BookshelfSection books={currentlyReading} bookshelfSectionTitle={'Currently Reading'}/>
        <BookshelfSection books={read} bookshelfSectionTitle={'Read'}/>
      </div>
    )
  }
}
