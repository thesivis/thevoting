import React, {Component} from 'react';
import VotacaoTable from './VotacaoTable.js';
import Header from './Header.js';


class Votacao extends Component{

    

    render(){
        console.log(this.state)
        return(
            <div>
                <Header />
                <h1>Votações</h1>
                <VotacaoTable />
            </div>
        );
    }

}

export default Votacao;