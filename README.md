Geekr
---------

This is a small tool that shares some of the posts or news that I read daily which I think is high quality and want to share with others!

### How it works?

It is basically a static site generator which simplified for sharing links. It 'compiles' `YAML` and continous deploys to `github pages` by using travis-ci.


### Contributor needed!

You are welcomed to send pull requests for the interesting posts that you are willing to share with others.

###  Guide

yaml file structure:

```yml
posts:
  - title: "JavaScript Application Architecture On The Road To 2015" # title of the post
    url: "http://addyosmani.com/blog/architecture-on-the-road-to-2015/" #link for the post
    time: 2015-03-15 20:53:11 # The time when you add the link to the repo.(not the time when it was born)
    category: "Tech" # The category need to be decided.
    tag: "JS,Architecture" # tags for the link, separate by comma.
```
