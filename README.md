Geekr
---------
Community Driven Reading list!

### The Idea:
If you have a habbit of reading everyday, there must be some great articles that you want to share with others.

If you were a loyal `xxx reader` user for years, you may have experienced that some great website stopped updating.
for example dailyjs.com(Thanks to  Alex R. Young)

So I am thinking that why not create a community driven reading list? If you have something to share, just make a pull request!

### How it works?

It is basically a tiny React+Redux app. It 'compiles' `YAML` files to json and continous deploys to `github pages` through travis-ci.


### Contributor needed!

You are welcomed to send pull requests for the interesting posts that you are willing to share with others.

###  Guide

yaml file structure:

```yml
posts:
  - title: "JavaScript Application Architecture On The Road To 2015" # title of the post
    url: "http://addyosmani.com/blog/architecture-on-the-road-to-2015/" #link for the post
    time: 2015-03-15 20:53:11 # The time you add the link.
    category: "Tech"
    tag: "JS,Architecture" # tags for the link, separate by comma.
```
