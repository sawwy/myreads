import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export class AddBook extends Component {
  render () {
    return (
      <div className="open-search">
        <Link to='/search'>Add a book</Link>
      </div>
    )
  }
}
