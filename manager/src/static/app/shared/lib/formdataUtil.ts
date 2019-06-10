'use strict'
/**
 * FormDataUtil provides utility methods for form fields.
 */
export class FormDataUtil{

    /**
     * Validates if input value is 'undefined'.
     * 
     * @returns boolean
     */
    private static  isUndefined (value) {
    return value === undefined
  }
  
  /**
     * Validates if input value is null.
     * 
     * @returns boolean
     */
  private static   isNull (value) {
    return value === null
  }
  
  /**
     * Validates if input value is Object.
     * 
     * @returns boolean
     */
  private static   isObject (value) {
    return value === Object(value)
  }
  
  /**
     * Validates if input value is Array.
     * 
     * @returns boolean
     */
  private static    isArray (value) {
    return Array.isArray(value)
  }
  
  /**
     * Validates if input value is Date.
     * 
     * @returns boolean
     */
  private static   isDate (value) {
    return value instanceof Date
  }
  
  /**
     * Validates if input value is Blob.
     * 
     * @returns boolean
     */
  private static   isBlob (value) {
    return value &&
      typeof value.size === 'number' &&
      typeof value.type === 'string'}
  
  /**
     * Validates if input value is File.
     * 
     * @returns boolean
     */
  private static   isFile (value) {
    return this.isBlob(value) &&
      (typeof value.lastModifiedDate === 'object' || typeof value.lastModified === 'number') &&
      typeof value.name === 'string'
  }
  
  /**
     * Validates if input value is FormData.
     * 
     * @returns boolean
     */
  private static isFormData (value) {
    return value instanceof FormData
  }

 public static objectToFormData (obj, cfg=null, fd=null, pre=null) {
    if (this.isFormData(cfg)) {
      pre = fd
      fd = cfg
      cfg = null
    }
  
    cfg = cfg || {}
    cfg.indices = cfg.indices || false
    fd = fd || new FormData()
  
    if (this.isUndefined(obj)) {
      return fd
    } else if (this.isNull(obj)) {
      fd.append(pre, '')
    } else if (this.isArray(obj)) {
      if (!obj.length) {
        var key = pre + '[]'
  
        fd.append(key, '')
      } else {
        obj.forEach( (value, index) =>{
          var key = pre + '[' + (cfg.indices ? index : '') + ']'
  
          this.objectToFormData(value, cfg, fd, key)
        })
      }
    } else if (this.isDate(obj)) {
      fd.append(pre, obj.toISOString())
    } else if (this.isObject(obj) && !this.isFile(obj) && !this.isBlob(obj)) {
      Object.keys(obj).forEach( (prop) =>{
        var value = obj[prop]
  
        if (this.isArray(value)) {
          while (prop.length > 2 && prop.lastIndexOf('[]') === prop.length - 2) {
            prop = prop.substring(0, prop.length - 2)
          }
        }
  
        var key = pre ? (pre + '[' + prop + ']') : prop
  
        this.objectToFormData(value, cfg, fd, key)
      })
    } else {
      fd.append(pre, obj)
    }
  
    return fd
  }
}

