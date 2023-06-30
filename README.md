# restrictTheQooHeadings

## content_Script.js
이 코드는 크롬 확장 프로그램의 Content Script로 사용될 수 있는 코드입니다.
 Content Script는 웹 페이지에서 실행되는 JavaScript 코드로, 페이지의 동적인 부분을 조작하거나 원하는 기능을 추가할 수 있습니다.

이 코드는 다음과 같은 기능을 수행합니다:

- getAllowedHeadings 함수: 
크롬 스토리지에서 저장된 말머리를 가져오는 함수입니다. chrome.storage.sync.get 메서드를 사용하여 allowedHeadings를 가져옵니다.

- restrictHeadings 함수: 
말머리 선택 옵션을 제한하는 함수입니다. 페이지가 로드되었을 때 호출되며, 현재 URL에서 게시판 이름을 추출하고, 선택한 말머리 옵션과 허용된 말머리 목록을 비교하여 입력 필드의 값을 설정합니다. getAllowedHeadings 함수를 사용하여 저장된 말머리 목록을 가져옵니다. 정규식을 사용하여 현재 URL과 저장된 말머리 목록의 일부가 일치하는지 확인합니다.

- DOMContentLoaded 이벤트 핸들러: 페이지가 로드되었을 때 restrictHeadings 함수를 호출하여 말머리를 제한합니다.

- change 이벤트 핸들러:
 말머리 선택이 변경되었을 때 restrictHeadings 함수를 호출하여 말머리를 제한합니다.

이 코드를 Content Script로 사용하기 위해서는 크롬 확장 프로그램에 해당 코드를 포함하는 JavaScript 파일을 생성하고,
 manifest.json 파일에 Content Script 설정을 추가해야 합니다.
  또한, Content Script가 적용될 웹 사이트를 manifest.json 파일의 "content_scripts" 속성에 추가해야 합니다.

이 코드는 TheQoo (더쿠) 웹 사이트에서 말머리 선택을 제한하는 용도로 사용될 수 있습니다.

## option.js
### 유저 입력 페이지 

### 말머리 제한 옵션
이 크롬 확장 프로그램은 웹사이트의 게시판에 특정 말머리를 제한하는 기능을 제공합니다. 
사용자는 허용된 말머리를 설정하고, 해당 말머리를 가진 게시물 작성 시 자동으로 입력됩니다.

- 설정 방법
  - 게시판 URL 및 허용할 말머리를 입력합니다.
  - "Save" 버튼을 클릭하여 설정을 저장합니다.
  - 저장된 말머리 목록은 "Saved Headings" 섹션에서 확인할 수 있습니다.
  - 특정 말머리를 삭제하려면 해당 말머리 옆의 "삭제" 버튼을 클릭합니다.
  - 모든 설정을 초기화하려면 "Reset" 버튼을 클릭합니다.
- 주의사항
  - URL은 정확히 일치해야 합니다. 
    - "https://theqoo.net/kbaseball" 의 형식 혹은 kbaseball 형식으로 입력해주세요.   - kbaseball 이 구분하는 기준이 됩니다. 
  - 설정된 말머리는 해당 게시판에서만 적용됩니다.
  - 동일한 게시판에 여러 개의 말머리를 허용할 수 있습니다.
- 참고사항
  - 이 확장 프로그램은 크롬의 동기 저장소를 사용하여 설정을 저장합니다.
  - 설정은 확장 프로그램을 삭제하지 않는 이상 계속 유지됩니다.

  ## 실행방법 
  - chrome://extensions 접속
  - 개발자모드 활성화
  - 압축해제된 확장 프로그램을 로드합니다. 클릭 
  - 업데이트 
  - 확장프로그램 옵션 클릭으로  말머리 제한 옵션 설정 가능 
