---
title: Debugging capybara-webkit
layout: post
---

If you ever run into weird issues with [capybara-webkit](https://github.com/thoughtbot/capybara-webkit) you might find some clues about them by enabling logging:

```ruby
session = Capybara::Session.new(:webkit)
session.driver.enable_logging
```

After that it will print in stdout the commands that are being executed and their results, for example:

```
Received "Visit(https://secure.example.com)"
Started "Visit(https://secure.example.com)"
Load started
"Visit(https://secure.example.com)" started page load
Started request to "https://secure.example.com/"
Finished "Visit(https://secure.example.com)" with response "Success()"
Received 0 from "https://secure.example.com/"
Page finished with false
Load finished
Page load from command finished
Wrote response false "{"class":"InvalidResponseError","message":"Unable to load URL: https://secure.example.com/ because of error loading https://secure.example.com/: Unknown error"}"
/Users/tanob/.rvm/gems/ruby-2.1.3/gems/capybara-webkit-1.3.1/lib/capybara/webkit/browser.rb:275:in `check': Unable to load URL: https://secure.example.com/ because of error loading https://secure.example.com/: Unknown error (Capybara::Webkit::InvalidResponseError)
```

This helped me to find [Github Issue #674](https://github.com/thoughtbot/capybara-webkit/issues/674) in capybara-webkit about the weird "Received 0" message. Looks like it's related to the upgrade to OSX Yosemite and the workaround for now is to ignore SSL errors (`session.driver.browser.ignore_ssl_errors`).

