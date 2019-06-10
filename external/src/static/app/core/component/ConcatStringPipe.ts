import { Pipe, PipeTransform } from '@angular/core';

/**
 * This pipe adds '...' at the end of string if string lenght exceeds specified threshold.
 * 
 * @example : 'Woods Canyon Lake | concatString :10 ' = 'Woods Cany...'
 */
@Pipe({ name: 'concatString' })
export class ConcatStringPipe implements PipeTransform {
    transform(value: string | any,totalLen:number ) {
        let finalString: string;
       

        if (!value) {
            return '';
        }

        if (typeof value === 'string') {
            if(!totalLen || totalLen<=0){
            totalLen=8;
            }
            if(value.length > totalLen){
                finalString = value.substring(0,totalLen);
                finalString+="...";
            }
            else{
                finalString = value;
            }
            
            
        } else {
            finalString ="";
        }

       
        return finalString;
    }

    private appendSpace(inputString:string,desiredStrLen:number){
        while(inputString.length-1<=desiredStrLen){
            inputString=inputString+' ';
        }

        return inputString;
    }

}
