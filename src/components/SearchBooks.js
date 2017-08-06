import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../BooksAPI'

import { Book } from './Book'

export class SearchBooks extends Component {
	state ={
		searchResults: [],
		loadingBooks: true,
		query: '',
		queryTimeStamp: ''
	}

	searchBooks = (query, maxResults, myBooks) => {
		if (!query) {
			return (
				this.setState({
					searchResults: [],
					loadingBooks: false 
				})
			)
		}	
		BooksAPI.search(query, maxResults).then(searchResults => {
			if (searchResults.error) {
				this.setState({
					searchResults: [],
					loadingBooks: false 
				})	
			} else {
				this.setState({ 
					searchResults: searchResults.map(b => {
							let index = myBooks.findIndex(myBook => myBook.id === b.id)
							if (index >= 0) {
								b.shelf = myBooks[index].shelf
								return b
							} else {
								b.shelf = 'none'
								return b
							}
					}), loadingBooks: false
				})
			}
		})
	}

	updateQuery = (query, maxResults, myBooks) => {   
    this.setState({ 
      query: query.trim()
    })
	  if (query.length > 0) {
	    	this.searchBooks(query, maxResults, myBooks)	
	  } else {
	  	this.setState({
	  		searchResults: []
	  	})
	  }
  }

	render() {
		const { handleBookUpdate, myBooks } = this.props
		let showingBooks
    const maxResults = 20
    showingBooks = this.state.searchResults

		return (
			<div>
				<div className="search-books">
				  <div className="search-books-bar">
				    <Link to='/' className="close-search">Close</Link>
				    <div className="search-books-input-wrapper">
				      <input
				        type="text"
				        placeholder="Search by title or author"
				        value={this.state.query}
				        onChange={(event) => (
				          this.updateQuery(event.target.value, maxResults, myBooks)
				        )} 
				      />
				    </div>
				  </div>
				</div>
				<div className="search-books-results">
				  <ol className="books-grid">
				    {this.state.query && this.state.loadingBooks ? <p>Loading</p> : showingBooks.map( book => <Book handleBookUpdate={handleBookUpdate} book={book} key={book.id} />)}
				  </ol>
				</div>
      </div>
		)
	}
}

