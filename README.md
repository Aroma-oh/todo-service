# 👩🏻‍💻 My Todo App
#### 과제 소개
* 일정 관리를 위한 웹 애플리케이션입니다.
* 부트캠프의 단편적인 요구사항만 해결하는 과제를 수행하며 개인의 성장에 의구심을 느껴 진행한 첫 프로젝트입니다.
* 요구 사항 정의와 구현 모두 스스로 진행하는 것을 목표로 프로젝트를 진행하였습니다.
* 진행기간: 23.03.01 ~ 23.03.09

#### 주요 기능
* Todo CRUD, Filtering, Dark mode, Calendar

#### 기술 스택
* React, Redux-toolkit, Styled-component, AWS Amplify

#### 배포링크 및 데모영상
* 배포 링크: https://main.d3o47payb9audh.amplifyapp.com/
* 데모 영상

|Create|Edit|
|:-:|:-:|
|![](https://velog.velcdn.com/images/on002way/post/890b48dd-adf2-4768-acec-60d53f6f95b9/image.gif)|![](https://velog.velcdn.com/images/on002way/post/f8ab228c-9156-4406-b6f0-b3398d5b7e4e/image.gif)|
|Delete|Darkmode|
|![](https://velog.velcdn.com/images/on002way/post/52ae5c18-1db8-4348-87a2-7bf2bc7c36cd/image.gif)|![](https://velog.velcdn.com/images/on002way/post/a170e049-c6df-434c-ac04-3d7e880f4d23/image.gif)|

## 🏃🏻‍♀️ 구현을 위한 노력
- 노션으로 프로젝트를 관리하며 사용자 요구사항 및 기능을 정의했습니다. 또한 [피그마로 디자인 프로토타입 🔗](https://www.figma.com/proto/4eQVEDpT9HPRvmyub24Lc1/Todo-list?type=design&node-id=51-1543&t=vTVAJVr8f6ymDKuj-0&scaling=scale-down&page-id=0%3A1&starting-point-node-id=70%3A964)을 구현하며 UX 향상을 고민했습니다.
- 디자인 정의를 통해 UI의 중복을 발견하고 **컴포넌트 재사용**을 고려하여 코드를 작성했습니다.
- 전역 상태관리 라이브러리를 사용하기 전에 **props drilling**을 경험하며 **더 나은 프로젝트 구조에 대해 고민**했습니다.
- 이후 **redux-toolkit으로 리팩토링**을 진행하며 예측 가능한 상태관리를 지원하는 FLUX 패턴의 이점을 경험할 수 있었습니다.

## 📓 회고
#### 프로젝트로 얻은 교훈
- 단편적인 기능 개발이 아닌 CRA부터 시작한 개발을 통해, 더 나은 프로젝트 구조와 컴포넌트 분리를 고민하게 되었습니다.
- 컴포넌트 조합으로 페이지를 만들어가는 과정에서 React의 이점을 느낄 수 있었습니다.

#### 프로젝트를 진행하며 배운 내용과 느낀점들을 기록한 링크입니다.

-   [프로젝트 시작 배경과 후기](https://velog.io/@on002way/todo-service-ver.1-%ED%9A%8C%EA%B3%A0)
-   [상태관리 라이브러리 사용 배경과 후기](https://velog.io/@on002way/todo-service-ver.1-redux-toolkit-refactoring-%ED%9A%8C%EA%B3%A0)

## Documents
- [사용자 요구사항 정의서](https://aroma-oh-portfoliocom.notion.site/7c85bf9f6ab04344b5367fe1b9142842?pvs=4)
- [피그마](https://www.figma.com/file/4eQVEDpT9HPRvmyub24Lc1/Todo-list?type=design&node-id=0-1&mode=design&t=tcsLZFLckTD7kbbh-0)
