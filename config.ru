# ------------------------------------------------------------------------------
# ~/config.ru
#
# Transforms a J1 based site into a web application based on Rack and
# Sinatra using the OmniAuth software stack (for authentication) managed 
# by Warden (for session managemnent) for a secured static web
#
# Product/Info:
# https://jekyll.one
#
# Copyright (C) 2019 Juergen Adams
#
# J1 Template is licensed under the MIT License.
# See: https://github.com/jekyll-one-org/j1-template/blob/master/LICENSE
# ------------------------------------------------------------------------------

# load base|app gem
# ------------------------------------------------------------------------------
require 'dotenv'
require 'j1_app'

# load general|confidential data settings from .env file
# ------------------------------------------------------------------------------
Dotenv.load

# run the app
# ------------------------------------------------------------------------------
run J1App.site

