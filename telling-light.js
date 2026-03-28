// 임시 데이터 (나중에 백엔드 DB와 연결될 부분)
let posts = [
    { id: 1, content: "오늘 급식 메뉴 대박... 제육볶음 나옴!", time: "3분 전" },
    { id: 2, content: "혹시 1학년 3반 교실에 지우개 두고 온 사람?", time: "12분 전" }
];

const postInput = document.getElementById('post-input');
const postBtn = document.getElementById('post-btn');
const postFeed = document.getElementById('post-feed');

// 🎨 화면에 게시글 리스트를 그려주는 함수
function renderPosts() {
    postFeed.innerHTML = ''; // 초기화
    
    posts.forEach(post => {
        const postCard = `
            <div class="post-card">
                <div class="post-content">${post.content}</div>
                <div class="post-footer">
                    <span>${post.time}</span>
                    <button class="like-btn">❤️</button>
                </div>
            </div>
        `;
        postFeed.insertAdjacentHTML('beforeend', postCard);
    });
}

// 📤 '올리기' 버튼 클릭 이벤트
postBtn.addEventListener('click', () => {
    const content = postInput.value.trim();
    
    if (content === "") {
        alert("내용을 입력해주세요!");
        return;
    }

    // 새로운 글 객체 생성
    const newPost = {
        id: posts.length + 1,
        content: content,
        time: "방금 전"
    };

    posts.unshift(newPost); // 리스트 맨 앞에 추가
    postInput.value = '';   // 입력창 비우기
    renderPosts();          // 화면 새로고침
});

// 페이지 접속 시 최초 실행
renderPosts();