ifdef module
MODULE := $(module)
else
MODULE := *
endif

.PHONY: test

lint:
	deno lint --config=deno.json

fmt:
	deno fmt --config=deno.json --check

cache:
	deno cache --no-check lib/$(MODULE)/*deps.ts

test:
	make test_clean
	deno test --no-check --allow-all --fail-fast --coverage=.cov_profile lib/$(MODULE)

test_watch:
	deno test --no-check --allow-all --fail-fast --watch lib/$(MODULE)

test_integration:
	docker compose -p frame -f test/docker-compose.yml up -d
	sleep 5
	deno test --no-check --allow-all test/integration/**/$(MODULE)_test.ts
	docker compose -p frame -f test/docker-compose.yml stop

test_clean:
	rm -rf ./.cov_profile

test_coverage:
	deno coverage --exclude="test\.(js|mjs|ts|jsx|tsx)|lib/aws/_build|(sqs|s3|redis)/driver\.ts" .cov_profile

test_coverage_generate:
	deno coverage .cov_profile --lcov > .cov_profile/cov_profile.lcov
	genhtml -o .cov_profile/html .cov_profile/cov_profile.lcov

test_coverage_serve:
	cd .cov_profile/html
	deno run --allow-net --allow-read https://deno.land/std@0.106.0/http/file_server.ts

test_full:
	make test
	make test_coverage
	make test_coverage_report

build_aws:
	npm --prefix=build run build:aws
