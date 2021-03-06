const main = document.querySelector("#main");
const qna = document.querySelector("#qna");
const result = document.querySelector("#result");
const endPoint = 12;
const select = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; // 사용자의 선택 저장

// 사용자의 선택을 바탕으로 결과(성향) 계산
function calculation() {
    // 배열에서 최댓값을 가지는 index를 반환
    var result = select.indexOf(Math.max(...select));
    return result;
}

function setResult(){
    let point = calResult();

    // 해당하는 타입
    const resultName = document.querySelector('.resultname');
    resultName.innerHTML = infoList[point].name;
x
    // 이미지 출력
    const imgDiv = document.querySelector("#resultImg");
    var resultImg = document.createElement('img');
    var imgURL = 'img/image-' + point + '.png';
    resultImg.src = imgURL;
    resultImg.alt = point;
    resultImg.classList.add('img-fluid');
    imgDiv.appendChild(resultImg);

    // comment
    const resultDesc = document.querySelector('.resultDesc');
    resultDesc.innerHTML = infoList[point].desc;
}

function goResult() {
    // QnA section 애니메이션
    qna.style.WebkitAnimation = "fadeOut 1s";
    qna.style.animation = "fadeOut 1s";

    setTimeout(() => {
        // result section 애니메이션
        result.style.WebkitAnimation = "fadeOut 1s";
        result.style.animation = "fadeOut 1s";
        setTimeout(() => {
            // QnA section 종료 & result section 등장
            qna.style.display = "none";        
            result.style.display = "block";   
        }, 450)})
    SetResult();
}

function addAnswer(answerText, qIdx, idx) {
    var a = document.querySelector('.answerBox');
    var answer = document.createElement("button");
    answer.classList.add('answerList');
    answer.classList.add('my-3');
    answer.classList.add('py-5');
    answer.classList.add('mx-auto');
    answer.classList.add('fadeIn');
    a.appendChild(answer);
    answer.innerHTML = answerText;

    answer.addEventListener("click", function() {
        var children = document.querySelectorAll(".answerList");
        for (let i = 0; i < children.length; i++) {
            children[i].disabled = true;
            children[i].style.WebkitAnimation = "fadeOut 0.5s";
            children[i].style.animation = "fadeOut 1s";
        }
        setTimeout(() => {
            var target = qnaList[idx].a[idx];
            for(let j=0; j < target.length; j++) {
                select[type[i]] += 1;
            }
            select[qIdx] = idx; // 사용자가 선택한 결과 저장
            for (let i = 0; i < children.length; i++) {
               children[i].style.display = "none";
            }
            goNext(++qIdx);
        }, 450)
    }, false);
}

function goNext(qIdx) {
    // 마지막 질문 응답 완료 시, result section 이동
    if (qIdx === endPoint) {
        goResult();
        return;
    }
    var q = document.querySelector('.qBox');
    q.innerHTML = qnaList[qIdx].q;
    for(let i in qnaList[qIdx].a) {
        addAnswer(qnaList[qIdx].a[i].answer, qIdx, i);
    }

    var status = document.querySelector('.statusBar');
    status.style.width = (100/endPoint) * (qIdx+1) + '%';
}

function begin(){
    main.style.WebkitAnimation = "fadeOut 1s";
    main.style.animation = "fadeOut 1s";

    setTimeout(() => {
        qna.style.WebkitAnimation = "fadeIn 1s";
        qna.style.animation = "fadeIn 1s";
        setTimeout(() => {
            main.style.display = "none";        
            qna.style.display = "block";   
        }, 450)
        let qIdx = 0;
        goNext(qIdx);
    }, 450);
}
