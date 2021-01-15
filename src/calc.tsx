
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
	sin(x:number){
				if (!this.isRAD){
					return Math.sin(x * (Math.PI /180));
				}
				else{
					return Math.sin(x);
				}
		}
	cos(x:number){
		if (!this.isRAD){
			return Math.cos(x * (Math.PI /180));
		}
		else{
			return Math.cos(x);
		}
	}
	tan(x:number){
		
		return this.sin(x) / this.cos(x);
	}

	sinINV(x:number){
		return 1 / this.sin(x);
	}
	cosINV(x:number){
		return 1 / this.cos(x);
	}

	tanINV(x:number){
		return 1 / this.tan(x);
	}
	round(x:number,n:number){

		n = (10**n);

		let temp_x = x * n ;
		temp_x = Math.round(temp_x);
		x = temp_x / n;
		if (x || x===0){return x}
		else {return ""}
		
	}
	factorial(x:number){
		var rval = 1;
		for (let i = 2 ; i <= x ; i++){
			rval = rval * i;
		}
		return rval;
	}

	genJsString(input:Array<string>){
		let inputSlice = input.slice();

		let replacements = {
			"π":"Math.PI",
			"×":"*",
			"÷":"/",
			"^":"**",
			"%":"/100",
			"sin(":"this.sin(",
			"tan(":"this.tan(",
			"cos(":"this.cos(",
			"e":"Math.E",
			"√(":"Math.sqrt(",
			"ln(":"Math.log(",
			"log(":"Math.log10(",
			"!(":"this.factorial(",
			"^2":"**2",
			"sin⁻¹(":"this.sinINV(",
			"cos⁻¹(":"this.cosINV(",
			"tan⁻¹(":"this.tanINV("
		}

		inputSlice = Calc.replaceAll(inputSlice,replacements);
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
			"√":"√(",
			"!":"!(",
			"x²":"^2",
			"sin⁻¹":"sin⁻¹(",
			"cos⁻¹":"cos⁻¹(",
			"tan⁻¹":"tan⁻¹("
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

		let displayDataVal =this.genJsString(displayData) ;
		try{
			displaySubVal = eval(displayDataVal).toString();
		}
		catch(e){
			try{
				displayDataVal += ")";
				displaySubVal = eval(displayDataVal).toString();
				}
			catch{}
		}
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
        
		displaySubVal = this.round(parseFloat(displaySubVal),4).toString()
		return [displayData,displayMainVal,displaySubVal]
	}
}

export default Calc;
