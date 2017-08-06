import React, { Component } from 'react'

export class Book extends Component {
  
  render() {
    const { book, handleBookUpdate } = this.props
    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
          <div className="book-shelf-changer">
            <select defaultValue={book.shelf} onChange={(e) => {
                handleBookUpdate(e, book)}}>
              <option value="none" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        {book.authors && book.authors.map((a) => <div className="book-authors" key={a.length + Math.random()}>{a}</div>)}
      </div>
    )
  }
}
