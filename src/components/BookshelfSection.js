import React, { Component } from 'react'

import { Book } from './Book'

export class BookshelfSection extends Component {
  render() {
    let bookshelfSectionTitle = this.props.bookshelfSectionTitle
    const { books, handleBookUpdate } = this.props

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{bookshelfSectionTitle}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map( book => <Book handleBookUpdate={handleBookUpdate} book={book} key={book.id} />)}
          </ol>
        </div>
      </div>
    )
  }
}
