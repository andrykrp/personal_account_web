import React, { PureComponent } from 'react';
import { I18n } from 'react-i18next';

export default function Translate() {
    return function(Child) {
        return class extends PureComponent {
            render() {
                return (

                    <I18n ns='translations'>
                        {
                            (translate) => (
                                <Child
                                    {...this.props}
                                    translate={translate}
                                />
                            )}
                    </I18n>
                );
            }
        };
    };
};
