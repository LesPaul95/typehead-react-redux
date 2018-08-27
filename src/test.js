import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Grid, Row, FormControl, FormGroup, Checkbox } from 'react-bootstrap';
import axios from "axios";
import { PropTypes } from 'prop-types';
import { ImagesTable } from '../components/ImagesTable.js';
//import "./main.less";
const STATUS = {
    IDLE: 1,
    PENDING: 2,
    SUCCESS: 3
};
class SearchPage extends Component {

    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.state = {
            searchValue: "",
            images: {
                data: [],
                status: STATUS.IDLE
            },
            isLoading: false,
            notebook: false,
            laptop: false,
        };
        console.log(this.state);
    }

    /**
     * Обработчки измененя значения в поле для поиска фильмов.
     */
    handleInputChange = (event) => {
        const { images } = this.state;
        const newImages = {
            data: images.data,
            status: STATUS.PENDING
        }
        this.setState({
            searchValue: event.target.value,
            images: newImages,
            isLoading: true,
        })

        let filter;
        //this.state.notebook ?  filter = 'notebook ' :  filter = '';
        //this.state.laptop ? filter = 'laptop ' : filter = '';

        this.state.notebook ?
            this.state.laptop ? filter = 'notebook laptop ' : filter = 'notebook ' :
            this.state.laptop ? filter = 'laptop ' : filter = '';
        //this.state.laptop && this.state.notebook ? filter = 'notebook laptop ' : filter = '';

        const targetValue = event.target.value;

        //console.log(this.state);
        axios.get('http://www.splashbase.co/api/v1/images/search?query=' + encodeURIComponent(filter + targetValue)).then((response) => {
            console.log('http://www.splashbase.co/api/v1/images/search?query=' + encodeURIComponent(filter + targetValue));
            this.setState({
                images: {
                    data: response.data.images,
                    status: STATUS.SUCCESS
                },
                isLoading: false,
            })
        })
            .catch(() => {
            });

    }
    handleNotebookCheckboxChange = (e) => {
        const check = e.target.checked;
        console.log(check);
        this.setState({
            notebook: check,
        })
        console.log(this.state);
        this.handleInputChange;
    }

    handleLaptopCheckboxChange = (e) => {
        this.setState({
            laptop: e.target.checked,
        })
        console.log(this.state);
        //this.handleInputChange();
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
                        value={this.state.searchValue}
                        placeholder="Введите название"
                        onChange={this.handleInputChange}
                    />
                </Row>
                <FormGroup>
                    <Checkbox inline onChange={this.handleNotebookCheckboxChange}>notebook</Checkbox> <Checkbox inline onChange={this.handleLaptopCheckboxChange}>laptop</Checkbox>{' '}
                </FormGroup>
            </div>
        )
    }

    /**
     * Рисует таблицу.
     */
    renderTable = () => {
        // const { searchValue } = this.state;
        // getImages(searchValue);

        console.log('рендер');
        console.log(this.state.images);
        const { images } = this.state;
        const isLoading = images && images.status === STATUS.PENDING;

        return (
            isLoading ?
                <div>
                    <img src='https://loading.io/spinners/double-ring/lg.double-ring-spinner.gif' alt="Идёт загрузка данных..." />
                </div> :
                <Row className="table-panel">
                    <ImagesTable images={this.state.images.data} />
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
    images: PropTypes.array
};

ReactDOM.render(
    <div>
        <SearchPage />
    </div>,
    document.getElementById("root")
);