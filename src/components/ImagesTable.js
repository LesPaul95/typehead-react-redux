import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import { PropTypes } from 'prop-types';

export class ImagesTable extends Component {
    render() {
        const { images } = this.props;
        //  console.log("images from table");
        //  console.log(images);
        return(
            <Table className="images" bordered condensed hover striped >
                <tbody>
                    
                    {
                        images.map((item, index) => (
                            <tr key={index}>
                                <td key={index} className="poster-cell"><img src={item.url} width='600px' alt='https://loading.io/spinners/double-ring/lg.double-ring-spinner.gif'/></td>
                            </tr>
                        ))
                    }
                    
                </tbody>
            </Table>
        );
    }
}

ImagesTable.propTypes = {
    images: PropTypes.array
};
