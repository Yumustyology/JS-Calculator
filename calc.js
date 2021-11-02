class Calculator{
	constructor(previousOperanElement, currentOperandElement){
		this.previousOperanElement = previousOperanElement;
		this.currentOperandElement = currentOperandElement;
		this.clear();
	}

	clear(){
		this.currentOperand = '';
		this.previousOperand = '';
		this.operation = undefined;
	}
	delete(){
		this.currentOperand = this.currentOperand.toString().slice(0, -1)
	}
	appendnumber(number){
		if (number ==='.' && this.currentOperand.includes('.')) return

		
		this.currentOperand = this.currentOperand.toString() + number.toString();

		
	}
	chooseOperation(operation){
		if (this.currentOperand === '') return
		if (this.currentOperand != '') {
			this.compute()
		}
		this.operation = operation;
		this.previousOperand = this.currentOperand;
		this.currentOperand = '';
	}
	compute(){

		var computation;
		const prev = parseFloat(this.previousOperand);
		const current = parseFloat(this.currentOperand);

		if (isNaN(prev) || isNaN(current)) return

		switch(this.operation){
			case '+':
				computation = prev + current
			break;

			case '-':
				computation = prev - current
			break;

			case '*':
				computation = prev * current
			break;

			case '/':
				computation = prev / current
			break;

			default:
			 return

		}

		this.currentOperand = computation;
		this.operation = undefined;
		this.previousOperand = '';
	}

	getDisplayNumber(number){
		const stringNum = number.toString();
		const integerDigit = parseFloat(stringNum.split('.')[0]);
		const decimalDigit = stringNum.split('.')[1];
		let inegerDisplay;
		if (isNaN(integerDigit)) {
			inegerDisplay = ' ';
		}else{
			inegerDisplay = integerDigit.toLocaleString('en', {maximiumFractionDigits:0});
		}

		if (decimalDigit != null ) {
			return `${inegerDisplay}.${decimalDigit}`;
		}else{
			return integerDigit;
		}
	}

	updateDisplay(){
		this.currentOperandElement.innerText = this.getDisplayNumber(this.currentOperand);
		if (this.operation != null) {
		this.previousOperanElement.innerText = 
			`${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;

		}else{
			this.previousOperanElement.innerText = '';
			}
	}

}



const numberbtn = document.querySelectorAll('[data-number]');
const operationbtn = document.querySelectorAll('[data-operation]');
const equalsbtn = document.querySelector('[data-equals]');
const deletebtn = document.querySelector('[data-delete]');
const clearbtn = document.querySelector('[data-clr]');
const previousOperanElement = document.querySelector('[data-previous-operand]');
const currentOperandElement = document.querySelector('[data-current-operand]');

const calculator = new Calculator(previousOperanElement, currentOperandElement);

numberbtn.forEach(button => {
	button.addEventListener('click', () => {
		calculator.appendnumber(button.innerText);
		calculator.updateDisplay();
	});
});

operationbtn.forEach(button => {
	button.addEventListener('click', () => {
		calculator.chooseOperation(button.innerText);
		calculator.updateDisplay();
	});
});

equalsbtn.addEventListener('click', button => {
		calculator.compute();
		calculator.updateDisplay();
	});

clearbtn.addEventListener('click', button => {
		calculator.clear();
		calculator.updateDisplay();
	});

deletebtn.addEventListener('click', button => {
		calculator.delete();
		calculator.updateDisplay();
	});
