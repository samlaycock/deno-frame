clean:
	rm -rf ./.cov_profile

lint:
	deno lint

fmt:
	deno fmt

test:
	deno test --allow-env --allow-read --fail-fast --coverage=.cov_profile

coverage:
	deno coverage .cov_profile

test_coverage:
	make clean && make test && make coverage
