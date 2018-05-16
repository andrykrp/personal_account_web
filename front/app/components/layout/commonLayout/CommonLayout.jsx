import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Container, Divider, Grid, Header, Image } from 'semantic-ui-react'

import styles from './CommonLayout.pcss';

export default class CommonLayout extends PureComponent {
    static propTypes = {
        children: PropTypes.node
    };

    render() {
        const { children } = this.props;

        return (
            <div className={styles.wrapper}>
                <Container>
                    <Header as='h3' dividing>UbCoin</Header>
                    <Grid verticalAlign='middle' columns={2} centered>
                        <Grid.Row>
                            <Grid.Column>
                                {children}
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            </div>
        );
    }
}
