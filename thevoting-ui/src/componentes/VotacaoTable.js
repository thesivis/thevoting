import React, {Component} from 'react';
import config from 'react-global-configuration';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {dateFormatter, booleanFormatter, customCheckField, customDateField} from '../utils/utils.js'
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
        this.onAddRow = this.onAddRow.bind(this);
        this.afterSaveCell = this.afterSaveCell.bind(this);
    }

    componentDidMount(){
        this.onPageChange(1,10);
    }

    onPageChange(page, sizePerPage) {
        fetch(config.get('url')+'votacao/?page='+page)
            .then( response => response.json())
            .then(data => this.setState({ votacoes : data, currentPage: page}));
    }

    onAddRow(row) {
        // ...
        var object = this;

        var ano = row.dataInicio.getFullYear();
        var mes = row.dataInicio.getMonth() + 1;
        var dia = row.dataInicio.getDate();
        row.dataInicio = ano + "-" + mes + "-" + dia;

        ano = row.dataFim.getFullYear();
        mes = row.dataFim.getMonth() + 1;
        dia = row.dataFim.getDate();
        row.dataFim = ano + "-" + mes + "-" + dia;

        var options = {
            method: "post",
            credentials: "same-origin",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json, text/plain, */*',                  
            },
            body: JSON.stringify(row)
        };

        fetch(config.get('url')+'votacao/', options)
            .then( response => response.json())
            .then(r => object.onPageChange(object.state.currentPage));
    }

    onDeleteRow(row){
        var promises = [];
        row.forEach(element => {
            var p = fetch(config.get('url')+'votacao/'+element+'/delete', {method: 'delete'})
            .then(function(response){
                if(response.status === 204){
                    console.log("deletado " + element);
                }else{
                    console.log(response);
                }
                return "";
            });
            promises.push(p);
        });

        var object = this;

        Promise.all(promises).then(function(values){
            object.onPageChange(object.state.currentPage);
        });
        
    }

    buttonFormatter(cell, row){
        
        return <Button href="/votacao" variant="primary">Opções{row.id}</Button>;
    }

    afterSaveCell(row, cellName, cellValue) {
        // do your stuff...
        row[cellName] = cellValue;
        
        var options = {
            method: "put",
            credentials: "same-origin",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json, text/plain, */*',                  
            },
            body: JSON.stringify(row)
        };

        var object = this;
        fetch(config.get('url')+'votacao/'+row.id+'/update', options)
            .then( response => response.json())
            .then(r => object.onPageChange(object.state.currentPage));
    }

    render(){

        var options = {
            noDataText: 'Vazio',
            onPageChange: this.onPageChange, 
            page: this.props.currentPage, 
            hideSizePerPage: true,
            onDeleteRow: this.onDeleteRow,
            insertText : "Novo",
            deleteText: "Remove",
            saveText: "Salvar",
            closeText: "Cancelar",
            onAddRow: this.onAddRow
        };

        const selectRow = {
            mode: 'checkbox',
            cliclToSelct: true
        };

        const cellEdit = {
            mode: 'click',
            blurToSave: true,
            afterSaveCell: this.afterSaveCell,
          };

        return (

            <BootstrapTable data={ this.state.votacoes.results } version="4"
             selectRow={ selectRow }
             remote={true} pagination={true} fetchInfo={ { dataTotalSize: this.state.votacoes.count } }
             insertRow={true} deleteRow={true} cellEdit={ cellEdit }
             options={ options }>
                <TableHeaderColumn dataField='id' editable={false} hiddenOnInsert={true} isKey={true} width='80'>ID</TableHeaderColumn>
                <TableHeaderColumn dataField='nome' width='300'>Nome</TableHeaderColumn>
                <TableHeaderColumn dataField='descricao'>Descrição</TableHeaderColumn>
                <TableHeaderColumn dataField='documento' hidden={true}>Documento</TableHeaderColumn>
                <TableHeaderColumn dataField='dataInicio' width='120'  dataFormat={dateFormatter} customInsertEditor={ { getElement: customDateField } }>Início</TableHeaderColumn>
                <TableHeaderColumn dataField='dataFim' width='120'  dataFormat={dateFormatter} customInsertEditor={ { getElement: customDateField } }>Fim</TableHeaderColumn>
                <TableHeaderColumn dataField='ativo'  customInsertEditor={ { getElement: customCheckField } } width='80' dataAlign='center' dataFormat={booleanFormatter}>Ativo?</TableHeaderColumn>
                <TableHeaderColumn dataField="button" editable={false} hiddenOnInsert={true} width='120' dataFormat={this.buttonFormatter}>Buttons</TableHeaderColumn>
            </BootstrapTable>
        );

    }
}

export default VotacaoTable;