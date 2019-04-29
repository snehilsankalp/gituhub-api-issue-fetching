import React from 'react';

class SearchBar extends React.Component{

    state= {term: ''}; //State Decalaration

    //event handler function
    onInputChange = event => {
        this.setState({term: event.target.value});
    }
    //event handler on form submit
    onFormSubmit = event => {
        event.preventDefault();
        this.props.onFormSubmit(this.state.term);




    }

    render(){



        return (
            //Displaying Search Bar
            <div className="search-bar ui segment">
                <form onSubmit={this.onFormSubmit} className="ui form">
                    <div className="field">
                        <label>Repository Search</label>
                        <input
                            type="text"
                            value={this.state.term}
                            onChange={this.onInputChange}
                        />
                    </div>
                </form>
            </div>


        );
    }
}

export default SearchBar;