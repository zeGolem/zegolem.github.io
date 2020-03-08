async function loadBlogInfos() {
    var bpList = document.getElementById("bp-list");
    var blogInfo = await fetch("posts/postinfo.json");
    var blogInfoJson = await blogInfo.json();

    var posts = blogInfoJson.posts;

    posts.forEach(p => {
        if (!p.hidden) {
            var li = document.createElement('li');
            var link = document.createElement('a');
            link.href = "viewer.html?blogid=" + p.id;
            link.innerHTML = p.title;
            li.appendChild(link);
            bpList.appendChild(li);
        }
    })
}

window.onload = loadBlogInfos;