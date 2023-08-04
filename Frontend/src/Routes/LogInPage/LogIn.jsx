import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from 'recoil';
import React, { useState } from 'react';
import { customerlogIn, designerlogIn, login2 } from '../../apis/auth';
import { accessTokenState, loginResultState, loginState } from '../../recoil/auth';

const Container = styled.div`
	background: url('./img/login.jpg');
	filter: invert(5%);
	background-size: cover ;
	width: 100vw;
  height: 100vh;
	display:flex;
	justify-content: center;
	flex-direction: column;
	padding-left: 150px;
	font-family: 'Cormorant Garamond';
	/* font-family: "Apple-B";  */
`;

const Wrapper = styled.div`
	border: 0;
	border-radius: 0.8rem;
	width: 35%;
	height: 45%;
	background-color: rgb(242, 234, 211, 0.5);
	color: black;
`;
const Title = styled.h1`
	margin-top: 10px;
	margin-bottom: 18px;
	font-size: 30px;
`;
const Input = styled.input`
	width: 75%;
	height: 50px;
	border: 0;
	border-radius: 0.4rem;
	background-color: white;
	padding-left: 10px;
	font-size: 18px;
	font-family: 'Cormorant Garamond';
`;
const P = styled.p`
	margin-top: -15px;
`;
const LogInBox = styled.div`
	justify-content: center;
	display: flex;
	align-items: center;
	flex-direction: column;
	margin-top: 20px;
`;
const SubmitBox = styled.div`
	display:flex;
	justify-content: space-between;
	margin-left: 12%;
	margin-right: 12%;
	color:white;
`;
const Btn = styled.button`
	border: 0;
	border-radius: 0.4rem;
	/* font-family: 'Cormorant Garamond'; */
	font-size: 15px;
	width: 60px;
`;

const FindBox = styled.div`
	text-align: right;
	margin-right: 12%;
	color: white;
`;

const RadioContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 10px 10px;
`;

const CustomRadio = styled.input`
  width: 15px;
  height: 15px;
  margin-right: 10px;
  border-radius: 50%;
  border: 2px solid #333;
  background-color: ${(props) => (props.checked ? "#333" : "transparent")};
  cursor: pointer;
`;

const TypeLabel = styled.label`
  display: flex;
  align-items: center;
  margin-right: 20px;
  cursor: pointer;
`;
function LogIn() {

	const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
	const [userType, setUserType] = useState('');
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
	const [loginResult, setLoginResult] = useRecoilState(loginResultState);
	const navigate = useNavigate();
//   const handleLogin = async () => {
// 		console.log('Username:', username);
// 		console.log('Password:', password);
// 		try {
//       const token = await login(username, password);
// 	  console.log(token);
//       setAccessToken(token); // Recoil 상태에 토큰 업데이트
//     } catch (error) {
//       console.error(error);
//     }
//   };
const handleUserTypeChange = (event) => {
	setUserType(event.target.value);
};

  const handleLogin = async () => {
		if (userType === "customer") {
			try {
				const result = await customerlogIn(username, password);
				console.log(result);
				setLoginResult(result);
				setAccessToken(result.token.accessToken);
				navigate("/")
				return;
			} catch (error) {
				console.error(error);
			}
		}
		if (userType === "designer") {
			try {
				const result = await designerlogIn(username, password);
				console.log(result);
				setLoginResult(result);
				setAccessToken(result.token.accessToken);
				navigate("/")
				return;
			} catch (error) {
				console.error(error);
			}
		}
	};

	console.log('Username:', username);
  console.log('Password:', password);
	console.log('userType:', userType )
	return(
		<Container>
			<Wrapper>
				<LogInBox>
				<Title>Log in</Title>
				<Input 
					type="text"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					placeholder="ID" />
          <br />
          <Input 
						type="password" 
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder="Password" />
          <br />
				</LogInBox>
				<br />
				<SubmitBox>
					<P><Link to="/usertype">Sign up</Link></P>
					<P><Btn 
								type="submit" 
								onClick={handleLogin}
							>
								Log in
							</Btn></P>
				</SubmitBox> 
				<br></br>
				<RadioContainer>
					<TypeLabel>
						<CustomRadio
							type="radio"
							value="customer"
							checked={userType === "customer"}
							onChange={handleUserTypeChange}
						/>
						일반회원
					</TypeLabel>
					<TypeLabel>
						<CustomRadio
							type="radio"
							value="designer"
							checked={userType === "designer"}
							onChange={handleUserTypeChange}
						/>
						디자이너
					</TypeLabel>
				</RadioContainer>
				<FindBox><Link to="/findid">Find id</Link></FindBox>
				<FindBox><Link to="/findpw">Find Password</Link></FindBox>
			</Wrapper>
		</Container>
	);
}

export default LogIn;