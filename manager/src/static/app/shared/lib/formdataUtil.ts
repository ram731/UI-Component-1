'use strict'

export class FormDataUtil{

    
    private static  isUndefined (value) {
    return value === undefined
  }
  
  private static   isNull (value) {
    return value === null
  }
  
  private static   isObject (value) {
    return value === Object(value)
  }
  
  private static    isArray (value) {
    return Array.isArray(value)
  }
  
  private static   isDate (value) {
    return value instanceof Date
  }
  
  private static   isBlob (value) {
    return value &&
      typeof value.size === 'number' &&
      typeof value.type === 'string'}
  
  private static   isFile (value) {
    return this.isBlob(value) &&
      (typeof value.lastModifiedDate === 'object' || typeof value.lastModified === 'number') &&
      typeof value.name === 'string'
  }
  
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

