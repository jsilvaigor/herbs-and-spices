serve:
	hugo server -D

build:
	hugo --cleanDestinationDir --minify

pdf:
	cat ./public/all-content/index.html | wkhtmltopdf --outline-depth 2 --enable-internal-links - ./public/all-content.pdf