import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import { graphql, compose } from 'react-apollo';

import AuthForm from './AuthForm';
import query from '../queries/CurrentUser';
import mutation from '../mutations/Login';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = { errors: [] };
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillUpdate(nextProps) {
    // this.props // the old, current set of props
    // nextProps // the next set of props that will be in place
    // when the component rerenders
    if (!this.props.data.user && nextProps.data.user) {
      // redirect to dashboard!!!!
      hashHistory.push('/dashboard');
    }
  }

  onSubmit({ email, password }) {
    this.props.onLogin(email, password)
      .catch(res => {
        const errors = res.graphQLErrors.map(error => error.message);
        this.setState({ errors });
      });
  }

  render() {
    return (
      <div>
        <h3>Login</h3>
        <AuthForm
          errors={this.state.errors}
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}

const mutationConfig = {
  props: (props) => ({
    onLogin(email, password) {
      return props.mutate({
        variables: { email, password },
        refetchQueries: [{ query }]
      });
    }
  })
};

export default compose(
  graphql(query),
  graphql(mutation, mutationConfig)
)(LoginForm)
