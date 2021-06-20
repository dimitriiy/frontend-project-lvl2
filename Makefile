install: #Install all packages
	npm ci

lint:
	npx eslint .

publish: #Publish a package to the registry so that it can be installed by name.
	npm publish --dry-run
