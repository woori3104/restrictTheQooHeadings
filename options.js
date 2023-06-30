
const restoreSelectedHeadings = () => {
  // 크롬 스토리지에서 허가된 말머리를 취득 
  chrome.storage.sync.get("allowedHeadings", function(data) {
    const allowedHeadings = data.allowedHeadings || {};

  
    const boardListElement = document.getElementById("saved-list");
    boardListElement.innerHTML = ""; // Clear the existing list

      // 보드리스트와 허가된 말머리를 화면에 출력
    for (const [board, headings] of Object.entries(allowedHeadings)) {
      const listItem = document.createElement("li");
      const deleteButton = document.createElement("button");
      deleteButton.innerHTML="삭제";
      listItem.textContent = `게시판: ${board}, 말머리: ${JSON.stringify(headings)}`;
      listItem.appendChild(deleteButton);
      boardListElement.appendChild(listItem);
      // 삭제버튼을 누르면 해당 게시판의 말머리 삭제 
      deleteButton.addEventListener("click", function() {
        deleteHeading(board, listItem);
      });
    }
  });
}

// 말머리 삭제 기능 (건별 )
const deleteHeading = (board, listItem) => {
  chrome.storage.sync.get("allowedHeadings", function(data) {
    const allowedHeadings = data.allowedHeadings || {};

    if (allowedHeadings[board]) {
      if (confirm(`Are you sure you want to delete the heading for board '${board}'?`)) {
        delete allowedHeadings[board];

        chrome.storage.sync.set({ allowedHeadings }, function() {
          alert("Heading deleted.");
          listItem.parentNode.removeChild(listItem);
        });
      }
    }
  });
}

// 저장
const saveOptions = () => {
  // 입력된 데이터중 /이후 값을 취득 
  const selectedBoard = document.getElementById("board-input").value.split("/")?.pop();
  // 입력된 말머리를 ,를 기준으로 나눔 
  const selectedHeading = document.getElementById("heading-input").value?.trim().split(",");

  // 둘중하나라도 입력이 안되면 에러 
  if (!selectedBoard || !selectedHeading) {
    alert("Please enter both board and heading values.");
    return;
  }

  // 말머리데이터 취득 
  chrome.storage.sync.get("allowedHeadings", function(data) {
    const allowedHeadings = data.allowedHeadings || {};

    if (allowedHeadings[selectedBoard]) {
      const headings = allowedHeadings[selectedBoard];

      // 중복 말머리 제거 
      const uniqueHeadings = [...new Set([...headings, ...selectedHeading])];
      // 말머리 추가 
      allowedHeadings[selectedBoard] = uniqueHeadings;
    } else {
      // 없으면 새로운 말머리와 게시판 추가 
      allowedHeadings[selectedBoard] = selectedHeading;
    }

    // 스토리지에 추가 
    chrome.storage.sync.set({ allowedHeadings }, function() {
      alert("Options saved.");
      clearInputs();
      restoreSelectedHeadings();
    });
  });
}

// 저장된 모든 말머리 삭제 
const resetOptions = () => {
  if (confirm("Are you sure you want to reset all options?")) {
    chrome.storage.sync.remove("allowedHeadings", function() {
      alert("Options reset.");
      restoreSelectedHeadings();
    });
  }
}

// 입력 필드 초기화
const clearInputs = () => {
  document.getElementById("board-input").value = "";
  document.getElementById("heading-input").value = "";
}

// 저장 버튼 클릭 이벤트 핸들러 등록
document.getElementById("save-btn").addEventListener("click", saveOptions);
document.getElementById("reset-btn").addEventListener("click", resetOptions);

// 페이지 로드 시 저장된 말머리 목록 복원
document.addEventListener("DOMContentLoaded", restoreSelectedHeadings);
