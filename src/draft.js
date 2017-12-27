const watch = (object, onChange) => {
   const handler = {
       /*  
           如果 target[property] 为对象时递归代理，否则返回属性值
           @param {object} target
           @param {string} property
           @param {object} [receiver]
       */
       get (target, property, receiver) {
       		console.log('get',target,property)
           try {
               return new Proxy(target[property], handler)
           } catch (err) {
               return Reflect.get(target, property, receiver)
           }
       },
       
       /*
           当对象赋值的时候，触发的代理方法（如果有 set 代理， 则触发 set 代理，否则触发该方法）
           @param {object} target
           @param {string} property
           @param {object} descriptor
       */
       defineProperty (target, property, descriptor) {
       	console.log('defineProperty',target,property)
           onChange() // 赋值时触发回调函数
           return Reflect.defineProperty(target, property, descriptor)
       },
       
       /*
           当删除对象属性时触发的代理方法
           @param {object} target
           @param {string} property
       */
       deleteProperty (target, property) {
       	console.log('deleteProperty',target,property)
           onChange() // 删除属性时触发回调函数
           return Reflect.deleteProperty(target, property)
       }
   }
   
   return new Proxy(object, handler)
}

// demo
let obj = {
   a: 123,
   b: {
       c: 333
   },
   d:10,
   e:{
   		f:456
   }
}
let i = 0
let watchObj = watch(obj, () => {console.log('Object changed:', ++i)})
watchObj.a=3
watchObj.k={name:'amy',age:10}
watchObj.b.c=89
// => 'Object changed: 1'
// watchObj.b.c = 444
// console.log(watchObj)
//=> 'Object changed: 2'

