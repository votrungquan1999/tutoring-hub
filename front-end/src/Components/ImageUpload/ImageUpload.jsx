import React from 'react';
import './ImageUpload.css';

class ImageUpload extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            file: null
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        var url = URL.createObjectURL(event.target.files[0]);
        this.setState({
            file: url
        });
        this.props.onChange(url);
    }

    render() {
        return (
            <div className="image-upload">
                <input type="file" onChange={this.handleChange} id={this.props.id} name={this.props.name} />
                <div className="image-preview-zone">
                    {this.state.file && 
                        <img src={this.state.file} className="image-preview" alt="Preview" />
                    }
                </div>
            </div>
        );
    }
}
export default ImageUpload;