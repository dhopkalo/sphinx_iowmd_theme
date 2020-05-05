from setuptools import setup
from sphinx_iowmd_theme import __version__

setup(
    name = 'sphinx_iowmd_theme',
    version = __version__,
    author = 'Brian Butler',
    author_email= 'bbutler@iponweb.net',
    url="https://github.com/zaniphrom/sphinx_iowmd_theme",
    docs_url="https://github.com/zaniphrom/sphinx_iowmd_theme",
    description='Sphinx Material Design Theme',
    # long_description=open("README.rst").read(),
    packages = ['sphinx_iowmd_theme'],
    include_package_data=True,
    license= 'MIT License',
    classifiers=[
        "Development Status :: 5 - Production/Stable",
        "Environment :: Web Environment",
        "Intended Audience :: Developers",
        "Intended Audience :: System Administrators",
        "License :: OSI Approved :: MIT License",
        "Operating System :: OS Independent",
        "Programming Language :: Python",
        "Topic :: Internet",
        "Topic :: Software Development :: Documentation"
    ],
    entry_points = {
        'sphinx.html_themes': [
            'sphinx_iowmd_theme = sphinx_iowmd_theme',
        ]
    }
)
