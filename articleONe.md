# Question One

AJAX...is it a great hero of Greek mythology?  A powerful cleaning solution your Grandma used? Nope.  It's not even a programming language.  It's a technique and technology that uses JavaScript to send and receive data without refreshing the page.  It's an acronym that that stands for Asynchronous JavaScript and XML.

A little bit of history will start to bring clarity to  the power of AJAX in the hands of the programmer.

Let's look at [this website](https://www.tic.com/index.html) from before AJAX.   You'll notice that it has some navigation links.  We'll just look at the "Bios" and "Books".  When you click "Books", you'll notice that the content on the page changes.

<img src="/Users/joshuamorgan/Library/Application Support/typora-user-images/Screenshot 2022-11-26 at 5.14.57 PM.png" alt="Screenshot 2022-11-26 at 5.14.57 PM" style="zoom:25%;" />



<img src="/Users/joshuamorgan/Library/Application Support/typora-user-images/Screenshot 2022-11-26 at 5.19.15 PM.png" alt="Screenshot 2022-11-26 at 5.19.15 PM" style="zoom:25%;" />

Visually, the title has changed and so has the information below it.  But if we look at the network behavior, we will see that more than the title and information has changed.  What we actually see is that the entire page has been refreshed.  Looking at the DOM, the `<a>` tag has a reference to `"books/index.html"`.  When a user clicks on the `Books` link, the browser uses the value of the `href` attribute to build its HTTPS request that it sends over the network to the server at `https://www.tic.com.  

<img src="/Users/joshuamorgan/Library/Application Support/typora-user-images/Screenshot 2022-11-26 at 5.27.53 PM.png" alt="Screenshot 2022-11-26 at 5.27.53 PM" style="zoom:50%;" />

If we investigate the 'Network' tab of Chrom Dev, we can see this in action.  Looking at the overview of the header, we see that a `GET` request was made for a resource located at `https://www.tic.com/books/index.html` 

<img src="/Users/joshuamorgan/Library/Application Support/typora-user-images/Screenshot 2022-11-26 at 5.24.22 PM.png" alt="Screenshot 2022-11-26 at 5.24.22 PM" style="zoom:50%;" />

The response tab is the resource that we receive from the server.  When we look at it, we find that we receive back the entirely new web page that looks like the home page but with a few difference.  Chrome was being wonky, so I had to switch browsers for this next snapshot.  Instread of 'Response', it is 'Preview'.![Screenshot 2022-11-26 at 5.47.41 PM](/Users/joshuamorgan/Desktop/Screenshot 2022-11-26 at 5.47.41 PM.png)The key point to notice is that we recieved an entirely new HTML document.  And that document replaced the previous one. Below, you'll see that we are looking at the response (the word 'Reponse' on the far right side).  And you'll notice that we receive the `index.html` file from the 'books' folder.  Most importantly, what we receive is a 'text/html' document type that's just like the home page html document but with a few tweaks.   One page swapped out for another.

<img src="/Users/joshuamorgan/Library/Application Support/typora-user-images/Screenshot 2022-11-26 at 5.51.39 PM.png" alt="Screenshot 2022-11-26 at 5.51.39 PM" style="zoom:50%;" />



When the World Wide Web first started, the idea was to use the internet to share data based on the concept of pages and the working of page navagation.  An html document is displayed to the user, containing hyper-links to navigate further down the document filesystem.  You'll notice that is what we are doing above.  'Books' is a folder which has its own html document file. One page has information along with hyper-links to pages with more source information.  When clicked, the browser refreshes the window and serves an entirely new HTML  page for the user. 

More precisely, the user's action of clicking the link triggers the browser to create an HTTP/S request that it sends to a web server.  And the server responds by sending back the data it request.  Now, here's the key: there is some network latency (delay) in the round-trip time. And during this time, the page is 'frozen'.  That is, the user cannot interact with the page until the new document is recieved and rended to the screen by the browser.  Waiting while on a page like this one seems innocuous.  But most folks today don't use the WWW in manner it was created.  The world of applications during that time (think Microsoft Word or Adobe Photoshop) started to find there way onto the Internet, and today it seems most folks don't interact with web pages as much as they engage with web applications (think Facebook, Twitter, your Bank, ect).

As web pages developed, rendering an entirely new page wasn't innocuous anymore....it was beginning to be obnoxious.  Even looking at the example website conveys that a little bit.  Why go through the trouble of creating a whole new page when you could just replace part of the page?  Well, that wasn't the point of the WWW in the beginning.  But things changed.  Websites became more interactive experiences....more dynamic...more interactive. Think drop-down menus.  The first web technologies or concepts included HTML, URIs, and HTTP (with the addition of CSS).  But around 1997, a new technology was added to the mix: JavaScript.  The idea was to make changes to the web page without having to make an HTTP request, which would require a request/response cycle along with reloading the entire page.   This is where new CSS properties, HTML elements and attributes, and JavaScript events came into fruition.  Development was no longer relegated to the server side but could be done on the client side.  The stimuli for changes could come from a timer, data coming in from the server, the user clicking a button, etc.  The point was that the there was no need to make HTTP requests, which required a full page reload.  Updates on the fly. 

