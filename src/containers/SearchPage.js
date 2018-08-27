import React, { Component } from 'react';
import { Grid, Row, FormControl, FormGroup, Checkbox } from 'react-bootstrap';
import axios from "axios";
import { PropTypes } from 'prop-types';
import { ImagesTable } from '../components/ImagesTable.js';
import { connect } from 'react-redux';
import { createSearchImagesStartAction, createSearchImagesSuccessAction, createSearchImagesFailureAction } from '../actions/actions.js';
// import getImages from '../rest/restImages.js'
const message = {
    token: "",
    inn: "6663003127",
    ogrn: "1026605606620",
    key: "3208d29d15c507395db770d0e65f3711e40374df"
};
class SearchPage extends Component {    
    constructor(props) {
        super(props);
        this.state = {notebook: false, laptop: false};
    }

    /**
     * Вычисление фильтров для поиска.
     */
    getFilter = (notebook,laptop) => {
        let filter;
        if (notebook === undefined) { notebook = this.state.notebook;}
        if (laptop === undefined) { laptop = this.state.laptop;}

        notebook ?
            laptop ? filter = 'notebook laptop ' : filter = 'notebook ' :
            laptop ? filter = 'laptop ' : filter = '';
        return filter;
    }
    /**
     * Обработчки измененя значения в поле для поиска изображений.
     */
    handleInputChange = (event) => {
        this.setState({
            searchValue: event.target.value,
        })

        let filter = this.getFilter();
        const targetValue = event.target.value;
       
        this.props.imagesSearchStart();
        axios.get('http://www.splashbase.co/api/v1/images/search?query=' + encodeURIComponent(filter + targetValue)).then((response) => {
            console.log('http://www.splashbase.co/api/v1/images/search?query=' + encodeURIComponent(filter + targetValue))
            this.props.imagesSearchSuccess(response.data.images)
        })
            .catch(() => {
            });
        


        axios.get('https://focus-api.kontur.ru/api3/req?key=' + message.key + '&ogrn=' + message.ogrn + '&inn=' + message.inn).then((response) => {
            console.log(response)
        })
            .catch(() => {
            });
        
    }
    /**
     * Обработчки измененя чекбокса "nootebook".
     */
    handleNotebookCheckboxChange = (e) =>{
        const notebook = e.target.checked;
        this.setState({
            notebook: notebook,
        })
        const {searchValue} = this.state;
        let filter = this.getFilter(notebook);
        this.props.imagesSearchStart();
        axios.get('http://www.splashbase.co/api/v1/images/search?query=' + encodeURIComponent(filter + searchValue)).then((response) => {
            console.log('http://www.splashbase.co/api/v1/images/search?query=' + encodeURIComponent(filter + searchValue))
            this.props.imagesSearchSuccess(response.data.images)
        }).catch(() => {});
        
    }
    /**
     * Обработчки измененя чекбокса "laptop".
     */
    handleLaptopCheckboxChange = (e) => {
        const laptop = e.target.checked;
        this.setState({
            laptop: laptop,
        })
        const targetValue = this.state.searchValue;
        let filter = this.getFilter(undefined, laptop);
        this.props.imagesSearchStart();
        axios.get('http://www.splashbase.co/api/v1/images/search?query=' + encodeURIComponent(filter + targetValue)).then((response) => {
            console.log('http://www.splashbase.co/api/v1/images/search?query=' + encodeURIComponent(filter + targetValue))
            this.props.imagesSearchSuccess(response.data.images)
        })
            .catch(() => {
            });
    }
    
    /**
     * Рисует поле для поиска.
     */
    renderSearchField = () => {
        return (
            <div>
                <Row>
                    <FormControl
                        className="searchField"
                        type="text"
                        value={this.props.searchValue}
                        placeholder="Введите название"
                        onChange={this.handleInputChange}
                    />
                </Row>
                <FormGroup>
                    <Checkbox inline onChange={this.handleNotebookCheckboxChange}>
                        notebook
                    </Checkbox>
                    <Checkbox inline onChange={this.handleLaptopCheckboxChange}>
                        laptop
                    </Checkbox>{' '}
                </FormGroup>
            </div>
        )
    }

    /**
     * Рисует таблицу.
     */
    renderTable = () => {

        console.log('render-state',this.state);
        console.log('render-props',this.props);
        const { isLoading } = this.props;

        return (          
            isLoading ?
                <div className = 'spinner'>
                    <img src='https://loading.io/spinners/message/lg.messenger-typing-preloader.gif' width="70" alt= "Идёт загрузка данных..." />
                </div> :
                <Row className="table-panel">
                    <ImagesTable images={this.props.images.data } />
                </Row>          
        )
     }

    render = () => {
        return (
            <Grid>
                {this.renderSearchField()}
                {this.renderTable()}
            </Grid>
        )
    }

}

SearchPage.propTypes = {
    isLoading: PropTypes.boolean,
    // notebook: PropTypes.boolean,
    searchValue: PropTypes.string,
    images: PropTypes.object,
    imagesSearchStart: PropTypes.function,
    imagesSearchSuccess: PropTypes.function,
};

const mapStateToProps = (globalState) => {
    console.log('mapstate', globalState);
    return {
        images: globalState.images,
        isLoading: globalState.isLoading,
        isError: globalState.isError,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        imagesSearchStart: () => dispatch(createSearchImagesStartAction()),
        imagesSearchSuccess: (images) => dispatch(createSearchImagesSuccessAction(images)),
        imagesSearchFailure: () => dispatch(createSearchImagesFailureAction())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);