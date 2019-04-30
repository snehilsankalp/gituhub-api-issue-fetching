import React from 'react';
import SearchBar from './SearchBar';
import git from '../api/git';
import Table from './Table';

class App extends React.Component{

    // Defining the states
    state = { total: '',days:'', week:'',search:'false',urlStatus:'true'};

    // On Form Submit
    onTermSubmit = async term => {
        try {
            // Checking for valid URL
            let regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
            let urlStatus = regexp.test(term);
            // If entered URL is valid
            if (urlStatus) {
                    // Splitting the URL to get user and repository name
                    term = new URL(term).pathname;
                    term = term.split("/");
                    this.setState({search: true})
                    let i = 1;
                    let total = 0;
                    let days = 0;
                    let week = 0;
                    let later = 0;
                    let fetch = true;
                    // Loop to get all the issue
                    while (fetch) {
                        // Hitting the GitHub API
                        const response = await git.get(`repos/${term[1]}/${term[2]}/issues`, {
                            params: {
                                state: 'open',
                                per_page: '100',
                                page: `${i}`


                            }

                        });
                        //Checking for Issues
                        if (response.data.length > 0) {
                                i++;
                                var d = Date.now(); //Getting Current Date and Time
                                let data = response.data;

                                // Mapping the array for getting individual issue date
                                data.map((date) => {
                                    let pullReq= date.pull_request;
                                    date = date.created_at;
                                    date = Date.parse(date);
                                    //Finding the time difference
                                    var diff = (d - date) / 1000; //Convert epoch from milliseconds into second
                                    if (diff < 86400) {
                                        days++; //Calculating issue opened in last 24hrs
                                        if(pullReq){days--;}
                                    }
                                    else if ((diff > 86400) && (diff < 604800)) {
                                        week++; //Calculating issues opened after 24hrs but within 7 Days
                                        if(pullReq){week--;}
                                    }
                                    else {
                                        later++; //Calculating issues opened later than 7 days
                                        if(pullReq){later--;}
                                    }
                                })
                                    total = days+week+later; //Calculating Total issues


                        }


                        else {

                            break;

                        }


                    }
                //Setting States
                this.setState({
                    total: total,
                    days: days,
                    week: week,
                    later: later,
                    search: 'done'

                });
            }
            //Setting states for invalid URL
            else {
                this.setState({urlStatus: urlStatus});
            }
        }
        //Setting search status if any response error
        catch (err){
            if(err){
                this.setState({search:'failed'});
                console.log(err);
            }
        }
    }




        render(){
            //If URL is Invalid
            if(this.state.urlStatus === false){
                return (
                    <div style={{marginTop: '5px'}} className="ui container">
                    <h3 className="ui block header">
                        Invalid URL.URL should be in the format of(https://www.example.com)
                    </h3>
                    </div>
                );

            }
            else{
                //If url is valid
                    return(
                        <div style={{marginTop: '5px'}} className="ui container">
                            {/*Function Called onFormSubmit*/}
                            <SearchBar onFormSubmit={this.onTermSubmit}/>

                            {/*Passing states as props to Table.js*/}
                            <Table total={this.state.total}
                                   days={this.state.days}
                                   week={this.state.week}
                                   later={this.state.later}
                                   search={this.state.search}
                            />

                        </div>
                    );
            }




        }

}

export default App;