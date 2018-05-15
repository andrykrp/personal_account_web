import React, { PureComponent } from 'react';

import styles from './ExampleComponent.pcss';

export default class ExampleComponent extends PureComponent {
    render() {
        return (
            <div className={styles.wrapper}>
                Пример компонента
            </div>
        );
    }
}
