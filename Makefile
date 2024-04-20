serve:
	hugo server -D

build:
	hugo --cleanDestinationDir --minify

pdf:
	cat ./public/all-content/index.html | sed 's|/images/|./static/images/|g' | wkhtmltopdf --outline-depth 2 --enable-internal-links --enable-local-file-access - ./public/all-content.pdf