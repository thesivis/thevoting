import React, {Component} from 'react';
import config from 'react-global-configuration';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {dateFormatter, booleanFormatter, customCheckField} from '../utils/utils.js'
import { Button} from "react-bootstrap";

class VotacaoTable extends Component{
    
    constructor(props){
        super(props);

        this.state = {
            votacoes : [],
            currentPage : 1
        };

        this.onPageChange = this.onPageChange.bind(this);
        this.onDeleteRow = this.onDeleteRow.bind(this);
        this.buttonFormatter = this.buttonFormatter.bind(this);
    }

    componentDidMount(){
        this.onPageChange(1,10);
    }

    onPageChange(page, sizePerPage) {
        fetch(config.get('url')+'votacao/?page='+page)
            .then( response => response.json())
            .then(data => this.setState({ votacoes : data, currentPage: page}));
    }

    onDeleteRow(row){
        row.forEach(element => {
            fetch(config.get('url')+'votacao/'+element+'/delete', {method: 'delete'})
            .then(function(response){
                if(response.status === 204){
                    console.log("deletado " + element);
                }else{
                    console.log(response);
                }
                return "";
            });
        });
        this.onPageChange(this.state.currentPage);
    }

    buttonFormatter(cell, row){
        console.log(row)
        return <Button  href="/votacao" variant="primary">Opções{row.id}</Button>;
    }

    render(){

        var options = {
            noDataText: 'Vazio',
            onPageChange: this.onPageChange, 
            page: this.props.currentPage, 
            hideSizePerPage: true,
            onDeleteRow: this.onDeleteRow,
        };

        const selectRow = {
            mode: 'checkbox',
            cliclToSelct: true
        };

        return (

            <BootstrapTable data={ this.state.votacoes.results } version="4"
             selectRow={ selectRow }
             remote={true} pagination={true} fetchInfo={ { dataTotalSize: this.state.votacoes.count } }
             insertRow={true} deleteRow={true}
             options={ options }>
                <TableHeaderColumn dataField='id' editable={false} hiddenOnInsert={true} isKey={true} width='80'>ID</TableHeaderColumn>
                <TableHeaderColumn dataField='nome' width='300'>Nome</TableHeaderColumn>
                <TableHeaderColumn dataField='descricao'>Descrição</TableHeaderColumn>
                <TableHeaderColumn dataField='dataInicio' width='120' dataFormat={dateFormatter}>Início</TableHeaderColumn>
                <TableHeaderColumn dataField='dataFim' width='120' dataFormat={dateFormatter}>Fim</TableHeaderColumn>
                <TableHeaderColumn dataField='ativo'  customInsertEditor={ { getElement: customCheckField } } width='80' dataAlign='center' dataFormat={booleanFormatter}>Ativo?</TableHeaderColumn>
                <TableHeaderColumn dataField="button" editable={false} hiddenOnInsert={true} width='120' dataFormat={this.buttonFormatter}>Buttons</TableHeaderColumn>
            </BootstrapTable>
        );

    }
}

export default VotacaoTable;