[Here's an old website example of Dynamic HTML](http://www.javascriptkit.com).  When you hover over a particular navigation table, you get a drop down menu.  In the snapshot, I hovered over 'Tutorials', and recieved the drop down menu you see below.  All done without having to interact with a server and a full-page reload.

<img src="/Users/joshuamorgan/Desktop/Screenshot 2022-11-26 at 7.53.06 PM.png" alt="Screenshot 2022-11-26 at 7.53.06 PM" style="zoom:50%;" />

This is nice.  But it's like putting lipstick on a pig.  It's still a pig.  We still are working with static websites with navigation to new content through links.  The biggest issue hadn't been resolved...if we want to get data, the only means was to have the browser do the work of making the request, which meant receiving an entirely new page that the browser rendered.   And during that time, the user had to wait due to network latency. 

The desire for web pages to act like desktop applications was growing and new technologies and techniques in the 2000's started to bring the desktop experience to the web.  Website began feeling more intuitive.  

For example, look again at the website talked about earlier.  It has a search engine that's defunct.  But it will suit our needs.  

# <img src="/Users/joshuamorgan/Library/Application Support/typora-user-images/Screenshot 2022-11-26 at 9.36.52 PM.png" alt="Screenshot 2022-11-26 at 9.36.52 PM" style="zoom:50%;" />

When you type in characters, nothing happens.  Seems like it should have some drop down menu that populates with relavent resources with each typed charcter and maybe show an autocompletion option.  If the data for that information was on a server, then at that time in history it was impossible. Not without having the browser make an HTTP request for an HTML document and upon reception load that entirely new document.  Maybe a simple page like this would not be too obnoxious.  But think about rendering Google Flights in this manner.  There's a lot that needs to be loaded.  Look at the snapshot below. 

<img src="/Users/joshuamorgan/Library/Application Support/typora-user-images/Screenshot 2022-11-26 at 9.46.27 PM.png" alt="Screenshot 2022-11-26 at 9.46.27 PM" style="zoom:50%;" />

The problem is that the browser engages in the HTTP request/response cycle protocol, which is essentially synchronous in nature.  At least for our purposes here.  It sends a request and does nothing (waits) for until it receives the response from the server. As websites became web applications, the sending of data to and from the server needed to be independent of user interaction; done 'in the background', or asynchronously.  That is, something else beside the browser needed to handle the request response cycle so the user could still engage with the page. 

I noted earlier that around 1997, JavaScript entered the web technologies list.  With the creation of the Document Object Model that we use today, JavaScript could manipulate the website.  But the only data JS could work with was limited to the DOM.  What if JS could work with data from the server? What if the browser could give JavaScript networking capababilities?  Enter `AJAX` , Asynchronous JavaScript and XML, and the `XMLHttpRequest` object. 

Let's look at Google Flights again.  I am currently in Manila, PH.  But I'll soon be traveling back to the States.  So, lets type in `https://www.google.com/flights` in the browser. The server generates the initial page. Somehow it knows Manila is my closest city.  Scary. But useful, I suppose.  <img src="/Users/joshuamorgan/Library/Application Support/typora-user-images/Screenshot 2022-11-27 at 11.22.15 AM.png" alt="Screenshot 2022-11-27 at 11.22.15 AM" style="zoom:25%;" />

If we open the browser's inspector network tab and reload the page, we notice that it took many requests for this page to actually fully load. Take notice of the number of requests in the bottom left side...40.

<img src="/Users/joshuamorgan/Library/Application Support/typora-user-images/Screenshot 2022-11-27 at 11.32.43 AM.png" alt="Screenshot 2022-11-27 at 11.32.43 AM" style="zoom:25%;" />

Let's tell google flights that we want to see tickets for Charleston, SC.  Let's type one character at a time while watching the screen and the network tab, particularly, the request number. Let's type "C", 'h', 'a', 'r'.  You will notice that the requests increment to 46.  (There may be some difference since Google listens for many user actions).  You'll also notice that the only noticable difference occuring on the page is the drop-down menu with suggestions. And with each of these keypresses, new suggestions are populated.

<img src="/Users/joshuamorgan/Library/Application Support/typora-user-images/Screenshot 2022-11-27 at 11.34.00 AM.png" alt="Screenshot 2022-11-27 at 11.34.00 AM" style="zoom:25%;" />

What's going on?  If we look at the network requests, we'll get an idea. If we look at the last request, we notice that Google made a POST request with a data payload.  You'll notice that it includes the combination of our keypresses "Char", seen at the bottoom of this snapshot. 

![Screenshot 2022-11-27 at 11.43.30 AM](/Users/joshuamorgan/Desktop/Screenshot 2022-11-27 at 11.43.30 AM.png)

In return, the server provided the browser with the resource we see below in the right window of the screen shot below.  The point here is not to figure out exactly what this is.  The point here is to notice that it is NOT a new HTML document like we received when we first visited the site.  It's barely nothing at all.  And that's the point. It's a content type that the program recognizes and can work with to manipulate only the needed aspects of the current page.  All the while there was no refresh of the current page.  The requests and responses were done in the background. And updates to the page were done quickly. A smoother interaction between application and user.  

So, it's the next evolution in dynamic web pages.  Below, you'll notice that the response includes the strings "Charleston, South Carolina, USA", "Charleston", and "City in South Carolina".  All these strings can be found on the web page , which is shown in the previous snapshot.  

<img src="/Users/joshuamorgan/Desktop/Screenshot 2022-11-27 at 11.43.54 AM.png" alt="Screenshot 2022-11-27 at 11.43.54 AM" style="zoom:45%;" />

This is the power of AJAX.  Instead of a user's action generating an HTTP request, it now could initiate a JS call to AJAX, via a browser-level API such as `XMLHttpRequest` . A browser-level API such as this is the main web technology behind AJAX.  It allowed for asynchronous communication with the server while preserving the web page.  In this example, with every keypress, an AJAX request is triggered. The response back from the web server triggers a JS callback function, which processes the response.   The result of the process is an updated HTML page of new suggestions, all without a page refresh and network latency making the user wait.  With the help of a browser API such as XMLHttpRequest, JS can intiate requests and process the data returned by the server.  What's not show here but worth mentioning is that JS also has the ability to manage the progress of the requests.

We said in the beginning that AJAX is a technology and technique.  The main technologies include HTML/CSS, DOM, XMLHTTPRequest object, XML, and JavaScript. "XML" is in the name, so its worth making a comment.  HTTP request/response cycle can involve the transfer of data. XML ('Extensible Markup Language') was the means by which the data was transfered.  Today, JSON is mostly used for data transfer.  So, asynchronous JavaScript for communication and JSON as the medium of data transfer.  

Which gets us to another advantage of AJAX.  Seeing that I am in The Philippines, it only seems best to check out if the Amazon.com of The Philippines, [Shopee.com](https://shopee.ph) , has anything AJAX to show us. Let's put the url in the browser, then open the network tab and refresh the page.  If you filter for 'get', you'll notice 'get_notifications?limit=5'.  If we look into this request, we notice that the content-type is  "application/json".  This is another advantage of using AJAX.  It allows the client more control over the headers and the data-format of the request.  In the early days of HTTP 1.0 the only content-type of resource available on the web was text.  By HTTP 1.1, content-type could include such resources as images and videos.  But a simple HTML page really can't request json data without maybe some work-arounds such as using `<iframe>` elements.  And if the server tries to send json data, the browser may not know what to do with a `.json` file.  But, with AJAX, JS has control over the initializing the request and processing it.  So, it can be programmed to send and receive json, as we see here.  

This gives way to minimal data transfer that improves user experience.   In the page load, the HTML and notification images you see below are loaded and then asynchronously the program makes a GET request back to the server for JSON data.  

![Screenshot 2022-11-27 at 11.30.21 PM](/Users/joshuamorgan/Library/Application Support/typora-user-images/Screenshot 2022-11-27 at 11.30.21 PM.png)



Here is the JSON data it receives, in the screenshot below.  you can't see all of them, but there are essentially 5 pieces of data it receives that it wants to use.  What has happned is that the images were uploaded to the page and with this JSON data we see below, the program took this photo information and wrote to the particular elements that need to contain the photo information.  For instance, you will see "action_redirect_url".  The url value is placed in the appropriate element, which allowing the user to see a new web page. This is the beauty of AJAX.  Users don't have to wait for all this expensive HTML to be loaded before visually seeing something that grabs their attention.  The JS program can request and recieve just what it needs to keep the users attention, and then asynchronously and without a fresh reload go get the important data that allows the user to interact with the page.  Giving the JS program control over the headers so it can get small bits of data in a format it desires to work with makes this even more possible.  And AJAX is how it happens. 

![Screenshot 2022-11-27 at 7.56.59 PM](/Users/joshuamorgan/Desktop/Screenshot 2022-11-27 at 7.56.59 PM.png)



