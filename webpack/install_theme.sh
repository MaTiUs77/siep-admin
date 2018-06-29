#!/usr/bin/env bash

# set -x
set -eo pipefail

wget https://github.com/almasaeed2010/AdminLTE/archive/v2.4.3.zip && unzip v2.4.3.zip -d ./static && rm v2.4.3.zip
mv ./static/AdminLTE-2.4.3 ./static/adminlte
