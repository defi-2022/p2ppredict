import { useState, Dispatch, SetStateAction } from 'react';
import type { NextPage } from 'next';
import styled from 'styled-components';
import Select, { NonceProvider, StylesConfig } from 'react-select';
import makeAnimated from 'react-select/animated';
import { FaToggleOn } from 'react-icons/fa';
import { assetToImage } from '../utils/misc';

const StyledChoice = styled.div`
	display: flex;
	align-items: center;
	gap: 0.5rem;
	img {
		height: 20px;
		width: 20px;
	}
`;

const symbolToLabel: { [key: string]: JSX.Element } = {
	btc: (
		<StyledChoice>
			<img src={assetToImage['btc']} alt="logo" />
			<span>BTC</span>
		</StyledChoice>
	),
	eth: (
		<StyledChoice>
			<img src={assetToImage['eth']} alt="logo" />
			<span>ETH</span>
		</StyledChoice>
	),
};

const options = [
	{
		value: 'btc',
		label: (
			<StyledChoice>
				<img src={assetToImage['btc']} alt="logo" />
				<span>BTC</span>
			</StyledChoice>
		),
	},
	{
		value: 'eth',
		label: (
			<StyledChoice>
				<img src={assetToImage['eth']} alt="logo" />
				<span>ETH</span>
			</StyledChoice>
		),
	},
	{
		value: 'matic',
		label: (
			<StyledChoice>
				<img src={assetToImage['matic']} alt="logo" />
				<span>MATIC</span>
			</StyledChoice>
		),
	},
	{
		value: 'link',
		label: (
			<StyledChoice>
				<img src={assetToImage['link']} alt="logo" />
				<span>LINK</span>
			</StyledChoice>
		),
	},
	{
		value: 'sol',
		label: (
			<StyledChoice>
				<img src={assetToImage['sol']} alt="logo" />
				<span>SOL</span>
			</StyledChoice>
		),
	},
	{
		value: 'avax',
		label: (
			<StyledChoice>
				<img src={assetToImage['avax']} alt="logo" />
				<span>AVAX</span>
			</StyledChoice>
		),
	},
];

const customStyles = {
	option: (provided: any, state: any) => ({
		...provided,
		// borderBottom: '2px solid grey',
		color: state.isSelected ? 'grey' : 'white',
		backgroundColor: '#1e1e1e',
		// backgroundColor: state.isSelected ? 'grey' : 'black',
		':hover': {
			cursor: 'pointer',
			backgroundColor: state.isSelected ? '' : '#262626',
		},
	}),
	input: (provided: any) => ({
		...provided,
		color: 'white',
	}),
	control: (provided: any) => ({
		...provided,
		margin: 0,
		backgroundColor: '#1e1e1e',
		border: 0,
		outline: 'none',
		// This line disable the blue border
		boxShadow: 'none',
	}),
	singleValue: (provided: any) => ({
		...provided,
		color: 'white',
		// backgroundColor: 'green',
	}),
	menuList: (provided: any) => ({
		...provided,
		backgroundColor: '#1e1e1e',
		paddingTop: 0,
		paddingBottom: 0,
		border: '1px solid #262626',
		// height: '100px',
	}),
	indicatorSeparator: (provided: any) => ({
		...provided,
		backgroundColor: '#262626',
	}),
};

const StyledSelect = styled(Select)`
	width: 100%;
	background-color: #1e1e1e;
	outline: none;
`;

type MakerThingProps = {
	asset: string;
	setAsset: Dispatch<SetStateAction<string>>;
};

const MakerThing = ({ asset, setAsset }: MakerThingProps) => {
	const [over, setOver] = useState(true);

	const handleChange = (selectedOption: any) => {
		console.log(selectedOption);
		setAsset(selectedOption.value);
	};

	return (
		<Thing>
			<Header>
				<label>Asset:</label>
				<StyledSelect
					defaultValue={{
						label: symbolToLabel[asset],
						value: asset,
					}}
					options={options}
					styles={customStyles}
					onChange={handleChange}
				/>
			</Header>
			<SizeDiv>
				<div className="inner-size">
					<img src={assetToImage['eth']} alt={`eth-logo`} />
					<div className="input-div">
						<input placeholder="1" />
					</div>
				</div>
				<div className="inner-size">
					<p>available: 1.24</p>
					<p>Position Size</p>
				</div>
			</SizeDiv>
			<MultiDiv>
				<div className="split">
					<div className="first">
						<input type="number" placeholder="20000" />
						<p>Strike Price</p>
					</div>
					<div>
						<input type="date " placeholder="2023-01-01" />
						<p>Expiry</p>
					</div>
				</div>
				<div className="mid">
					<div>
						<p>Percent to strike</p>
						<p>23.44%</p>
					</div>
					<div>
						<p>Countdown to expiry</p>
						<p>200D</p>
					</div>
				</div>
				<div className="split">
					<div className="first">
						<input type="number" placeholder="1.50" />
						<p>Over Odds</p>
					</div>
					<div>
						<input type="number" placeholder="3.00" />
						<p>Under Odds</p>
					</div>
				</div>
			</MultiDiv>
			<ToggleDiv>
				<CustomToggle over={over} onClick={() => setOver(!over)}>
					{over && <p>OVER</p>}
					<div className="ball"></div>
					{!over && <p>UNDER</p>}
				</CustomToggle>
			</ToggleDiv>
			<LimitOrderDiv>
				<p>Invalidate order when BTC is over:</p>
				<input type="number" />
			</LimitOrderDiv>
			<SummaryDiv>
				<div>
					<p>Depositing</p>
					<p>1 ETH</p>
				</div>
				<div>
					<p>Listing UNDER for</p>
					<p>0.66 ETH</p>
				</div>
				<div>
					<p>Risk</p>
					<p>0.33 ETH</p>
				</div>
				<div>
					<p>Payout</p>
					<p>1 ETH</p>
				</div>
				<Button>CREATE MARKET</Button>
			</SummaryDiv>
		</Thing>
	);
};

