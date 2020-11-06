function check() {
  const posts = document.querySelectorAll(".post");

  posts.forEach(function (post) {
    // 重複したイベント発火の処理を回避するためのコード
    if (post.getAttribute("data-load") != null) {
      return null;
    }
    post.setAttribute("data-load", "true");

    // クリックされたときに起きるイベントハンドラー
    post.addEventListener("click", () => {
      const postId = post.getAttribute("data-id");
      const XHR = new XMLHttpRequest();
      XHR.open("GET" , `/posts/${postId}`, true);
      XHR.responseType = "json";
      XHR.send();
      XHR.onload = () => {
        // データの返り値が正常か否かを判断するコード
        if (XHR.status != 200){
          alert(`Error ${XHR.status}: ${XHR.status}`);
          return null;
        }

        // 既読か否かを判定するコード
        const item = XHR.response.post;
        if(item.checked === true) {
          post.setAttribute("data-check", "true");
        } else if (item.checked === false) {
          post.removeAttribute("data-check");
        }
      };
    });
  });
}

// 1秒毎にcheckが繰り返されるように処理
setInterval(check, 1000);