export interface IQuestion {
	name: string;
	optionList: {
		optionLabel: string;
		name: string;
		iscorrect: boolean;
	}[];
	correctAnswer:number
}
