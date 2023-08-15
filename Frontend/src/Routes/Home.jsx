import { styled } from "styled-components";
import css from "../font/font.css";
import MainView from "../components/HomeComponent/MainView";
import React, { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { useQuery } from "react-query";
import { BASE_URL } from "../apis/rootUrl";
import { fetchMain, customerMain, designerMain } from "../apis";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { useInView } from "react-intersection-observer";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Main = styled.div`
  background-image: url("/img/password.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  /* width: 100vw; */
  height: 100vh;
`;
const MainWrapper = styled.div`
  margin-top: 40px;
  margin-left: 170px;
  margin-right: 170px;
`;
const ImgText = styled(motion.p)`
  font-family: "Abril Fatface";
  top: 420px;
  left: 100px;
  font-size: 45px;
  font-weight: 700;
  color: #353432;
  position: absolute;
  font-family: "Abril Fatface";
`;
const ImgText2 = styled.p`
  font-family: "Abril Fatface";
  top: 480px;
  left: 100px;
  font-size: 60px;
  font-weight: 700;
  color: #353432;
  position: absolute;
  font-family: "Abril Fatface";
`;

const DesignerBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  margin-bottom: 100px;
`;
const ProfileBox = styled(motion.div)`
  background-color: #ffffff;
  border: 2px solid #bd9a7f;
  width: 200px;
  height: 250px;
  /* border-radius: 0.3rem; */
  border-radius: 40% 60% 65% 35% / 40% 45% 55% 60%;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  text-align: center;
  align-items: center;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1),
    2px 4px 10px -4px rgb(0 0 0 / 0.2);
  object-fit: cover;
  &:hover {
    transform: scale(1.02);
  }
`;

const Title = styled(motion.div)`
  font-size: 35px;
  font-weight: bold;
  font-family: "Apple-B";
`;

const ImgBox = styled.div`
  width: 80%;
  height: 80%;
  /* background-color: #fdf8e9; */
  border-radius: 40% 60% 65% 35% / 40% 45% 55% 60%;
  /* margin-top: 10px; */
  display: flex;
  justify-content: center;
  align-items: center;
  /* box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1),
    2px 4px 10px -4px rgb(0 0 0 / 0.2); */
`;
const ProfileImg = styled.img`
  width: 130px;
  height: 130px;
  margin-top: 35px;
  margin-bottom: 5px;
  background-color: white;
  border-radius: 50%;
  object-fit: cover;
`;
const Name = styled.p`
  border: 0;
  font-size: 17px;
  color: #4d4a46;
  font-family: "Pretendard-Regular";
`;
const Desinger = styled.p`
  border: 0;
  margin-bottom: 5px;
  font-size: 18px;
  color: #3e3c39;
  font-family: "Abril Fatface";
`;

const EventWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 150px;
`;
const EventText = styled.p`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const EventTitle = styled(motion.p)`
  font-size: 60px;
  margin-bottom: 25px;
  font-family: "Abril Fatface";
`;

const IntroTitle = styled(motion.p)`
  font-size: 35px;
  font-weight: 700px;
  color: #6a6251;
  margin-bottom: 10px;
`;
const EventIntro = styled(motion.p)`
  font-size: 22px;
  margin-bottom: 5px;
  font-family: 'Pretendard-Regular';
`;
const EventIntroTag = styled(motion.p)`
  font-size: 17px;
  margin-bottom: 5px;
`;
const EventImg = styled(motion.img)`
  width: 270px;
  height: 400px;
  border-radius: 0.1rem;
  /* margin-right: 30px; */
  object-fit: cover;
`;
const EventImg1 = styled(motion.img)`
  width: 600px;
  height: 400px;
  border-radius: 0.1rem;
