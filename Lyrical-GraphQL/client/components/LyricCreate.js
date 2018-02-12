import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import mutation from '../mutations/addLyricToSong';

class LyricCreate extends Component {
  constructor(props) {
    super(props);
    this.state = { content: '' };
  }

  onSubmit(event) {
    event.preventDefault();
    const { songId } = this.props;
    const { content } = this.state;
    this.props.addLyricToSong(songId, content)
      .then(() => this.setState({ content: '' }));
  }

  render() {
    return (
      <form onSubmit={this.onSubmit.bind(this)}>
        <label>Add a Lyric</label>
        <input
          value={this.state.content}
          onChange={event => this.setState({ content: event.target.value })}
        />
      </form>
    );
  }
}

const mutationConfig = {
  props: (props) => ({
    addLyricToSong: (songId, content) => props.mutate({
      variables: {
        content,
        songId
      }
    })
  })
}

export default graphql(mutation, mutationConfig)(LyricCreate);
