const blogpostDiv = document.querySelector('div.blogpost');

window.onload = run;

function run() {
    const querryString = window.location.search;
    const urlParams = new URLSearchParams(querryString);
    if (!urlParams.has('blogid')) {
        document.body.removeChild(blogpostDiv);
        alert("Please specify a blog ID in the request !");
        return;
    }
    const blogid = urlParams.get('blogid');

    fetch(`posts/${blogid}.md`).then(r => {
        r.text().then(parseMarkdown);
    }).catch(alert);
}

function parseMarkdown(string) {
    console.log(string.length);
    var index = 0;
    var dbgConsumed = "";
    const peek = (len = 1, offset = 0) => string.slice(index + offset, index + offset + len);
    const peekOne = (offset = 0) => peek(1, offset);
    const consume = (len = 1) => {
        var p = peek(len);
        index += len;
        dbgConsumed += p;
        return p;
    };
    const consumeOneAndPeekAhead = () => peek(++index);
    const consumeWhitespace = () => { while (peekOne() == " ") consume() };
    const consumeUntil = (str) => {
        if (str == "") return "";
        var i = 0;
        while (peek(str.length, i++) !== str);
        return consume(i - 1);
    }
    const consumeUntilNot = (str) => {
        if (str == "") return "";
        var i = 0;
        while (peek(str.length, i++) === str);
        return consume(i - 1);
    }

    const isEndOfFile = () => index >= string.length;

    var isInP = false;
    var currentP = document.createElement('p');
    var isInList = false;
    var currentList = document.createElement('ul');
    while (!isEndOfFile()) {
        console.log(dbgConsumed, index, string.length);
        if (peek() === '#') { //Is heading
            console.log('parsing heading');
            let hashs = consumeUntilNot('#');
            let headingSize = hashs.length;
            if (headingSize > 6) {
                alert('Error while parsing markdown file : Heading > 6');
                break;
            }
            consumeWhitespace();
            var heading = document.createElement('h' + headingSize);
            heading.innerHTML = consumeUntil('\n');
            blogpostDiv.appendChild(heading);
            consumeUntilNot('\n');
        } else if (peek() === "*") { // is list 
            console.log("parsing list");
            consume();
            consumeUntilNot(' ');
            isInList = true;
            var newLI = document.createElement('li');
            var text = consumeUntil('\n');
            consume();
            console.log(text);
            newLI.innerHTML = markdownStyleToHTML(text);
            currentList.appendChild(newLI);
        } else if (peek(3) === "```") { // is codeblock
            console.log("parsing codeblock");
            isInCodeBlock = true;
            consume(3);
            consumeUntil('\n');
            consume();
            var code = consumeUntil('\n```');
            consume(4);
            consumeUntil('\n');
            console.log(code);
            var codeBlock = document.createElement('code');
            codeBlock.innerHTML = code;
            blogpostDiv.appendChild(codeBlock);
            console.log("finding non-newline chars")
            consumeUntilNot('\n');
        } else if (peek() === '\n') { // If next char is new line
            if (isInP) {
                console.log("commiting p", currentP.innerHTML);
                blogpostDiv.appendChild(currentP);
                currentP = document.createElement('p');
                consumeUntilNot('\n');
                isInP = false;
            } else if (isInList) {
                blogpostDiv.appendChild(currentList);
                currentList = document.createElement('ul');
                consumeUntilNot('\n');
                isInList = false;
            }
        } else { // Is normal line
            isInP = true;
            var line = consumeUntil('\n').trim();
            console.log(line, currentP.innerHTML, peek());
            currentP.innerHTML += markdownStyleToHTML(line) + ' ';
            if (peekOne(-1) == ' ' && peekOne(-2) == ' ') { // if 2 spaces (=new line)
                console.log('new line');
                currentP.appendChild(document.createElement('br'));
            }
            consume();
        }
        console.log(index, peek());
    }
    console.log("end");
    blogpostDiv.appendChild(currentP);
}

function markdownStyleToHTML(string) {
    var newString = string;
    newString = newString.replace(/^>(.*)$/, "<blockquote>$1</blockquote>");
    newString = newString.replace(/\*\*([^\*]+)\*\*/, "<b>$1</b>");
    newString = newString.replace(/\*([^\*]+)\*/, "<i>$1</i>");
    newString = newString.replace(/`([^`]+)`/, "<code>$1</code>");
    newString = newString.replace(/\[!(.*)\]\((.*)\)/, "<img src=\"$2\" alt=\"$1\">");
    newString = newString.replace(/\[(.*)\]\((.*)\)/, "<a href=\"$2\">$1</a>");
    return newString;
}
