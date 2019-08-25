#!/usr/bin/env bash

# ------------------------------------------------------------------------------
#   Product/Info:
#   https://jekyll-one.com
#
#   Copyright (C) 2019 Juergen Adams
#   J1 Template is licensed under the MIT License.
# ------------------------------------------------------------------------------

docker run --restart=always -d \
  --name starter_app --volume=$PWD:/j1/data  \
  --publish=0.0.0.0:5000:5000 \
  -it jekyllone/j1 \
  j1 app

