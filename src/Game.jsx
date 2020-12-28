import React from 'react';
import DuelView from './DuelView.jsx';
import '../styles.css';

const PEOPLE_PAGES_NUMBER = 9;
const STARSHIPS_PAGES_NUMBER = 4;

export default class Game extends React.Component {

    state = {
        resources: {
            people: [],
            starships: []
        },
        loading: true
    }

    fetchData = (pagesNumber, accessor) => {
        let dataAccumulator = [];
        for (let i = 1; i <= pagesNumber; i++) {
            let url = `https://swapi.dev/api/${accessor}/?page=${i}`
            fetch(url)
                .then(response => response.json())
                .then((data) => dataAccumulator.push(...data.results));
        }
        console.log({ dataAccumulator });
        return dataAccumulator;
    }

    componentDidMount () {
        Promise.all([
            this.fetchData(PEOPLE_PAGES_NUMBER, 'people'),
            this.fetchData(STARSHIPS_PAGES_NUMBER, 'starships')
        ])
        .then(
            ([people, starships]) => this.setState({ resources: { people, starships }, loading: false })
        );
    }

    render () {
        console.log(this.state);
        return (
         <div className={'App'}>
            {
            !this.state.loading ?
                <DuelView resources={this.state.resources} />
                :
                <div>
                    loading...
                </div>
            }
         </div>
     );
 }
}