import { Component } from '@angular/core';

@Component({
  selector: 'app-calculadora',
  standalone: true,
  imports: [],
  templateUrl: './calculadora.component.html',
  styleUrl: './calculadora.component.scss',
})
export class CalculadoraComponent {
  pastOperation: any = '';
  currentOperation: any = '';
  firstOperation: boolean = true;

  // ANCHOR: ADD DIGIT
  addDigit(digit: any) {
    if (digit === '.' && this.currentOperation.includes('.')) {
      return;
    }

    this.currentOperation += digit;
    this.updateDisplay(null, null, null, null);
  }

  // ANCHOR: PROCESS OPERATION
  processOperation(operation: any) {
    if (this.currentOperation === '' && operation !== 'C') {
      if (this.pastOperation !== '') {
        this.changeOperation(operation);
      }
      return;
    }
    let operationValue: any;
    let previousValue = +this.pastOperation.split(' ')[0];
    let currentValue = +this.currentOperation;

    switch (operation) {
      case '+':
        operationValue = previousValue + currentValue;
        this.updateDisplay(
          operationValue,
          operation,
          currentValue,
          previousValue
        );
        break;

      case '-':
        operationValue = previousValue - currentValue;
        this.updateDisplay(
          operationValue,
          operation,
          currentValue,
          previousValue
        );
        break;

      case '*':
        operationValue = previousValue * currentValue;
        this.updateDisplay(
          operationValue,
          operation,
          currentValue,
          previousValue
        );
        break;

      case '/':
        operationValue = previousValue / currentValue;
        this.updateDisplay(
          operationValue,
          operation,
          currentValue,
          previousValue
        );
        break;

      case 'DEL':
        this.processOperationDel();
        break;

      case 'CE':
        this.processOperationCE();
        break;

      case 'C':
        this.processOperationC();
        break;

      case '=':
        this.processOperationEqual();
        break;

      default:
        break;
    }
  }

  // ANCHOR: (DEL, CE, C & =) PROCESS OPERATIONS
  processOperationDel() {
    this.currentOperation = this.currentOperation.slice(0, -1);
  }

  processOperationCE() {
    this.currentOperation = '';
  }

  processOperationC() {
    this.currentOperation = '';
    this.pastOperation = '';
  }

  processOperationEqual() {
    let operation = this.pastOperation.split(' ')[1];
    this.firstOperation = false;
    this.processOperation(operation);
  }

  // ANCHOR: UPDATE DISPLAY
  updateDisplay(
    operationValue: any = null,
    operation: any = null,
    currentValue: any,
    previousValue: any
  ) {
    if (operationValue !== null) {
      if (previousValue === 0) {
        operationValue = currentValue;
      }
      this.pastOperation = `${currentValue} ${operation}`;
      if (previousValue > 0) {
        this.pastOperation = `${previousValue} ${operation} ${currentValue} =`;
        this.currentOperation = operationValue;
      } else {
        this.currentOperation = '';
      }
    }
  }

  // ANCHOR: CHANGE OPERATION
  changeOperation(operation: any) {
    if (!operation.includes(operation)) {
      return;
    }
    this.pastOperation = this.pastOperation.trim().slice(0, -1) + operation;
  }

  // ANCHOR: ADD TO DISPLAY
  addToDisplay(value: any) {
    if (this.firstOperation) {
      if (+value >= 0 || value === '.') {
        this.addDigit(value);
      } else {
        this.processOperation(value);
      }
    } else {
      this.pastOperation = '';
      this.currentOperation = '';
      this.firstOperation = true;
      if (+value >= 0 || value === '.') {
        this.addDigit(value);
      } else {
        this.processOperation(value);
      }
    }
  }
}
