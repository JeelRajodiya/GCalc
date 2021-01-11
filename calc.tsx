class Calc{
	public isRAD:boolean;
	private memory:string;
	constructor(){
		this.isRAD = false;
		this.memory = ""
	}
	static resolve(displayData:Array<string>){
		let event = displayData[displayData.length-1]
		if (event ==="←"){
			displayData.pop();
			displayData.pop();
		}

		let sin = Math.sin;
		let cos = Math.cos;

		let displayMainVal = displayData.join("");
		let displaySubVal = "";

		try{
			let displayDataVal = displayMainVal;
			displayDataVal = displayDataVal.replace("×","*");
			displayDataVal = displayDataVal.replace("÷","/");
			displayDataVal = displayDataVal.replace("^","**");
			if (event === "="){
				displayDataVal = displayDataVal.replace("=","")
			}
			displaySubVal = eval(displayDataVal).toString();
			
		}
		catch(e){}
		if (event === "="){
			displayMainVal = displaySubVal;
			displaySubVal = ""
			displayData = [displayMainVal];
		}
		
		return [displayData,displayMainVal,displaySubVal]
	}
}

export default Calc;