serve:
	hugo server -D

build:
	hugo --cleanDestinationDir --minify

pdf:
	cat ./public/all-content/index.html | sed 's|/images/|./public/images/|g' | wkhtmltopdf --outline-depth 2 --enable-local-file-access --allow ./public/images - ./public/all-content.pdf