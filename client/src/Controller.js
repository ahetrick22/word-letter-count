import React, { Component } from 'react';
import LetterCountViz from './LetterCountViz';

export default class Controller extends Component {
  state = {
    currentData: null
	}

  componentDidMount = async () => {
    let bookText = '';
    await fetch(`/fulltext/${this.props.match.params.id}`)
      .then(res => res.json())
      .then(data => bookText = data[0].text);

    const bodyToSend = await JSON.stringify({"text": bookText});
    await fetch('/total_letter_count', {
      method: 'POST', 
      body: bodyToSend,
      headers:{'content-type': 'application/json'}
    }).then(data =>
      data.json())
    .then(jsonData => {
      this.setState({currentData: jsonData});
    })
  }

  render() {
    return(
      <div className="controller">
      {this.state.currentData ? <LetterCountViz data={this.state.currentData} /> : <></>}
      </div>

    )
  }
}