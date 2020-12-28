import React from 'react';
import Select from 'react-select';
import CardComponent from './CardComponent.jsx';

const resourceAttributeConfig = {
    people: 'mass',
    starships: 'length'
}

export default class DuelView extends React.Component {

    state = {
            leftPoints: 0,
            rightPoints: 0,
        selectedResource: null
    }

    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
      }

    cardConstructor(item, accessor) {
        return {
            name: item.name,
            value: parseFloat(item[accessor]) || 0,
            accessor
        }
    }

    playRound = (resources, selected) => {
        let arrayLength = resources[selected].length;
        let accessor = resourceAttributeConfig[selected];
        let leftPlayer = this.cardConstructor(resources[selected][this.getRandomInt(arrayLength)], accessor);
        let rightPlayer = this.cardConstructor(resources[selected][this.getRandomInt(arrayLength)], accessor);
        
        if (leftPlayer.value > rightPlayer.value) {
            this.setState({ leftPoints: this.state.leftPoints + 1, result: 'left' })
        } else if (leftPlayer.value < rightPlayer.value)
            this.setState({ rightPoints: this.state.rightPoints + 1, result: 'right' })
        else this.setState({ result: 'draw' });
        this.setState({ leftPlayer, rightPlayer })
    }

    resetPoints = () => {
        this.setState({ leftPoints: 0, rightPoints: 0 })
    }

    render() {
        const { resources } = this.props;
        const { selectedResource, result, leftPlayer, rightPlayer, leftPoints, rightPoints } = this.state;
        let options = Object.keys(resources).map(
            (item, i) => { return {
                value: i,
                label: item
            }}
        );
        console.log(this.state);
        return (
            <div className={'VerticalContainer'}>

                <Select className={'Select'} options={options} onChange={(option) => this.setState({ selectedResource: option.label })} />
                
                <>
                    <button disabled={!selectedResource} onClick={() => this.playRound(resources, selectedResource)}>play</button>
                    <button onClick={() => this.resetPoints()}>reset</button>
                </>

                <>
                    <label>POINTS</label>
                    <div className={'HorizontalContainer'}>
                        <span>{leftPoints}</span>
                        <span>{rightPoints}</span>
                    </div>
                </>

                <>
                    {
                        result && 
                    <>
                        <label>{ result == 'draw' ? 'there was a draw!' : `${result} player won!` }</label>
                        <div className={'HorizontalContainer'}>
                            <CardComponent winner={result == 'left'} player={leftPlayer} />
                            <CardComponent winner={result == 'right'} player={rightPlayer} />
                        </div>
                    </>
                    }
                </>
            </div>
    );
    }
}