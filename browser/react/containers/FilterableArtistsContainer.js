import React from 'react';
import FilterInput from '../components/FilterInput';
import Artists from '../components/Artists';

class FilterableArtistsContainer extends React.Component {
    constructor () {
        super();
        this.state = {
            inputValue: ''
        };
        
        // functions
        this.onChange = this.onChange.bind(this);
    }
    
    
    onChange (e) {
        this.setState({inputValue : e.target.value});
    }
    
    render () {
        const inputValue = this.state.inputValue;
        const filteredArtists = this
            .props
            .artists
            .filter(item => 
                item
                    .name
                    .match(inputValue)
            );
        return (
            <div>
            <FilterInput 
                onChange={this.onChange} 
                inputValue={inputValue}
            />
            <Artists artists={filteredArtists} />
            </div>
        );
    }
}

export default FilterableArtistsContainer;