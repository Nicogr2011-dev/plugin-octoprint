# coding=utf-8
import octoprint.plugin


class EclipseMinimalPlugin(
    octoprint.plugin.AssetPlugin,
    octoprint.plugin.TemplatePlugin,
    octoprint.plugin.SettingsPlugin,
):

    def get_assets(self):
        return {
            "css": ["css/eclipse.css"],
            "js":  ["js/eclipse.js"],
        }

    def get_settings_defaults(self):
        return {
            "theme": "eclipse_minimal",
        }

    def get_template_configs(self):
        return []

    def get_update_information(self):
        return {
            "eclipse_minimal": {
                "displayName": "Eclipse Minimal Theme",
                "displayVersion": self._plugin_version,
                "type": "github_release",
                "user": "your-github-user",
                "repo": "OctoPrint-EclipseMinimal",
                "current": self._plugin_version,
                "pip": "https://github.com/your-github-user/OctoPrint-EclipseMinimal/archive/{target_version}.zip",
            }
        }


__plugin_name__         = "Eclipse Minimal Theme"
__plugin_version__      = "1.0.0"
__plugin_description__  = "Ultra-minimal premium theme for OctoPrint inspired by Tesla's UI language."
__plugin_author__       = "Nicolas"
__plugin_license__      = "MIT"
__plugin_pythoncompat__ = ">=3.7,<4"

__plugin_implementation__ = EclipseMinimalPlugin()

__plugin_hooks__ = {
    "octoprint.plugin.softwareupdate.check_config": __plugin_implementation__.get_update_information,
}
