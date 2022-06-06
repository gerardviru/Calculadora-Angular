import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculadora',
  templateUrl: './calculadora.component.html',
  styleUrls: ['./calculadora.component.scss']
})
export class CalculadoraComponent implements OnInit {
  operando1: number;
  operando2: number;
  operador: string | number;
  btnsNumber: NodeListOf<HTMLElement>;
  pantallaSuperior: HTMLElement | null;
  pantallaInferior: HTMLElement | null;
  pantallaSuperiorString: string;
  pantallaInferiorString: string;
  resultado: string | number;
  fase: number;
  regExPoint: RegExp;

  constructor() {
    this.operando1 = 0;
    this.operando2 = 0;
    this.operador = "";
    this.resultado = "";
    this.fase = 1;
    this.pantallaSuperiorString = "";
    this.pantallaInferiorString = "0";
    this.regExPoint = /\./;

    this.btnsNumber = document.querySelectorAll("[type=number]");
    this.pantallaSuperior = null;
    this.pantallaInferior = null;

  }

  ngOnInit(): void {
    this.obtenerElementos();

    this.setEstadoInicial();

  }

  /**
   * Obtener los elementos hijos necesarios
   */
  obtenerElementos() {
    // Elementos de la pantalla
    this.pantallaSuperior = document.getElementById("pantalla-superior");
    this.pantallaInferior = document.getElementById("pantalla-inferior");

    //Elementos botones de tipo numero
    this.btnsNumber = document.querySelectorAll("[type=number]");
  }

  /**
   * Setear el estado inicial de la pantalla
   */
  setEstadoInicial() {
    // Estado inicial variables
    this.operando1 = 0;
    this.operando2 = 0;
    this.resultado = 0;
    this.pantallaInferiorString = "0";
    this.pantallaSuperiorString = "";
  }

  /**
   * Ejecutar operacion
   */
  ejecutarOperaction() {
    try {
      switch (this.operador) {
        case "+":
          this.resultado = this.operando1 + this.operando2;

          break;
        case "-":
          this.resultado = this.operando1 - this.operando2;

          break;
        case "/":
          this.resultado = this.operando1 / this.operando2;

          break;
        case "*":
          this.resultado = this.operando1 * this.operando2;

          break;
        default:
          this.resultado = "ERROR";
          break;
      }
      this.pantallaInferiorString = this.resultado.toString();
    } catch (error) {
      console.log(error);

      this.pantallaInferiorString = "ERROR";
    }
  }

  /**
   * Setea el tipo de operador
   */
  setOperador(operador: string) {
    this.operador = operador;
  }

  /**
   * On number button click event
   * @param e
   */
  onNumberClick(number: string) {
    // Modificar string pantalla inferior

    if (this.pantallaInferiorString === "0") {
      this.pantallaInferiorString = "";
    }
    this.pantallaInferiorString += number;

  }

  /**
   * On operador click
   */
  onOperadorClick(operador: string) {
    this.operador = operador;
    if (this.fase === 1) {
      this.operando1 = parseFloat(this.pantallaInferiorString);
      this.pantallaSuperiorString = this.operando1 + " " + this.operador;
      this.pantallaInferiorString = this.operando2.toString();
      this.pantallaInferiorString = "0";
    }
    this.fase = 2;
  }

  /**
   * On igual click
   */
  onIgualClick() {

    if (this.fase === 2) {
      this.operando2 = parseFloat(this.pantallaInferiorString);
      this.pantallaSuperiorString += this.operando2 + " = ";
      this.ejecutarOperaction();
      this.fase = 1;
    }
  }

  /**
   * On ac click
   */
  onAcClick() {
    this.setEstadoInicial();
  }

  /**
   * On point click
   */
  onPointClick() {
    // Que anada un punto si no se ha anadido uno aun
    if (!this.regExPoint.test(this.pantallaInferiorString)) {
      this.pantallaInferiorString += ".";
    }
  }

  /**
   * On del click
   */
  onDelClick() {

    if (this.pantallaInferiorString != "0") {

      this.pantallaInferiorString = this.pantallaInferiorString.slice(0, -1);
      if (this.pantallaInferiorString.length === 0) this.pantallaInferiorString = "0";

    }

  }
}
