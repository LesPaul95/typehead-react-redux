import axios from "axios";
import { connect } from 'react-redux';
import {  createSearchImagesSuccessAction } from '../actions/actions.js';



// export default function getSrc(filter, targetValue) {
//     return axios.get('http://www.splashbase.co/api/v1/images/search?query=' + encodeURIComponent(filter + targetValue));
// }

// getSrc.then(function (response) {
//     return response.data.images; // now the data is accessable from here.
// }).catch(function (response) {
//     console.log(response);
// });
function getImages(filter, targetValue) {
    let images = {};
    images = axios.get('http://www.splashbase.co/api/v1/images/search?query=' + encodeURIComponent(filter + targetValue)).then((response) => {
        console.log('http://www.splashbase.co/api/v1/images/search?query=' + encodeURIComponent(filter + targetValue));
        this.props.imagesSearchSuccess(response.data.images)
    })
        .catch(() => {
        });
    console.log(images);    
    return images;
}

const mapDispatchToProps = (dispatch) => {
    return {
        imagesSearchSuccess: (images) => dispatch(createSearchImagesSuccessAction(images)),
    }
}

export default connect(mapDispatchToProps)(getImages);