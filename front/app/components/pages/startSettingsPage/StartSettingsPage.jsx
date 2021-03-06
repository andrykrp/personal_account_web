import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { contains, append, without, pipe, filter, map, join, isEmpty, equals } from 'ramda';

import Switch from '../../ui/common/switch/Switch';
import Checkbox from '../../ui/common/checkbox/Checkbox';
import ArrowInput from '../../ui/common/arrowInput/ArrowInput';
import Modal from '../../ui/common/modal/Modal';
import Header from '../../ui/common/header/Header';
import HeaderWithSearch from '../../ui/common/headerWithSearch/HeaderWithSearch';
import ListWithCheckbox from '../../ui/common/listWithCheckbox/ListWithCheckbox';

import redirect from '../../../actions/redirect';
import getListCurrencies from '../../../actions/getListCurrencies';
import findGeoLocation from '../../../actions/findGeoLocation';
import Translate from '../../decorators/Translate';

import { mapIndex, isNotEmpty } from '../../../utils/lomda';

import styles from './StartSettingsPage.pcss';

@Translate()
class StartSettingsPage extends PureComponent {
    state = {
        geoLocationOn: false,
        twoFactorAuth: false,
        showModalCurrency: false,
        selectCurrencies: [],
        checkSms: false,
        showModalGeoLocation: false,
        searchString: '',
        searchStringCurrencies: '',
        searchResultGeoLocation: [],
        selectGeoLocation: {},
        searchResultCurrencies: this.props.listCurrencies
    };

    static defaultProps = {
        listCurrencies: []
    };

    componentDidMount() {
        const { listCurrencies, actions } = this.props;

        if (isEmpty(listCurrencies)) {
            actions.getListCurrencies().then(() => {
                this.setState({
                    searchResultCurrencies: this.props.listCurrencies
                });
            });
        }
    };

    handleRedirectToBack = () => {
        window.history.back();
    };

    handleClickSwitchGeoLocation = () => {
        this.setState({
            geoLocationOn: !this.state.geoLocationOn
        }, () => {
            if (!this.state.geoLocationOn) {
                this.setState({
                    selectGeoLocation: {}
                });
            }
        });
    };

    handleClickSwitchTwoFactorAuth = () => {
        this.setState({
            twoFactorAuth: !this.state.twoFactorAuth,
            checkSms: !this.state.twoFactorAuth
        });
    };

    handleClickCheckbox = () => {
        this.setState({
            twoFactorAuth: !this.state.twoFactorAuth
        });
    };

    handleCloseModalCurrency = () => {
        this.setState({
            showModalCurrency: false
        });
    };

    handleOpenModalCurrency = () => {
        this.setState({
            showModalCurrency: true
        });
    };

    handleClickRowCurrency = (id) => {
        const { selectCurrencies } = this.state;

        this.setState({
            selectCurrencies: contains(id, selectCurrencies)
                ? without([id], selectCurrencies)
                : append(id, selectCurrencies)
        });
    };

    handleClickGeoLocation = () => {
        this.setState({
            showModalGeoLocation: true
        });
    };

    handleCloseGeoLocationModal = () => {
        this.setState({
            showModalGeoLocation: false,
            searchString: '',
            searchResultGeoLocation: []
        });
    };

    handleChangeSearch = value => {
        this.setState({
            searchString: value
        }, () => {
            if (this.state.searchString.length > 3) {
                this.props.actions.findGeoLocation(this.state.searchString).then(response => {
                    this.setState({
                        searchResultGeoLocation: response.data
                    });
                });
            }
        });
    };

    handleSelectGeoLocation = (item) => {
        this.setState({
            selectGeoLocation: item
        });
    };

    handleSearchTextChange = value => {
        const
            { searchStringCurrencies } = this.state,
            {listCurrencies} = this.props;

        let prevLength = searchStringCurrencies.length;

        this.setState({
            searchStringCurrencies: value
        }, () => {
            if (this.state.searchStringCurrencies.length >= 3 ) {
                this.setState({
                    searchResultCurrencies: filter((item) => item.name.toString().indexOf(this.state.searchStringCurrencies) !== -1, listCurrencies)
                });
            } else if (this.state.searchStringCurrencies.length < 3 && prevLength >= 3){
                this.setState({
                    searchResultCurrencies: listCurrencies
                });
            }
        });
    };

