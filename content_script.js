// 저장된 옵션 값을 가져옵니다.
const getAllowedHeadings = () => {
  return new Promise(function (resolve) {
    // 크롬스토어에서 저장된 말머리를 취득 
    chrome.storage.sync.get("allowedHeadings", function (data) {
      const allowedHeadings = data.allowedHeadings || {};
      resolve(allowedHeadings);
    });
  });
};

// 말머리 선택 옵션을 제한하는 함수를 정의합니다.
async function restrictHeadings() {
    // 해당 url에서 게시판 이름만 취득 
  const currentUrl = window.location.href
    .trim()
    .replace("www", "")
    .replace("https://", "")
    .replace("theqoo.net");
    // 저장된 말머리 목록
  const selectElement = document.getElementById("fav_group_title");
  // 말머리 입력창 
  const inputElement = document.getElementById("group_title");;
  if (!selectElement || !inputElement) {
    // 요소가 존재하지 않을 경우 종료
    return;
  }
  // 말머리 목록에서 선택한 말머리 취득
  const selectedHeading = selectElement.value;
  // 허용된 말머리를 취득 -> 유저가 직접 입력한 말머리 목록 
  const allowedHeadings = await getAllowedHeadings();
  console.log({currentUrl})
  const matchingKey = Object.keys(allowedHeadings).find((key) => {
    const regex = new RegExp(`(^|[^a-zA-Z])${key}([^a-zA-Z]|$)`, "i");
    return regex.test(currentUrl);
  });

  if (matchingKey) {
    const headings = allowedHeadings[matchingKey];

    if (headings.includes(selectedHeading)) {
      inputElement.value = selectedHeading;
    } else {
      inputElement.value = "";
    }
  } 

  // 저장된 url이 없으면 모든 말머리 허용 

}

// 페이지가 로드되었을 때 말머리를 제한합니다.
document.addEventListener("DOMContentLoaded", restrictHeadings);

// 말머리 선택이 변경되었을 때 이벤트 핸들러를 추가합니다.
document
  .getElementById("fav_group_title")
  ?.addEventListener("change", restrictHeadings);
