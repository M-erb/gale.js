# Gale.js

Gale.js is a very basic static site generator, noting more, nothing less. It literally just spits out html and other files for a static site. What did you expect?

This project was created to help me quickly create static sites and give me the html files. Clients I have been working with see the benifits of using a static site, but the dev process is lacking. It can be cumbersom when editing html that repeats like a footer or a button. So to over come that I am using nunjucks.js as a templating tool and having it spit out the html for me. Then I can ether deliver this to the client or push them to a server of my chosing. I am adding this here in hopes that this helps someone else out there as well. See more [FAQ](#FAQ)

## Tech Stack:
### Server:
Uses nodejs + expressjs as a dev server
- [Nodejs](https://nodejs.org/) (v10)
- [nodemon](https://github.com/remy/nodemon/)
- [nodemon](https://github.com/remy/nodemon/)
- [Expressjs](http://expressjs.com/)
- [nunjucks](https://github.com/mozilla/nunjucks)
- [fs-extra](https://github.com/jprichardson/node-fs-extra)
- [Chrome dev tools](#ChromeDev)

### Client:
You can use whatever you want here, just set your output to the "/public" directory though the build script does run webpack and change it's output to "/builds". What I have pre-setup below:

- [Webpack](https://webpack.js.org/)
- [Babeljs](https://babeljs.io/)
- [tailwindcss](https://tailwindcss.com/)

Though I am heavily using tailwindcss, webpack is also set up to process sass/scss and regular css as well. So you could use both if you wanted...

## How it works:

### Dev process
1. Run ```npm start``` to start the node server
2. In a different terminal tab run ```npm run watch``` to start up webpack and its magic
3. Create .njk files in the views directory (these are your pages, ex: "/views/mypage.njk")
4. Visit the page (ex: http://localhost:3000/mypage)
   - The server runs nunjucks.js all over it and it returns an html string
   - The server then puts this string in the "/public" directory by creating a new directory of (ex: "/public/mypage") and creates an "index.html" file with-in this new directory.
   - The server then serves from the "/public" directory your genereated static html file.

You of course are also editing CSS and JS files from the "/client" directory and running that as a different process.

Need child pages? That works too by creating a ".njk" file inside of a directory named after the parent page. (ex: "/mypage/childpage.njk")

### Build it
1. Run ```npm start``` to start the node server if not already running.
2. Open the "/commands/build.js" file and add add your site's urls to the "siteURLs" array
3. In a different terminal tab run ```npm run build``` to proccess your site's urls(this is simply to make sure nothing was missed or if you want to only a process a protion of your site's pages) This also runs webpack and its magic but in production mode!
4. Your site is now in the "/builds" directory ready to be published!
5. Profit!

### nunjucks components

I feel like this is really cool and makes the process much easier

You can not only create snippets for a header and footer but also add a component to a .njk file by first making sure the components object is added. Do this by adding to the top of your layout.njk file.

```javascript
{% import "./macros/components.njk" as components %}
```

Then where you want your component to generate use
```javascript
{{ component.componentName(componentOptionsObject) }}
```
example: 
```javascript
{{ components.btn({
  tag: 'a',
  type: 'primary',
  href: '',
  text: 'Try it now!'
}) }}
```

This generates a preset up btn for you!

#### To create a component

Lets create a btn component first
1. Add a btn.njk file to your "/views/components" directory

```javascript
{% import "../macros/components.njk" as components %}
{% set btnType = '' %}
{% if config.type === 'primary' %}
  {% set btnType = 'btn_prim' %}
  {% elif config.type === 'hollow' %}
    {% set btnType = 'btn_hollow' %}
  {% elif config.type === 'link' %}
    {% set btnType = 'btn_link' %}
{% endif %}

{% set href = 'href=' + config.href if config.href else '' %}
{% set target = 'target=' + config.target if config.target else '' %}

<{{ config.tag }} {{ href if config.tag === 'a' }} {{ target if config.tag === 'a' }} class="{{ btnType }} {{ config.class }}">
  <span class="flex items-center">
    <span class="flex-grow flex-stretch">{{ config.text }}</span>
    {% if config.icon or config.type === 'link' %}
      {{ components.icon({name: 'chevron-right'}) }}
    {% endif %}
  </span>
</{{ config.tag }}>
```

2. Then add an entry to your macros file at "/views/macros/components.njk"

Here you can see there is a default object. This is great to look back on and remember what it can do and of course to have common settings on a component.

```javascript
{% macro btn(data) %}
  {% set config = {
    tag: 'button',
    class: '',
    type: 'primary',
    href: '',
    target: '',
    text: '',
    icon: false
  }|merge(data) %}
  {% include "../components/btn.njk" %}
{% endmacro %}
```

3. Then use it on a page:

Pass it an object to override the defaults.
```javascript
<div class="btn-group">
  {{ components.btn({
    tag: 'a',
    type: 'primary',
    href: '',
    text: 'Try it now!'
  }) }}
</div>
```


## FAQ
### Why did you not go with a lot of the establish options out there?

Good question, first off I wanted complete control and room to shift. Things like [gastbyjs](https://github.com/gatsbyjs/gatsby) seem to lock you in with the react ecosystem. Others I have found are designed to push to github pages and the like. I just wanted something to literally give me the tools to make creating html sites easier AND give me the static assets after processing them. Thats it.

### What would you say the strengths are of this project?

Well...
1. It is simple and can easily be changed to suit your needs.
2. Also there is an easy way to create html components that can have default settings and pass an oject to change them.
3. Just copy this repo and start hacking to get a site going.

### I like this project, here can I send my gratitude?

What really? That makes me feel special! I can be found on twitter [@the_merb](https://twitter.com/the_merb)

## To do:
* Auto refresh to webpack process
* Built site should end up in a "/build" directory instead of still in "/public"
* Finish "Preconfigured settings" "SERVER" in .env file to actually do what it says it does

# ChromeDev

This is only useful if you are editing the server and need to inspect it.

1. run
```nocode
npm start
```
3. Switch over to Chrome browser
4. Open dev tools(inspect a page)
5. In the top left of the dev tools click on the green nodejs logo
6. !$$ PROFIT $$!

*** long offical way ***

4. In address bar goto ```chrome://inspect```
5. Click ```Open dedicated DevTools for Node``` link
6. !$$ PROFIT $$!

Copyright 2019 Michael Erb

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
