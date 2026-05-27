#!/usr/bin/env python
# coding=utf-8

plugin_identifier  = "eclipse_minimal"
plugin_package     = "octoprint_eclipse"
plugin_name        = "Eclipse Minimal Theme"
plugin_version     = "1.0.0"
plugin_description = "Ultra-minimal premium theme for OctoPrint inspired by Tesla's UI language."
plugin_author      = "Nicolas"
plugin_author_email = ""
plugin_url         = "https://github.com/your-github-user/OctoPrint-EclipseMinimal"
plugin_license     = "MIT"

plugin_requires = ["OctoPrint"]

from setuptools import setup

setup(
    name=plugin_name,
    version=plugin_version,
    description=plugin_description,
    author=plugin_author,
    author_email=plugin_author_email,
    url=plugin_url,
    license=plugin_license,
    packages=[plugin_package],
    package_data={plugin_package: [
        "static/css/*.css",
        "static/js/*.js",
        "templates/*.jinja2",
    ]},
    install_requires=plugin_requires,
    entry_points={
        "octoprint.plugin": [
            f"{plugin_identifier} = {plugin_package}",
        ]
    },
)
