import { Injectable, ErrorHandler } from '@angular/core';


@Injectable()
export class MyDeqErrorHandler implements ErrorHandler {

    handleError(error) {
        console.log('Exception : ', error);
    }

    getErrors = (dataStr) => {
        const data = this.getErrorObject(dataStr);

        let messages: any[] = [];

        if (data.system_error && data.system_error.length) {
            data.system_error.forEach((error) => {
                if (error.error_message !== null) {
                    messages.push(<string>error.error_message);
                } else {
                    messages.push(<string>error.error_code);
                }
            });
        }

        if (data.error_code_list && data.error_code_list.length) {
            data.error_code_list.forEach((error) => {
                if (error.error_message !== null) {
                    messages.push(error.error_message);
                } else {
                    messages.push(error.error_code);
                }
            });
        }

        // if messages and fields are both null, data itself is the error message
        if (messages.length === 0) {
            messages.push("Service temporarily unavailable. Please retry after some time.");
            //messages.push(data.message);
        }

        return messages;
    }

    getErrorFields = (dataStr) => {
        const data = this.getErrorObject(dataStr);
        // get fields
        // let fields: any[] = [];
        let fields: any = {};
        // let fieldLevelErrors = false;
        if (data.error_fields && data.error_fields.length) {
            data.error_fields.forEach((errorField) => {
                fields[errorField.field_id] = true;
                // fieldLevelErrors = true;
                // fields[errorField.field_id + 'Code'] = errorField.error_code;

                // get message corresponding to that field_id
                /*  if (data.error_code_list && data.error_code_list.length) {
                      for (var i = 0; i < data.error_code_list.length; i++) {

                          var errorCodeList = data.error_code_list[i];
                          if (errorCodeList.error_code === fields[errorField.field_id + 'Code']) {
                              fields[errorField.field_id + 'Message'] = errorCodeList.error_message;
                              break;
                          }
                      }
                  } */
            });
        }
        return fields
    }

    getAlertMessage = (dataStr: any) => {
        const data = this.getErrorObject(dataStr);
        return data.alert_message;

    }

    getErrorObject = (errorJson) => {
        let errorObj;
        if (!errorJson || errorJson === '') {
            return;
        }
        if (!(errorJson instanceof Object)) {
            try {
                errorObj = JSON.parse(errorJson);
            } catch (e) {
                return;
            }
        } else {
            errorObj = errorJson
        }
        return errorObj;
    }
}
