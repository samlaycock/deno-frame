lint:
	deno lint

fmt:
	deno fmt

test:
	make test_clean && deno test --allow-env --allow-read --fail-fast --coverage=.cov_profile lib/$(module)

test_watch:
	deno test --allow-env --allow-read --fail-fast --watch lib/$(module)

test_clean:
	rm -rf ./.cov_profile

test_coverage:
	deno coverage .cov_profile

test_coverage_generate:
	deno coverage .cov_profile --lcov > .cov_profile/cov_profile.lcov && \
	genhtml -o .cov_profile/html .cov_profile/cov_profile.lcov

test_coverage_serve:
	cd .cov_profile/html && \
	deno run --allow-net --allow-read https://deno.land/std@0.106.0/http/file_server.ts

test_full:
	make test && \
	make test_coverage && \
	make test_coverage_report
