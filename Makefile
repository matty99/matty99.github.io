help:
	@cat $(MAKEFILE_LIST) | grep -E '^[a-zA-Z_-]+:.*?## .*$$' | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}' | sort

start: ## Start local development server
	bundle exec jekyll serve --config _config_dev.yml

minify-images: ## Minify post images and logos in the images directory
	node_modules/.bin/gulp images ## TODO: move to pure command line

blog-post: ## Create new post in blog folder
	touch blog/_posts/`date +%Y-%m-%d`-new-post.md

ramen-post: ## Create new post in ramen folder
	touch ramen/_posts/`date +%Y-%m-%d`-new-post.md

%:
	@# Helper for `manage`
	@:

.PHONY: help start minify-images blog-post ramen-post
.DEFAULT_GOAL := help
