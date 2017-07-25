export module FormMasks {
    export const cnpjMask = [
		/[0-9]/, /[0-9]/, '.', 
		/[0-9]/, /[0-9]/, /[0-9]/, '.', 
		/[0-9]/, /[0-9]/, /[0-9]/, '/', 
		/[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/,
		'-',
		/[0-9]/, /[0-9]/
    ];

    const brPhoneNineDigitsMask = [
		'+', /[0-9]/, /[0-9]/, ' ', 
		'(', /[0-9]/, /[0-9]/, ')', ' ', 
		/[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, '-',
		/[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/
	];

    const brPhoneEightDigitsMask = [
		'+', /[0-9]/, /[0-9]/, ' ', 
		'(', /[0-9]/, /[0-9]/, ')', ' ', 
		/[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, '-',
		/[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/
    ];
    
    export function brPhoneMaskFunction(userInput) {
        if (!userInput) {
            return brPhoneEightDigitsMask;
        }

        let numbers = userInput.match(/\d/g);
        let numberLength = 0;
        if (numbers) {
            numberLength = numbers.join("").length;
        }

        if (numberLength > 12) {
            return brPhoneNineDigitsMask;
        } 

        return brPhoneEightDigitsMask;        
    }
}