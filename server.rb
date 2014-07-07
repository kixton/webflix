require 'sinatra'
require 'sinatra/reloader'

get '/' do
  send_file 'index.html'
end
