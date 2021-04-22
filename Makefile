
.PHONY: test
test:
	sass src/scss/sphinx_materialdesign_theme.scss ../reims/docs/_build/html/_static/sphinx_materialdesign_theme.css --style=compressed
	@echo
	@echo "Build finished. The HTML pages are in BidCore Docs."

.PHONY: build
build:
	sass src/scss/sphinx_materialdesign_theme.scss sphinx_iowmd_theme/static/sphinx_materialdesign_theme.css --style=compressed
	@echo
	@echo "Build finished. The HTML pages are in sphinx_iowmd_theme/_static/sphinx_materialdesign_theme.css."

.PHONY: clean
clean:
	rm -rf build dist sphinx_iowmd_theme.egg-info
	@echo
	@echo "Clean Build Folder"

.PHONY: pypi
pypi:
	python setup.py sdist bdist_wheel
	@echo
	@echo "Latest Version Built"


.PHONY: check
check:
	twine check dist/*
	@echo
	@echo "Twine Build Checked"
