import React from 'react';

const Table = ({total,days,week,later,search}) => {

            //If search is valid then display loader
            if(search === true) {

                return (

                    <div style={{padding:'50px'}}className="ui segment">
                        <div className="ui active dimmer">
                            <div className="ui small text loader">Fetching Issues</div>
                        </div>
                        <p></p>
                    </div>



                );
            }
            //if issue fetching is completed
            else if(search === 'done'){

                return(
                    <table className="ui selectable inverted table">
                        <thead>
                        <tr>
                            <th>Issues</th>
                            <th className="right aligned">Count</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>Total Number of Open Issues</td>
                            <td className="right aligned">{total}</td>
                        </tr>
                        <tr>
                            <td>Number of Open Issues created in Last 24 hours</td>
                            <td className="right aligned">{days}</td>
                        </tr>
                        <tr>
                            <td>Number of Open Issues created later than 24hrs  and  before 7 Days</td>
                            <td className="right aligned">{week}</td>
                        </tr>
                        <tr>
                            <td>Number of Open Issues created later than 7 Days</td>
                            <td className="right aligned">{later}</td>
                        </tr>
                        </tbody>
                    </table>
                );

            }
            //Defualt Home Page message
            else if(search === 'false'){

               return (
                <h3 className="ui block header">
                    Please enter a repository url
                </h3>
               );
            }

            //If response is not fetched
            else if(search === 'failed'){

                return(
                    <h3 className="ui block header">
                        Repository Not Found
                    </h3>
                );
            }




    }

export default Table;