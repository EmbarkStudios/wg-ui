# Changelog
All notable changes to this project will be documented in this file.

<!-- next-header -->
## [Unreleased]

## [v1.2.1] - 2021-07-27
### Fixes
- [PR#139](https://github.com/EmbarkStudios/wg-ui/pull/139) Fix for versioned docker releases.

## [v1.2.0] - 2021-07-26
### Added
- [PR#113](https://github.com/EmbarkStudios/wg-ui/pull/113) Adding AWS ALB-specific header for username. Thanks to [@justnom](https://github.com/justnom)!
- [PR#86](https://github.com/EmbarkStudios/wg-ui/pull/86) User sapce image for Docker. Thanks to [@m0ssc0de](https://github.com/m0ssc0de)!
- [PR#80](https://github.com/EmbarkStudios/wg-ui/pull/80) Shibboleth SP documentation. Thanks to [@theseal](https://github.com/theseal)!
- [PR#79](https://github.com/EmbarkStudios/wg-ui/pull/79) Google SSO documentation.

### Fixes
- [PR#136](https://github.com/EmbarkStudios/wg-ui/pull/136) Prevent full reload of wireguard interface. Thanks to [@gertdreyer](https://github.com/gertdreyer)!
- [PR#135](https://github.com/EmbarkStudios/wg-ui/pull/135) Remove external dependencies for embedding assets. Thanks to [@thomasf](https://github.com/thomasf)!
- [PR#114](https://github.com/EmbarkStudios/wg-ui/pull/114) Add docker-compose example. Thanks to [@ilyazzz](https://github.com/ilyazzz)!
- [PR#70](https://github.com/EmbarkStudios/wg-ui/pull/70) Disable CGO. Thanks to [@condemil](https://github.com/condemil)!

## [v1.1.0] - 2020-05-06
### Added 
- [PR#49](https://github.com/EmbarkStudios/wg-ui/pull/49) Set name and label at creation of client. Thanks to [@spetzreborn](https://github.com/spetzreborn)!
- [PR#47](https://github.com/EmbarkStudios/wg-ui/pull/47) Add limit in how many configurations each user may have. Thanks to [@spetzreborn](https://github.com/spetzreborn)!
- [PR#44](https://github.com/EmbarkStudios/wg-ui/pull/44) Add timestamp to config. Thanks to [@spetzreborn](https://github.com/spetzreborn)!
- [PR#41](https://github.com/EmbarkStudios/wg-ui/pull/41) Add `--no-nat` flag to disable NAT, NAT remains on by default.

### Fixed
- [PR#57](https://github.com/EmbarkStudios/wg-ui/pull/57) Fix gosec issues. Thanks to [@Sohalt](https://github.com/Sohalt)!
- [PR#50](https://github.com/EmbarkStudios/wg-ui/pull/50) Update documentation for configuration. Thanks to [@Sohalt](https://github.com/Sohalt)!
- [PR#35](https://github.com/EmbarkStudios/wg-ui/pull/35) Avoid "async race" with new client POST. Thanks to [@sclem](https://github.com/sclem)!
- [PR#31](https://github.com/EmbarkStudios/wg-ui/pull/31) Only enable IP forwarding if it is disabled. Thanks to [@eest](https://github.com/eest)!

### Changed
- Name of project changed from `wireguard-ui` to `wg-ui`

## [v1.0.0] - 2019-10-12
### Added
- This is the initial release of wireguard-ui

<!-- next-url -->
[Unreleased]: https://github.com/EmbarkStudios/wg-ui/compare/v1.2.1...HEAD
[v1.2.1]: https://github.com/EmbarkStudios/wg-ui/compare/v1.2.0...v1.2.1
[v1.2.0]: https://github.com/EmbarkStudios/wg-ui/compare/v1.1.0...v1.2.0
[v1.1.0]: https://github.com/EmbarkStudios/wg-ui/compare/v1.0.0...v1.1.0
[v1.0.0]: https://github.com/EmbarkStudios/wg-ui/releases/tag/v1.0.0
