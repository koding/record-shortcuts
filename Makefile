all: transpile test

transpile:
	rm -f index.js
	./node_modules/.bin/coffee -p -b index.coffee > index.js

test:
	./node_modules/.bin/mochify \
			--require should \
			--reporter spec \
			./test.js
