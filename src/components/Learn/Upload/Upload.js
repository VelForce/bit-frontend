import React, { Component } from 'react';

import { FilePond, File, registerPlugin } from 'react-filepond'
import 'filepond/dist/filepond.min.css'
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)

class Upload extends Component {
    constructor() {
        super();
        this.state = {
            files: [
                {
                    source: "index.html",
                    options: {
                        type: "local"
                    }
                }
            ]
        }
    }

    handleInit() {
        console.log("FilePond instance has initialised", this.pond);
    }

    render() {
        return (
            <div>
                <h1>Upload Page</h1>
                <FilePond
                    ref={ref => (this.pond = ref)}
                    files={this.state.files}
                    allowMultiple={true}
                    maxFiles={3}
                    server="/api"
                    oninit={() => this.handleInit()}
                    onupdatefiles={fileItems => {
                        // Set currently active file objects to this.state
                        this.setState({
                            files: fileItems.map(fileItem => fileItem.file)
                        });
                    }}
                />
            </div>
        )
    }
}

export default Upload;