# Transforms J1 into a Web Application based on Rack and 
# Sinatra using the OmniAuth software stack managed by Warden 
# for authentication to create secured static J1 based web 
# sites.
#
require 'dotenv'
#require 'puma'
#require 'passenger'
require 'j1_app'

# Load initial data|environment
# ------------------------------------------------------------------------------
# noinspection RubyArgCount
Dotenv.load

# If an app is detected as *dockerized* (J1DOCKER=true), *no* development 
# mode is available.
#
if ENV['J1DOCKER']
  # Run the app in production mode
  # ------------------------------------------------------------------------------
  run J1App.site
end

if ENV['J1_RACK_ENV'] == 'production'
  # Run the app in production mode
  # ------------------------------------------------------------------------------
  run J1App.site
end

if ENV['J1_RACK_ENV'] == 'development'
  # Run the app in production mode
  # ------------------------------------------------------------------------------
  run J1AppTest.site
end
