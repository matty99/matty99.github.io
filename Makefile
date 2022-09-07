help:
	@cat $(MAKEFILE_LIST) | grep -E '^[a-zA-Z_-]+:.*?## .*$$' | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}' | sort

start: ## Start local development server
	bundle exec jekyll serve --baseurl=""

minify-images: ## Minify post images and logos in the images directory
	find . -name "assets/images/*.jpg" -exec jpegoptim -m80 -o -p --strip-all {} \;
	find . -name "assets/images/*.png" -exec optipng -o7 {} \;

%:
	@# Helper for `help`
	@:

.PHONY: help start minify-images
.DEFAULT_GOAL := help
