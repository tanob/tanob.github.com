require 'date'

BASE_PATH = File.dirname(__FILE__)
DEFAULT_MARKUP_EXTENSION = 'md'
DEFAULT_POST_LAYOUT 	 = 'post'

task :default => "new-post"

task "new-post" do |t|
	print "Post title: "
	original_post_title = gets.chomp
	post_title = original_post_title.downcase.gsub(/[^a-z0-9]/, '-')
	today = Date.today.strftime '%Y-%m-%d'
	post_filename = "#{today}-#{post_title}.#{DEFAULT_MARKUP_EXTENSION}"
	post_filepath = "#{BASE_PATH}/_posts/#{post_filename}"

	File.open(post_filepath, 'w') { |post| post.write <<-EOP }
---
title: #{original_post_title}
layout: #{DEFAULT_POST_LAYOUT}
---
	EOP
end

