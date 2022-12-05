import { ajax } from "../ajax";

var posts = {
    fetchPosts : async function(container,user, pageName) {
        const request = {
            filter: user,
            page: pageName
        };
        const response = await ajax.sendRequest("POST", "fetch_posts", request);
        return await response.json();
    },

    populatePost : async function(postInfo, container, pageName) {
        const partialPath = "partials/post.html";
        const post = await ajax.fetchHtmlAndAppend(partialPath, container);
        if(pageName === "index"){
            post.querySelector("#post-options").style.visibility = "hidden";
            post.querySelector("#algorithm-score").innerHTML = "Algorithm Score: " + Math.round(postInfo.algorithm_score);
        }
        post.querySelector("#name").innerHTML = postInfo.first_name + " " + postInfo.last_name;
        post.querySelector("#username").innerHTML = postInfo.username;
        post.querySelector("#likes-count").innerHTML = postInfo.reaction_score;
        post.querySelector("#title").innerHTML = postInfo.post_title;
        post.querySelector("#comment").innerHTML = postInfo.post_text;
        post.querySelector("#timestamp").innerHTML = new Date(postInfo.post_created_time).toLocaleString();
        post.querySelector("#post-image").src = await ajax.fetchImage(postInfo.post_picture);
    },

    populateAllPosts : async function(pageName, args) {
        var user = await ajax.fetchUser(args.user_id);
        const container = document.querySelector("#post-container"); // assumes only one container per page
        // console.log(user.user_id);
        // container.setAttribute("data-filter", user.user_id);
        // console.log(container.getAttribute("data-filter") + "filter data");
        if (container) {
            this.fetchPosts(container, user.user_id, pageName).then(postInfo => {
                if (!postInfo.error) {
                    postInfo.forEach(post => {
                        this.populatePost(post, container, pageName);
                    });
                }
            });
        }
    },
};

export { posts };