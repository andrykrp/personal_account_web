import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { I18n, translate } from 'react-i18next';
import { Button, Checkbox, Form } from 'semantic-ui-react'

class LoginForm extends PureComponent {
    static propTypes = {
        onSubmit: PropTypes.func
    };

    state = {
        login: '',
        password: ''
    };

    handleChange = (e, { name, value }) => this.setState({ [name]: value });

    handleSubmit = () => {
        const { login, password } = this.state;

        this.props.onSubmit(login, password);
    };

    render(){
        const { login, password } = this.state;

        return (
            <I18n ns="translations">
                {
                    (t) => (
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Field>
                                <label>Login</label>
                                <Form.Input placeholder='Login' name='login' value={login} onChange={this.handleChange} />
                            </Form.Field>
                            <Form.Field>
                                <label>Password</label>
                                <Form.Input placeholder='Password' name='password' value={password} onChange={this.handleChange}/>
                            </Form.Field>
                            <Button type='submit'>Login</Button>
                        </Form>
                    )
                }
            </I18n>
        )
    }
}

export default LoginForm;