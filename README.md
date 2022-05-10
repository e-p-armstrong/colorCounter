# This color counter...

Counts colors. What a surprise. 

Serious version: uses fs.readfile to access a text file, and checks how many times each color appears in that text file. Inspired by an annoying school assignment that asked me to pick through an entire short story to find all the colors that appeared in it.

Ain't nobody got time for that. They do however have time to try and figure out how the hell readFile works before eventually saying "screw it" after an hour and just using readFileSync because I can't be bothered to figure out how to promisify something so that it actually makes sense.

Feel free to copy this and slot in your own, actual files, should you also have an annoying assignment like I did. Or you can use it to find out how many times each color appears in your favourite story. It works for that too.