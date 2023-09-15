---
layout: post
title: 'Javascript Closures'
description: 'What are Javascript Closures?'
date: '2023-02-13'
categories: Javascript
permalink: Javascript_closures
---

Closures are an essential concept in JavaScript that can make the code easier to understand and maintain. They allow functions to have a private scope and access to variables within the scope. This tutorial will explain the basics of closures, why they are useful, and how to use them in your code.

## What is a closure?

A closure is a function that has access to variables in its outer scope, even after the outer function has returned. The closure has access to the variables in its outer scope, as well as its own scope, which includes any variables declared within it.

A closure is created when a function is defined within another function. The inner function has access to the variables in the outer function's scope, even after the outer function has returned. The closure can be thought of as a combination of the inner function and the environment in which it was created.

## Why are closures useful?

Closures are useful for many reasons, including:

- Encapsulating state: Closures allow you to create private state that cannot be accessed or modified from outside the closure. This is useful for creating objects with private properties or for managing state in a clean and organized way.

- Preserving state: Closures allow you to preserve state between function calls. For example, you can use a closure to keep track of a counter that increments every time a function is called.

- Implementing modules: Closures are a key aspect of the module pattern, which is a way to create modular and reusable code in JavaScript. Modules can have their own private state and methods, which can only be accessed by other code within the same module.

## How to use closures in JavaScript

To use closures in JavaScript, you simply need to define a function within another function. The inner function will have access to the variables in the outer function's scope, even after the outer function has returned.

Here's an example:

```javascript
function outerFunction(x) {
  return function innerFunction(y) {
    return x + y;
  };
}

const add5 = outerFunction(5);
console.log(add5(3)); // 8
```

In this example, `outerFunction` takes a parameter `x` and returns the inner function `innerFunction`. The inner function takes a parameter `y` and returns the sum of `x` and `y`.

When we call `outerFunction(5)`, it returns the inner function with `x` set to 5. We then assign the returned inner function to a variable `add5`. When we call `add5(3)`, it returns 8, which is the sum of `x` (5) and `y` (3).

Note that the inner function still has access to `x` even after `outerFunction` has returned. This is because the closure has captured the environment in which it was created, including the value of `x`.

## Conclusion

Closures are a powerful and versatile feature in JavaScript that can help you write cleaner, more maintainable code. Whether you're creating objects with private properties, preserving state between function calls, or implementing modules, closures are an essential tool to have in your JavaScript toolbox.
