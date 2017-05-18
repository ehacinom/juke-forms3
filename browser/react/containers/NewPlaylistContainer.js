import React from 'react';
import NewPlaylist from '../components/NewPlaylist';
import axios from 'axios';

class NewPlaylistContainer extends React.Component {
    constructor () {
        super();
        this.state = {
            newPlaylistValue: '',
            dirty: false,
        };
        
        this.onNewPlaylistChange = this.onNewPlaylistChange.bind(this);
        this.onNewPlaylistSubmit = this.onNewPlaylistSubmit.bind(this);
        
        this.isNPVexist = this.isNPVexist.bind(this);
        this.isNPVcorrectLength = this.isNPVcorrectLength.bind(this);
        
        this.isNPVValid = this.isNPVValid.bind(this);
        this.showErrorMessage = this.showErrorMessage.bind(this);
    }
    
    onNewPlaylistChange (e) {
        this.setState({
            newPlaylistValue : e.target.value,
            dirty : true
        });
    }

    onNewPlaylistSubmit (e) {
        this.props.postNewPlaylist(this.state.newPlaylistValue)
        e.preventDefault();
        this.setState({
            newPlaylistValue : '',
            dirty : false
        });
    }
    
    isNPVexist (npv) {
        return npv
    }
    
    isNPVcorrectLength (npv) {
        return (npv.length <= 16)
    }
    
    isNPVValid (npv) {
        return this.isNPVexist(npv) && this.isNPVcorrectLength(npv)
    }
    
    showErrorMessage (npv, dirty) {
        let errorMessage = '';
        if (dirty) {
            if (!this.isNPVexist(npv)) 
                errorMessage = 'Please enter name';
            else if (!this.isNPVcorrectLength(npv)) 
                errorMessage = 'Playlist name must be less than 16 characters';
        }
        
        return errorMessage;
    }
    
    render () {
        return (
            <div>
            <NewPlaylist 
                onNewPlaylistChange={this.onNewPlaylistChange}
                onNewPlaylistSubmit={this.onNewPlaylistSubmit}
                newPlaylistValue={this.state.newPlaylistValue} 
                dirty={this.state.dirty}
                
                isNPVValid={this.isNPVValid}
                showErrorMessage={this.showErrorMessage}
            />
            </div>
        );
    }
}

export default NewPlaylistContainer;