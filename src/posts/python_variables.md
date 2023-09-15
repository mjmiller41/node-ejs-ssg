---
layout: post
title: 'Python Variables Tutorial'
description: 'Introduction to variables with Python'
date: '2023-02-11'
categories: Python
permalink: python_variables
---

In programming, a variable is a container that holds a value that can be changed during the course of the program. In Python, a variable is created the moment you first assign a value to it. In this tutorial, we will go over the basics of variables in Python.

## Declaring Variables

In Python, you don't need to declare variables before using them. You can simply assign a value to a variable and it will be created automatically. To assign a value to a variable, use the following syntax:

```python
variable_name = value
```

For example:

```python
x = 10
y = 20
name = "John Doe"
```

- In this example, x and y are integer variables, and name is a string variable.

## Variable Names

Variable names in Python can consist of letters, numbers, and underscores, but they cannot start with a number. It is best to keep your variable names meaningful and descriptive, as this makes your code easier to read and understand. For example, instead of using the variable name x, use counter or age instead.

## Data Types

In Python, there are several built-in data types that you can use to store values in variables:

- Integer (**int**): Represents a whole number, such as 42 or -10.
- Float (**float**): Represents a decimal number, such as 3.14 or -0.7.
- String (**str**): Represents a sequence of characters, such as "Hello" or "Goodbye". Strings can be declared with single or double quotes, such as 'Hello' or "Goodbye".
- Boolean (**bool**): Represents a value that is either True or False.
- List (**list**): Represents a collection of values, such as [1, 2, 3].
- Tuple (**tuple**): Represents a collection of values that cannot be changed, such as (1, 2, 3).
- Dictionary (**dict**): Represents a collection of key-value pairs, such as {'key': 'value'}.

You can use the type function to determine the data type of a variable:

```python
x = 10
print(type(x)) # Output: <class 'int'>

y = 3.14
print(type(y)) # Output: <class 'float'>

name = "John Doe"
print(type(name)) # Output: <class 'str'>
```

## Type Conversion

You can use the int, float, and str functions to convert variables from one type to another:

```python
x = 10
y = float(x)
print(y) # Output: 10.0

z = str(y)
print(z) # Output: '10.0'
```

Note that not all conversions are possible. For example, you cannot convert the string "Hello" to an integer, as it does not represent a valid number.

## Operators

In Python, you can perform various operations on variables, such as addition, subtraction, multiplication, and division. The following table lists the most common operators:

| Operator |  Description   |          Example           |
| :------: | :------------: | :------------------------: |
|    +     |    Addition    |         5 + 3 = 8          |
|    -     |  Subtraction   |         5 - 3 = 2          |
|    \*    | Multiplication |        5 \* 3 = 15         |
|    /     |    Division    | 5 / 3 = 1.6666666666666667 |
|    %     |    Modulus     |         5 % 3 = 2          |
|   \*\*   |    Exponent    |       5 \*\* 3 = 125       |

For example:

```python
x = 5
y = 3

print(x + y) # Output: 8
print(x - y) # Output: 2
print(x * y) # Output: 15
print(x / y) # Output: 1.6666666666666667
print(x % y) # Output: 2
print(x ** y) # Output: 125
```

In addition to the basic arithmetic operators, Python also supports several comparison operators, such as < (less than), > (greater than), <= (less than or equal to), >= (greater than or equal to), == (equal to), and != (not equal to). These operators return a Boolean value of True or False.

For example:

```python
x = 5
y = 3

print(x < y) # Output: False
print(x > y) # Output: True
print(x <= y) # Output: False
print(x >= y) # Output: True
print(x == y) # Output: False
print(x != y) # Output: True
```

## Conclusion

In this tutorial, we have covered the basics of variables in Python. We have discussed how to create variables, assign values to them, and determine their data types. We have also covered the various operations that can be performed on variables, such as arithmetic and comparison operations. With these concepts, you should be able to get started using variables in your Python programs.
