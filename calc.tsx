class Calc{
	public isRAD:boolean;
	private memory:string;

	constructor(){
		this.isRAD = false;
		this.memory = ""
	}

	static replaceAll(displayData:Array<string>,replacements:any){
		for (let i = 0; i<displayData.length ; i++){
			let cur = displayData[i];
			if ( replacements.hasOwnProperty(cur) ){
				//@ts-ignore
				displayData[i] = replacements[cur];
				}
			}
			return displayData;
		}


	static genJsString(input:Array<string>){
		let inputSlice = input.slice();
		let replacements = {
			"π":"Math.PI",
			"×":"*",
			"÷":"/",
			"^":"**",
			"%":"/100",
			"sin(":"Math.sin(",
			"tan(":"Math.tan(",
			"cos(":"Math.cos(",
			"e":"Math.E"
		}

		inputSlice = this.replaceAll(inputSlice,replacements);
		let jsString = inputSlice.join("");

		return jsString;
	}

	static genValidData(input:Array<string>){

		let replacements = {
			"sin":"sin(",
			"tan":"tan(",
			"cos":"cos(",
			"log":"log(",
			"ln":"ln(",
			"√":"√("
		}
		input = this.replaceAll(input,replacements);

		return input;
	}

  resolve(displayData:Array<string>,event:string){

		if (event ==="←"){
			displayData.pop();
		}
		else if (event !=="="){
			displayData.push(event);
		}

		displayData = Calc.genValidData(displayData);
		let displayMainVal = displayData.join("");
		let displaySubVal = "";

		try{
			let displayDataVal = Calc.genJsString(displayData) ;
			displaySubVal = eval(displayDataVal).toString();
		}
		catch(e){}
		if (event === "="){
			displayMainVal = displaySubVal;
			displaySubVal = ""
			displayData = [displayMainVal];
		}
		else if (event === "C"){
			displayMainVal = "";
			displaySubVal = "";
			displayData = [];
		}

		return [displayData,displayMainVal,displaySubVal]
	}
}

export default Calc;
