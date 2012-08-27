# p1

Command line reader/client for 1Password


## This project is in quite early stages!

## Requirements

- [phantomjs](http://phantomjs.org)
- bash
- 1Password :-)


## Background

I didn't want to reverse engineer 1Password enc mechanism.
If you search for this kind of information - you will find it.

Instead I decided to use [PhantomJS](http://phantomjs.org) and combine it with [1Password Anywhere](http://help.agilebits.com/1Password3/1passwordanywhere.html)

## Goals

- fully functional,  read-only command line client for 1Password
- if possible compatibile with osx-keychain output, so it can be used as an auth helper in git
- etc