    render() {
        const
            { listCurrencies, translate: t } = this.props,
            { geoLocationOn, twoFactorAuth, showModalCurrency, selectCurrencies, checkSms, showModalGeoLocation, searchString, searchResultGeoLocation, selectGeoLocation, searchStringCurrencies, searchResultCurrencies } = this.state;

        let stringCurrencies = pipe(
            filter(({ id }) => contains(id, selectCurrencies)),
            map(({ name, character }) => `${name} (${character})`),
            join(', ')
        )(listCurrencies);

        return (

            <div className={styles.wrapper}>
                <Header buttonClick={this.handleRedirectToBack} title={t('startSettingsPage.title')}
                        typeButton='back' />

                <div className={styles.content}>

                    <div className={styles.settingColumn}>
                        {
                            selectCurrencies.length > 0 && (
                                <span className={styles.label}>
                                                {t('startSettingsPage.settingThree.title')}
                                            </span>
                            )
                        }
                        <ArrowInput
                            label={selectCurrencies.length > 0 ? stringCurrencies : t('startSettingsPage.settingThree.title')}
                            onClick={this.handleOpenModalCurrency} />
                        <div className={styles.settingDesc}>{t('startSettingsPage.settingThree.desc')}</div>
                       {/* <div className={styles.wrapperCurrency}>
                            <div className={styles.currency}>UBC</div>
                            <div className={styles.currency}>ETH</div>
                            <div className={styles.currency}>$</div>
                        </div>*/}
                    </div>
                    <div className={styles.settingColumn}>
                        <div className={styles.settingRow}>
                            <div className={styles.settingContent}>
                                <div
                                    className={styles.settingTitle}>{t('startSettingsPage.settingOne.title')}</div>
                                <div
                                    className={styles.settingDesc}>{t('startSettingsPage.settingOne.desc')}</div>
                            </div>
                            <Switch value={geoLocationOn} onClick={this.handleClickSwitchGeoLocation} />
                        </div>
                        <ArrowInput
                            label={isNotEmpty(selectGeoLocation) ? selectGeoLocation.text : t('startSettingsPage.settingOne.locationUndefined')}
                            onClick={this.handleClickGeoLocation}
                            grey={!isNotEmpty(selectGeoLocation)}
                        />

                    </div>

                    <div className={styles.settingRow}>
                        <div className={styles.settingContent}>
                            <div
                                className={styles.settingTitle}>{t('startSettingsPage.settingTwo.title')}</div>
                            <div
                                className={styles.settingDesc}>{t('startSettingsPage.settingTwo.desc')}</div>

                        </div>
                        <Switch value={twoFactorAuth} onClick={this.handleClickSwitchTwoFactorAuth} />
                    </div>
                    {
                        twoFactorAuth && (
                            <Checkbox label={t('startSettingsPage.settingTwo.withSMS')} value={checkSms}
                                      onClick={this.handleClickCheckbox} />)
                    }
                </div>
                {
                    showModalCurrency && (
                        <Modal>
                            <HeaderWithSearch searchValue={searchStringCurrencies}
                                              onChangeSearchValue={this.handleSearchTextChange}
                                              buttonClick={this.handleCloseModalCurrency}
                                              typeButton='back'
                            />
                            {/*<Header title='Выберите валюты' buttonClick={this.handleCloseModalCurrency} typeButton='back'/>*/}
                            <ListWithCheckbox
                                title='Список валют'
                                list={searchResultCurrencies}
                                maxSelect={3}
                                selectArray={selectCurrencies}
                                onClickRow={this.handleClickRowCurrency}
                            />
                        </Modal>
                    )
                }
                {
                    showModalGeoLocation && (
                        <Modal>
                            <HeaderWithSearch searchValue={searchString}
                                              onChangeSearchValue={this.handleChangeSearch}
                                              buttonClick={this.handleCloseGeoLocationModal}
                                              typeButton='back'
                            />
                            <div className={styles.wrapperModal}>
                                {
                                    searchResultGeoLocation.length > 0 && mapIndex((item, index) => {
                                        return (
                                            <div key={index}
                                                 className={equals(selectGeoLocation, item) ? styles.selectedRow : styles.resultRow}
                                                 onClick={() => this.handleSelectGeoLocation(item)}>
                                                {item.text}
                                            </div>
                                        );
                                    }, searchResultGeoLocation)
                                }
                                {
                                    searchResultGeoLocation.length === 0 && searchString.length === 0 && (
                                        <div className={styles.wrapperSearchContentEmpty}>
                                            {t('settings.descriptionSearchLocation')}
                                        </div>
                                    )
                                }
                                {
                                    searchResultGeoLocation.length === 0 && searchString.length !== 0 && (
                                        <div className={styles.wrapperSearchContentEmpty}>
                                            {t('settings.notFound')}
                                        </div>
                                    )
                                }
                            </div>
                        </Modal>
                    )
                }
            </div>
        );
    }
}

function mapStateToProps(state, props) {
    const { currencies: { listCurrencies } } = state;

    return {
        listCurrencies
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            redirect,
            getListCurrencies,
            findGeoLocation
        }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(StartSettingsPage);
