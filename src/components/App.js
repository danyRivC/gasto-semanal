import React, { Component } from 'react';
import Header from './Header';
import '../css/App.css';
import FormularioGasto from './Formulario';
import Listado from './Listado';
import {validarPresupuesto} from '../helper';
import ControlPresupuesto from './ControlPresupuesto'

class App extends Component {

    state = {
        presupuesto : '',
        restante : '',

        gastos:{

        }
    };
    agregarGasto = gasto =>{
        //tomar una copia del state actual
        const gastos = {...this.state.gastos};

        //agregar gasto al objeto del state
        gastos[`gasto${Date.now()}`]=gasto;
        // ponerlo al state
        this.setState({
            gastos
        })

        this.restarPresupuesto(gasto.cantidadGasto);
    };

    restarPresupuesto = cantidad =>{

        let restar = Number(cantidad);
        let restante = this.state.restante;
        restante -= restar;
        this.setState({restante});

    }

    componentDidMount() {
        this.obtenerPresupuesto();

    }

    obtenerPresupuesto=()=>{
        let presupuesto = prompt("Cual es el presupuesto");

        let resultado = validarPresupuesto(presupuesto)
        if (resultado){
            this.setState({
                presupuesto : presupuesto,
                restante :presupuesto
            });
        }else {
            this.obtenerPresupuesto()
        }
    }


    render() {
    return (
      <div className="App container">
        <Header titulo='Gasto Semanal'/>
        <div className='contenido-principal contenido'>
          <div className='row'>
            <div className='one-half column'>
                <FormularioGasto
                agregarGasto = {this.agregarGasto}
                />

            </div>
            <div className='one-half column'>
                <Listado gastos = {this.state.gastos}/>
                <ControlPresupuesto
                    restante={this.state.restante}
                    presupuesto = {this.state.presupuesto}
                />

            </div>


          </div>

        </div>
      </div>
    );
  }
}

export default App;
