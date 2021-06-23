install: #Install all packages
	npm ci

lint:
	npx eslint .

test:
	npx -n --experimental-vm-modules jest

publish: #Publish a package to the registry so that it can be installed by name.
	npm publish --dry-run
