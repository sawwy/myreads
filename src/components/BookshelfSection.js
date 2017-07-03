import React, { Component } from 'react'

import { Book } from './Book'

export class BookshelfSection extends Component {
  render() {
    let bookshelfSectionTitle = this.props.bookshelfSectionTitle
    const books = this.props.books

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{bookshelfSectionTitle}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map( book => <Book book={book} key={book.industryIdentifiers[0].identifier} />)}
          </ol>
        </div>
      </div>
    )
  }
}
