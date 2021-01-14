class Calc{
	public isRAD:boolean;
	private memory:string;

	constructor(){
		this.isRAD = false;
		this.memory = ""
	}

	static replaceAll(displayData:Array<string>,find:string,replace:string){
		for (let i = 0; i<displayData.length ; i++){
			let cur = displayData[i];
			if (cur === find){
				displayData[i] = replace;
				}
			}
			return displayData;
		}


	static genJsString(input:Array<string>){
		let inputSlice = input.slice();
		inputSlice = this.replaceAll(inputSlice,"×","*")
		inputSlice = this.replaceAll(inputSlice,"÷","/")
		inputSlice = this.replaceAll(inputSlice,"^","**")
		inputSlice = this.replaceAll(inputSlice,"π",Math.PI.toString())
		inputSlice =this.replaceAll(inputSlice,"%","/100");
		let jsString = inputSlice.join("");
		return jsString;
	}

  resolve(displayData:Array<string>,event:string){

		if (event ==="←"){
			displayData.pop();
		}
		else if (event !=="="){
			displayData.push(event);
		}

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
