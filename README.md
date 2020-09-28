```
npm install // install node modules
```

```
Usage: index [options]

Options:
  -s, --shift <int>        should be a number of shift
  -i, --input <filepath>   should be a path to an input file
  -o, --output <filepath>  should be a path to an output file
  -a, --action <action>    should be one of actions such as 'encode' or 'decode'
  -h, --help               display help for command
```

```
node index.js -h // print help message
```

```
// Example
node index.js -a decode -s -2 -i input.txt -o output.txt  
```
