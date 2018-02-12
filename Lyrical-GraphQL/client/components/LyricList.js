import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import mutation from '../mutations/likeLyric';

class LyricList extends Component {
  renderLyrics() {
    return this.props.lyrics.map(({ id, content, likes }) => {
      return (
        <li key={id} className="collection-item">
          {content}
          <div className="vote-box">
            <i
              className="material-icons"
              onClick={() => this.props.onLike(id, likes)}
            >
              thumb_up
            </i>
            {likes}
          </div>
        </li>
      );
    });
  }

  render() {
    return (
      <ul className="collection">
        {this.renderLyrics()}
      </ul>
    );
  }
}

const mutationConfig = {
  props: (props) => ({
    onLike(id, likes) {
      return props.mutate({
        variables: { id },
        optimisticResponse: {
          __typename: 'Mutation',
          likeLyric: {
            __typename: 'LyricType',
            id,
            likes: likes + 1
          }
        }
      });
    }
  })
}

export default graphql(mutation, mutationConfig)(LyricList);
