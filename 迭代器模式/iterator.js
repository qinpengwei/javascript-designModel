/*
* 实现自己的简单迭代器
* 这个属于内部迭代器
* 内部迭代器在函数内部完成了迭代规则，如for按顺序循环迭代，完全接手整个迭代过程，外部只需一次调用即可
* */
var each = function (arr, callback) {
  for(var i=0; i<arr.length; i++) {
    callback.call(arr[i], i, arr[i])
  }
}

/*
* 比较两个数组是否相等
* */

var compare = function (arr1, arr2) {
  if(arr1.length !== arr2.length) {
    throw new Error('arr1 和 arr2不相等')
  }
  each(arr1, function (i, n) {
    if(n !== arr2[i]) {
      throw new Error('arr1 和 arr2不相等')
    }
  });
  alert(arr1 +'和'+arr2+'相等')
}

/*
* 外部迭代器
*外部迭代器必须显示的请求迭代下一个元素
* 外部迭代器增加了一些调用的复杂度，但是也增强了迭代器的灵活性，我们可以手工控制迭代的过程或顺序
*
* */
var iterator = function (obj) {
  var current =0;
  var next = function () {
    current += 1
  }
  var isDone = function () {
    return current >= obj.length;
  }
  var getCurrItem = function () {
    return obj[current]
  }

  return {
    next: next,
    isDone: isDone,
    getCurrItem: getCurrItem
  }
}

var compare1 = function (iterator1, iterator2) {
  while(!iterator1 && !iterator2) {
    if(iterator1.getCurrItem() !== iterator2.getCurrItem()) {
      throw new Error('iterator和iterator2不相等')
    }
    iterator1.next();
    iterator2.next();
  }
  alert('iterator和itetator相等')
}

/*
* 迭代类数组对象和字面量对象
* 只要被迭代的聚合对象拥有length属性而且可以用下标来访问，那么它就可以被迭代
* for in 可以用来迭代普通的字面量对象
* jQuery的$.each 函数封装了各种迭代行为
* */
$.each = function (obj, callback) {
  var value,
      i = 0,
      length = obj.length,
      isArray = isArraylike(obj);
  if(isArray) {
    for(; i < length; i++) {
      value = callback.call(obj[i], i, obj[i])
      if(value === false) { // value callback 回调函数返回false，则终止迭代
        break;
      }
    }
  } else {
    for (i in obj) {
      value = callback.call(obj[i], i, obj[i])
      if(value === false) { // value callback 回调函数返回false，则终止迭代
        break;
      }
    }
  }
  return obj
}

/*
* 倒叙迭代器
*
* */
var reverseEach = function (arr, callback) {
  for(var l = arr.length-1; l>=0; l-- ){
    callback.call(arr[l], l, arr[l])
  }
}


/*
* 中止迭代器
* 迭代器可以像普通for循环中的break一样，提供一种跳出循环的方法，我们可以约定如果回调函数返回false，则提前终止循环
*
* */

var each2  = function (arr, callback) {
  for(var i=0;i<arr.length;i++) {
    if(callback(i,arr[i] === false)) {
      break;
    }
  }
}

each2([1,2,3,4,5],function (i,n) {
  if(n>3) {
    return false
  }
  console.log(n)
})