`;

const EventBox = styled(motion.div)`
  display: flex;
  width: 200px;
  height: 50px;
  border-radius: 0.1rem;
  color: white;
  justify-content: center;
  align-items: center;
  margin-top: 25px;
  margin-bottom: 30px;
  font-size: 22px;
  cursor: pointer;
  background: linear-gradient(90deg, #d48a02 50%, #605b52 50%);
  /* background: linear-gradient(90deg, #bda67f 50%, #605b52 50%); */
  background-size: 200% 100%;
  background-position: right;
  transition: background 0.5s;

  &:hover {
    background-position: left;
  }
`;
const ReserveTitle = styled(motion.p)`
  font-size: 30px;
  font-family: 'Abril Fatface';
  color: #806f4e;
`;
const ReserveWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  align-items: center;
`;
const ReserveImgBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;
`;
const ReserveImg = styled.img`
  width: 400px;
  height: 550px;
`;
const ReserveImg2 = styled.img`
  margin-top: 40px;
  width: 770px;
  height: 550px;
`;

const WorldcupWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;
const WorldcupImg = styled.img`
  width: 600px;
  height: 400px;
`;
const pofolVariants = {
  nomal: {
    scale: 1,
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
  hover: {
    scale: 1.03,
    transition: {
      duration: 0.2,
    },
  },
  hidden: {
    opacity: 0,
    y: 30,
  },
};
const fadeInUp = {
  hidden: { opacity: 0, y: 80 },
  visible: { opacity: 1, y: 0 },
};
const fromLeft = {
  hidden: { 
    opacity: 0,
    x: -120 
  },
  visible: { 
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
    }
  },
};
const fromBottom = {
  hidden: { opacity: 0, y: 80 },
  visible: { opacity: 1, y: 0 },
};
const fromBottomBtn = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0 },
};
// const fromTop = {
//   hidden: { opacity: 0, y: 80 },
//   visible: { opacity: 1, y: 0 },
// };
function Home() {
  const navigate = useNavigate();
  const userSeq = localStorage.getItem("userSeq") || 0;
  const userType = localStorage.getItem("userType") || "guest";
  const [inViewRef, inView] = useInView({
    threshold: 0.1, // 요소의 10%가 뷰포트에 들어왔을 때 애니메이션을 시작합니다.
  });
  const [titleRef, titleInView] = useInView({
    threshold: 0.3,
  });

  const [introRef, introInView] = useInView({
    threshold: 0.1,
  });
  const [tagRef, tagInView] = useInView({
    threshold: 0.1,
  });
  const [btnRef, btnInView] = useInView({
    threshold: 0.1,
  });
  const [onePickRef, onPickInView] = useInView({
    // triggerOnce: true,
    threshold: 0.1,
  });
  const [reserveRef, reserveInView] = useInView({
    // triggerOnce: true,
    threshold: 0.1,
  });
  const [consultingRef, consutingInView] = useInView({
    // triggerOnce: true,
    threshold: 0.1,
  });
  const [reserveBtnRef, reserveBtnInView] = useInView({
    // triggerOnce: true,
    threshold: 0.1,
  });
  const fetchLogInData = async (userSeq) => {
    switch (userType) {
      case "customer":
        return await customerMain(userSeq);
      case "designer":
        return await designerMain(userSeq);
      case "guest":
      default:
        return await fetchMain(userSeq); // seq 0을 넘겨줌
    }
  };
  const handleEvent = () => {
    if (userType !== "customer") {
      swal("Error", "이벤트는 일반 회원만 가능합니다.", "error");
      return;
    }
    navigate(`/event`);
  };
  const { data, isError, isLoading } = useQuery(["loginData", userSeq], () =>
    fetchLogInData(userSeq)
  );
  // 인덱스에 따른 딜레이 애니메이션
  const getDelayByIndex = (index) => {
    const baseDelay = 0.2; // 기본 딜레이
    const increment = 0.1; // 각 항목에 추가되는 딜레이 양
    return baseDelay + index * increment;
  };

  if (isLoading) {
    return <div>Loading...{data}</div>;
  }
  if (isError) {
    return <div>홈 페이지 에러{data}</div>;
  }

  if (localStorage.getItem("userType") == "customer") {
    localStorage.setItem("userName", data.customerInfo.name);
  } else if (localStorage.getItem("userType") == "designer") {
    localStorage.setItem("userName", data.designerInfo.name);
  }

  return (
    <Wrapper>
      <Main>
        <ImgText>변화의 즐거움</ImgText>
        <ImgText2>Change hair & you</ImgText2>
      </Main>

      <MainWrapper>
        <Title
          ref={inViewRef}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeInUp}
          transition={{ duration: 0.5 }}
        >
          Weekly Best Designer
        </Title>
        <DesignerBox>
          {data.bestDesigner.map((item, index) => {
            const delayForItem = getDelayByIndex(index);
            const itemVariants = {
              ...pofolVariants,
              nomal: {
                ...pofolVariants.nomal,
                transition: {
                  ...pofolVariants.nomal.transition,
                  delay: delayForItem,
                },
              },
            };

            return (
              <ProfileBox
                key={index}
                ref={inViewRef}
                initial="hidden"
                animate={inView ? "nomal" : "hidden"}
                whileHover="hover"
                variants={itemVariants}
                onClick={() => navigate(`/designerdetail/${item.designerSeq}`)}
              >
                {/* <ImgBox> */}
                <ProfileImg
                  src={`${BASE_URL}/designer-profile/${item.img}`}
                ></ProfileImg>
                {/* </ImgBox> */}
                <Desinger>Desginer</Desinger>
                <Name>{item.name}</Name>
              </ProfileBox>
            );
          })}
        </DesignerBox>
        {/* 한장한장 이벤트 */}
        <EventWrapper>
          <EventText>
            <EventTitle
              ref={titleRef}
              initial="hidden"
              animate={titleInView ? "visible" : "hidden"}
              variants={fromLeft}
              transition={{ duration: 0.3 }}
            >
              For You
            </EventTitle>
            <EventIntro
              ref={introRef}
              initial="hidden"
              animate={introInView ? "visible" : "hidden"}
              variants={fromBottom}
              transition={{ duration: 0.5 }}
            >
              Chu만의 헤어스타일 합성 서비스
            </EventIntro>
            <EventIntroTag
              ref={tagRef}
              initial="hidden"
              animate={tagInView ? "visible" : "hidden"}
              variants={fromBottom}
              transition={{ duration: 0.5 }}
            >
              #헤어스타일 체험 #마이 헤어
            </EventIntroTag>
            <EventBox
              onClick={handleEvent}
              ref={btnRef}
              initial="hidden"
              animate={btnInView ? "visible" : "hidden"}
              variants={fromBottom}
              transition={{ duration: 0.5 }}
            >
              Go 한장 한장
            </EventBox>
          </EventText>
          <EventImg
            src="/img/hairtool.jpg"
            ref={onePickRef}
            initial="hidden"
            animate={onPickInView ? "visible" : "hidden"}
            variants={fromBottom}
            transition={{ duration: 0.3 }}
          />
          <EventImg1
            src="/img/hair3.jpeg"
            ref={onePickRef}
            initial="hidden"
            animate={onPickInView ? "visible" : "hidden"}
            variants={fromBottomBtn}
            transition={{ duration: 0.3 }}
          />
        </EventWrapper>
        <EventWrapper>
          <EventText>
            <ReserveTitle

            >
              Customized HairStyle Service
            </ReserveTitle>
            <EventTitle>Personal</EventTitle>
          </EventText>
        </EventWrapper>

        {/*  */}
        <ReserveWrapper>
          <ReserveImgBox>
            <ReserveImg src="/img/worldcup4.jpg"/>
            <ReserveImg2 src="/img/worldcup1.jpg"/>
          </ReserveImgBox>
          <EventText>
            <ReserveTitle
              ref={reserveRef}
              initial="hidden"
              animate={reserveInView ? "visible" : "hidden"}
              variants={fromBottom}
              transition={{ duration: 0.3 }}
            >
              "Customized HairStyle Service"
            </ReserveTitle>
            <EventTitle
              ref={reserveRef}
              initial="hidden"
              animate={reserveInView ? "visible" : "hidden"}
              variants={fromBottom}
              transition={{ duration: 0.3 }}
            >
              Personal
            </EventTitle>
            <IntroTitle
              ref={consultingRef}
              initial="hidden"
              animate={consutingInView ? "visible" : "hidden"}
              variants={fromBottom}
              transition={{ duration: 0.3 }}            
            >
              퍼스널 컨설팅 서비스
            </IntroTitle>
            <EventIntro
              ref={consultingRef}
              initial="hidden"
              animate={consutingInView ? "visible" : "hidden"}
              variants={fromBottom}
              transition={{ duration: 0.3 }}              
            >
              예약제 펄스널 맞춤 헤어스타일 서비스입니다.
            </EventIntro>
          </EventText>
          <EventBox
              onClick={() => navigate(`/listview`)}
              ref={reserveBtnRef}
              initial="hidden"
              animate={reserveBtnInView ? "visible" : "hidden"}
              variants={fromBottomBtn}
              transition={{ duration: 0.3 }}              
          >
            예약하러 가기
          </EventBox>
        </ReserveWrapper>
        
        {/* 월드컵 */}
          <WorldcupWrapper>
            <WorldcupImg src="" />
          </WorldcupWrapper>

      </MainWrapper>
      
        



      {/* <MainView /> */}
      {/* <MainView /> */}
    </Wrapper>
  );
}
export default Home;
