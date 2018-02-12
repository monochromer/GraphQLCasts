import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import { Link } from 'react-router';

import query from '../queries/fetchSongs';
import mutation from '../mutations/deleteSong';

class SongList extends Component {
  onSongDelete(id) {
    const { deleteSong, refetch } = this.props;
    deleteSong(id).then(refetch);
  };

  renderSongs() {
    return this.props.songs.map(({ id, title }) => {
      return (
        <li key={id} className="collection-item">
          <Link to={`/songs/${id}`}>
            {title}
          </Link>
          <i
            className="material-icons"
            onClick={() => this.onSongDelete(id)}
          >
            delete
          </i>
        </li>
      );
    });
  }

  render() {
    if (this.props.loading) { return <div>Loading...</div>; }

    return (
      <div>
        <ul className="collection">
          {this.renderSongs()}
        </ul>
        <Link
          to="/songs/new"
          className="btn-floating btn-large red right"
        >
          <i className="material-icons">add</i>
        </Link>
      </div>
    );
  }
}

const mutationConfig = {
  props: (props) => ({
    deleteSong: (id) => props.mutate({ variables: { id } })
  })
};

const queryConfig = {
  props: (props) => ({
    songs: props.data.songs,
    loading: props.data.loading,
    refetch: props.data.refetch
  })
};

export default compose(
  graphql(query, queryConfig),
  graphql(mutation, mutationConfig)
)(SongList);
