# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [1.3.1](https://bitbucket.org/creativemind1/sakeenah-backend/compare/v1.3.0...v1.3.1) (2020-06-20)


### Bug Fixes

* **audio-size-limit:** Audio mp3 size limit has been increased to 25MB ([fd97766](https://bitbucket.org/creativemind1/sakeenah-backend/commit/fd977663978cef036fa67fdb8641d13507e89bac))

## [1.3.0](https://bitbucket.org/creativemind1/sakeenah-backend/compare/v1.2.5...v1.3.0) (2020-05-30)


### Features

* **adding-logs:** Adding consoles for request and response for checking logs from third-party tools like logentries and papertrailapp ([5fde2d3](https://bitbucket.org/creativemind1/sakeenah-backend/commit/5fde2d35cbc7f6488578547832c3ccdfa35f762d))


### Bug Fixes

* **remove-consoles:** Removing unnecessary and unimportant console.logs and some small formattings ([a96b30f](https://bitbucket.org/creativemind1/sakeenah-backend/commit/a96b30fabf9d0cd26fec6adf308800e909dbc776))

### [1.2.5](https://bitbucket.org/creativemind1/sakeenah-backend/compare/v1.2.4...v1.2.5) (2020-05-29)

### Bug Fixes

* **audio-episode-limit:** Increase the limit of audio episodes from 19 to 30 ([8d9e9a5](https://bitbucket.org/creativemind1/sakeenah-backend/commit/8d9e9a55ff68e30ae82219d93a00a6b266c5b75b))

### [1.2.4](https://bitbucket.org/creativemind1/sakeenah-backend/compare/v1.2.3...v1.2.4) (2020-05-27)

### Bug Fixes

* **delete-single-audio:** CMS: Deleting audio fixed ([eb26b4b](https://bitbucket.org/creativemind1/sakeenah-backend/commit/eb26b4bc49a3f311bd7ff6c639d738a104ca908b))

### [1.2.3](https://bitbucket.org/creativemind1/sakeenah-backend/compare/v1.2.2...v1.2.3) (2020-05-27)

### Bug Fixes

* **audio/mpeg-format-mp3:** Another type of mp3 which is audio/mpeg has been added. Author title changed to Narrator in playlist component page in cms page ([8c23f4e](https://bitbucket.org/creativemind1/sakeenah-backend/commit/8c23f4ed8587295113c0cc9b6d7a0f6028da4e00))

### [1.2.2](https://bitbucket.org/creativemind1/sakeenah-backend/compare/v1.2.1...v1.2.2) (2020-05-15)

### Bug Fixes

* **updating-apple-receipt:** Handling for duplicate records for Apple verify receipt ([4dbd26a](https://bitbucket.org/creativemind1/sakeenah-backend/commit/4dbd26aca51aa810b21b35286734ffd9a886e879))

### [1.2.1](https://bitbucket.org/creativemind1/sakeenah-backend/compare/v1.2.0...v1.2.1) (2020-05-15)

### Bug Fixes

* **category-keeps-loading:** Issue of category keeps loading for some user has been fixed. It was due to new Sakeenah user trying to login with facebook but data has not been send back as response. Now working!! ([044ee21](https://bitbucket.org/creativemind1/sakeenah-backend/commit/044ee21a9c2e10603192276682834ab2e344a3e8))
* **google-api-changes:** Changes in google API as per new account ([124ff41](https://bitbucket.org/creativemind1/sakeenah-backend/commit/124ff4169bacf282f7b16307333624f5bbcc0362))
* **production-url-apple-receipt:** Changing URL and password for apple verify receipt ([58f2ae6](https://bitbucket.org/creativemind1/sakeenah-backend/commit/58f2ae60e5c957f01b2800b403eb673d06bad80e))

## [1.2.0](https://bitbucket.org/creativemind1/sakeenah-backend/compare/v0.0.1...v1.2.0) (2020-04-22)

### Features

* **category-sequence:** Category sequence number added in CMS ([55ae5c4](https://bitbucket.org/creativemind1/sakeenah-backend/commit/55ae5c4130b92e8512a7fe3ff1f9e35a87126075))

### Bug Fixes

* **cancelled-user-no-access:** If user has cancelled the subscription, he was still able to access the App ~ FIXED!! ([c640456](https://bitbucket.org/creativemind1/sakeenah-backend/commit/c640456ee3c1ff3f6a5a052166d2b88e29483de2))
* **category-sequence-save:** Saving/Updating not working for sequence - FIXED ([8d6bf59](https://bitbucket.org/creativemind1/sakeenah-backend/commit/8d6bf593b90fdc74f78fd367073bfd431dfa19fe))
* **remove-scheduler:** Removing scheduler ([bd6ba78](https://bitbucket.org/creativemind1/sakeenah-backend/commit/bd6ba786eb8bbdb36cb92285dd5681afc9b80c17))
* **sandbox-share-secret-code:** Changed share secret code for Apple receipt ([2b8a3d5](https://bitbucket.org/creativemind1/sakeenah-backend/commit/2b8a3d5c57d699ccb09a8c01f6231470e85d7851))
* **staging-url:** Temporary production URL pointed to staging for payment ([0fe0e44](https://bitbucket.org/creativemind1/sakeenah-backend/commit/0fe0e4446718b67dc4311cd023b919a0f276a827))

### [1.0.1](https://bitbucket.org/creativemind1/sakeenah-backend/compare/v1.0.0...v0.0.1) (2020-04-19)

### Features

* **Apple-receipt:** Apple receipt implemented ([e8af532](https://bitbucket.org/creativemind1/sakeenah-backend/commit/e8af5320c56d26f6924077f0576db385749e2d0f))
* **category-sequence:** Category sequence number added in CMS ([5ecdf7a](https://bitbucket.org/creativemind1/sakeenah-backend/commit/5ecdf7aa611109f43d3da27d8e11fbb9e0065b0d))
* **category-sequence): Category sequence number added in CMS fix(category-name:** Category names added in Album table in CMS ([12832b5](https://bitbucket.org/creativemind1/sakeenah-backend/commit/12832b5366aa077feaff965493b38161425e3bfb))
* **verify-receipt-new:** Implemented new verify receipt ([aab07cd](https://bitbucket.org/creativemind1/sakeenah-backend/commit/aab07cdee19c9300a10d8e46adfb4a42e9329207))

### Bug Fixes

* **audio-and-image-upload-S3:** Condition defining audios and image source path for S3 Amazon fixed!! ([4a98c92](https://bitbucket.org/creativemind1/sakeenah-backend/commit/4a98c9249b853a67774f4e427e682eddf77c48f7))
* **eslint:** Eslint, prettierrc.json and formatted the code ([425ff3d](https://bitbucket.org/creativemind1/sakeenah-backend/commit/425ff3ddefa3c3008632e9ddddc1d183e19f83e2))
* **eslint:** Eslint, prettierrc.json and formatted the code ([4fbfdd2](https://bitbucket.org/creativemind1/sakeenah-backend/commit/4fbfdd2b2bc90869442dd51b9cbd17a6006a180e))

## 1.0.0 (2019-11-11)

Sakeenah Version - completed
