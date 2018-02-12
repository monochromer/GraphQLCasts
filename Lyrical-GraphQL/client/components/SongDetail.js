import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';

import fetchSong from '../queries/fetchSong';
import LyricCreate from './LyricCreate';
import LyricList from './LyricList';

class SongDetail extends Component {
  render() {
    const {
      song,
      params: { id }
    } = this.props;

    if (!song) { return <div>Loading...</div>; }

    return (
      <div>
        <Link to="/">Back</Link>
        <h3>{song.title}</h3>
        <LyricList lyrics={song.lyrics} />
        <LyricCreate songId={id} />
      </div>
    );
  }
}

const queryConfig = {
  options: (props) => ({
    variables: {
      id: props.params.id
    }
  }),
  props: (props) => ({
    song: props.data.song
  })
};

export default graphql(fetchSong, queryConfig)(SongDetail);