const Button = styled.button`
	margin-top: 0.5rem;
	padding: 0.75rem;
	outline: none;
	border: none;
	border-radius: 0.2rem;
	color: ${({ theme }) => theme.text.secondary};
	background-color: ${({ theme }) => theme.colors.primary};
	cursor: pointer;
`;

const SummaryDiv = styled.div`
	background-color: #262626;
	display: flex;
	flex-direction: column;
	border-radius: 1rem;
	padding: 1rem;
	gap: 0.5rem;
	div {
		display: flex;
		justify-content: space-between;
		font-size: ${({ theme }) => theme.typeScale.smallParagraph};
	}
`;

const LimitOrderDiv = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.75rem;

	p {
		font-size: ${({ theme }) => theme.typeScale.smallParagraph};
		padding-left: 0.75rem;
	}

	input {
		color: ${({ theme }) => theme.text.secondary};

		font-size: ${({ theme }) => theme.typeScale.paragraph};
		background-color: #1e1e1e;
		outline: none;
		border: none;
		width: 100%;
		padding: 0.5rem 0.75rem;
		border-radius: 1rem;
	}
`;

const CustomToggle = styled.div<{ over: boolean }>`
	background-color: #dddddd;
	height: 40px;
	width: 140px;
	border-radius: 30px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	/* justify-content: ${({ over }) => (over ? 'left' : 'right')}; */
	cursor: pointer;

	p {
		font-size: ${({ theme }) => theme.typeScale.header4};
		padding: 1.5rem;
		padding-left: ${({ over }) => (over ? '' : '0')};
		padding-right: ${({ over }) => (over ? '0' : '')};
		color: black;
	}

	.ball {
		background-color: black;
		height: 33px;
		width: 33px;
		border-radius: 100%;
		margin: 0.3rem;
	}
`;

const ToggleDiv = styled.div`
	display: flex;
	justify-content: center;
`;

const MultiDiv = styled.div`
	border: 1px solid #262626;
	border-radius: 1rem;
	p {
		font-size: ${({ theme }) => theme.typeScale.smallParagraph};
	}

	.split {
		display: grid;
		grid-template-columns: 1fr 1fr;

		.first {
			border-right: 1px solid #262626;
		}
		div {
			padding: 0.8rem;
			display: flex;
			flex-direction: column;
			gap: 0.6rem;

			input {
				color: ${({ theme }) => theme.text.secondary};

				font-size: ${({ theme }) => theme.typeScale.paragraph};
				background-color: inherit;
				outline: none;
				border: none;
				width: 100%;
				/* text-align: right; */
			}
		}
	}

	.mid {
		border-top: 1px solid #262626;
		border-bottom: 1px solid #262626;
		padding: 0.8rem;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		div {
			display: flex;
			justify-content: space-between;
		}
	}
`;

const SizeDiv = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	border-radius: 1rem;
	background-color: #1e1e1e;
	padding: 1rem 1.25rem;
	gap: 1rem;

	.inner-size {
		display: flex;
		justify-content: space-between;

		img {
			height: 35px;
			width: 35px;
		}

		p {
			font-size: ${({ theme }) => theme.typeScale.smallParagraph};
		}
	}

	.input-div {
		width: 100%;
		display: flex;
		align-items: center;
		input {
			color: ${({ theme }) => theme.text.secondary};

			font-size: ${({ theme }) => theme.typeScale.header2};
			background-color: inherit;
			outline: none;
			border: none;
			width: 100%;
			text-align: right;
		}
	}
`;

const Header = styled.div`
	display: flex;
	align-items: center;
	gap: 0.75rem;
`;

const Thing = styled.div`
	background-color: #151515;

	color: ${({ theme }) => theme.text.secondary};
	padding: 1rem;
	width: 400px;
	height: 750px;

	display: flex;
	flex-direction: column;
	gap: 1rem;
	border-radius: 15px;
	border: 1px solid #262626;
`;

export default MakerThing;
