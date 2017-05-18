import React from 'react';

const NewPlaylist = ({
    onNewPlaylistChange, 
    onNewPlaylistSubmit, 
    newPlaylistValue,
    dirty,
    
    isNPVValid,
    showErrorMessage,
}) => {
    const errorMessage = showErrorMessage(newPlaylistValue, dirty);
    return (
        <div>
        {errorMessage 
            ? <div className="alert alert-warning">{errorMessage}</div> 
            : <div className="alert"></div>
        }
        <form 
            className="form-group" 
            style={{marginTop: '20px'}}
            onSubmit={onNewPlaylistSubmit}
        >
            <input 
                className="form-control"
                placeholder="playlist name"
                onChange={onNewPlaylistChange}
                value={newPlaylistValue}
            />
            <button 
                className="btn btn-default" 
                disabled={!isNPVValid(newPlaylistValue)}
            ><span className='glyphicon glyphicon-plus'></span> add
            </button>
        </form>
        </div>
    );
}

export default NewPlaylist;