# Changelog

All notable changes to this project will be documented in this file.

## [1.1.1] - 2026-09-07

### Fixed

- **UI** — settings changed in the popup didn't actually apply until you reloaded the tab. Annoying. Now the tab picks up changes automatically, no reload needed.

## [1.1.0] - 2026-09-05

### Added

- **Collect to File** — optionally gather every copied selection into an editable buffer, with the option to load an existing file to continue appending to, and export everything as a single file when you're done.

### Security

- Fixed unsafe `innerHTML` usage to avoid XSS vulnerabilities

## [1.0.1] - 2026-05-05

### Fixed

- Resolve icon size warnings

## [1.0.0] - 2026-05-02

### Added

- Initial release of `omni-copy`
