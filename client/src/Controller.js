import React, { Component } from 'react';
import Viz from './Viz'
import VizNoHooks from './VizNoHooks';
import { bookStr } from './data/heart_of_darkness';

export default class Controller extends Component {
  state = {
    selectedBook: 'heartOfDarkness',
    currentData: null
	}

  componentDidMount = async () => {
    const bodyToSend = JSON.stringify({"text": bookStr});
    await fetch('/total_letter_count', {
      method: 'POST', 
      body: bodyToSend,
      headers:{'content-type': 'application/json'}
    }).then(data =>
      data.json())
    .then(jsonData => {
      console.log(jsonData);
      this.setState({currentData: jsonData});
    })
  }

  render() {
    return(
      <div className="controller">
      {this.state.currentData ? <VizNoHooks data={this.state.currentData} /> : <></>}
      </div>

    )
  }
}
// { this.state.toDraw.length ? <Viz data={bookStr}/> : null}
