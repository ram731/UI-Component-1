import { Pipe, PipeTransform } from '@angular/core';

/**
 * This pipe converts phone object to string.
 * 
 * @example : {{{"phoneType":null,"phoneCountryCode":"","phoneAreaCode":"","phoneNumber":"4561237890","ext":"235"} | phone}} = '456-123-7890 Ext:235'
 */
@Pipe({ name: 'phone' })
export class PhonePipe implements PipeTransform {
    transform(value: string | any) {
        let phoneNumber: string;
        let phoneExt: string;

        if (value instanceof Object) {
            if (value.phoneAreaCode && value.phoneAreaCode !== '') {
                phoneNumber = value.phoneAreaCode + value.phoneNumber;
            } else if (value.faxAreaCode && value.faxAreaCode !== '') {
                phoneNumber = value.faxAreaCode + value.faxNumber;
            } else if (value.faxNumber && value.faxNumber !== '') {
                phoneNumber = value.faxNumber;
            } else if (value.phone && value.phone !== '') {
                phoneNumber = value.phone;
            } else if (value.fax && value.fax !== '') {
                phoneNumber = value.fax;
            } else {
                phoneNumber = value.phoneNumber;
            }

            if (value.phoneExtension && value.phoneExtension !== '') {
                phoneExt = value.phoneExtension;
            } else {
                phoneExt = value.ext;
            }

        } else {
            phoneNumber = value;
        }

        if (!phoneNumber) {
            return '';
        }

        phoneNumber = phoneNumber.replace(/\D+/g, '');

        let phoneLen: number = phoneNumber.length;

        let newStr = '';

        if (phoneLen > 10) {
            const countryCodeLen: number = phoneLen - 10;
            newStr = phoneNumber.substr(0, countryCodeLen) + ' - ';
            const temp1: string = phoneNumber.substr(2, phoneLen);
            phoneNumber = temp1;
            phoneLen = phoneNumber.length;
        }

        let i = 0;
        for (; i < (Math.floor(phoneLen / 3) - 1); i++) {
            newStr = newStr + phoneNumber.substr(i * 3, 3) + '-';
        }
        let temp: number = (i + 1) * 2;
        if (i < 2) {
            temp = temp - 1;
        }
        i = temp;
        if (phoneExt && phoneExt !== '') {
            return newStr + phoneNumber.substr(i) + ' Ext: ' + phoneExt;
        }
        return newStr + phoneNumber.substr(i);
    }
}
