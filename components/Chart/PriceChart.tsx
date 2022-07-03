import styled from 'styled-components';
import { useState, memo } from 'react';
import { getTimeWindowChange } from './utils/utils';
import SwapLineChart from './SwapLineChart';
import { useFetchPrices } from '../../hooks/useFetchPrices';
import { assetToImage, timeWindowToNumber } from '../../utils/misc';

type PriceChartProps = {
	height: number;
	width: number;
	chartHeight: number;
	inputCurrency: string;
	outputCurrency: string;
	token0Address: string;
	token1Address: string;
	currentSwapPrice: any;
};

const PriceChart = ({
	height,
	width,
	chartHeight,
	inputCurrency,
	outputCurrency,
	token0Address,
	token1Address,
	currentSwapPrice,
}: PriceChartProps) => {
	const [asset0Value, setAsset0Value] = useState('bitcoin');
	const [asset1Value, setAsset1Value] = useState('usd');
	const [timeWindowValue, setTimeWindowValue] = useState('24H');

	const { prices = [], isLoading, isError } = useFetchPrices(asset0Value, asset1Value, timeWindowValue);

	const [hoverValue, setHoverValue] = useState<number | undefined>();
	const [hoverDate, setHoverDate] = useState<string | undefined>();
	const valueToDisplay = hoverValue || (prices && prices[prices.length - 1]?.value);
	const { changePercentage, changeValue } = getTimeWindowChange(prices);
	const isChangePositive = changeValue >= 0;

	const locale = 'en-US';
	const currentDate = new Date().toLocaleString(locale, {
		year: 'numeric',
		month: 'short',
		day: '2-digit',
		hour: '2-digit',
		minute: '2-digit',
	});

	const timeWindow = timeWindowToNumber[timeWindowValue];

	return (
		<StyledPriceChart>
			<StyledFlex>
				<div className="styledFlex-inner">
					<img src={assetToImage['btc']} alt="logo" />
					{asset1Value !== 'usd' && <img src={assetToImage[asset1Value]} alt="logo" />}
					<div className="chosen-assets">BTC/USD</div>
				</div>
				<div>
					<ButtonMenu2>
						<Button active={timeWindow === 0}>24H</Button>
						<Button active={timeWindow === 1}>1W</Button>
						<Button active={timeWindow === 2}>1M</Button>
						<Button active={timeWindow === 3}>1Y</Button>
					</ButtonMenu2>
				</div>
			</StyledFlex>
			<StyledFlexV2>
				<div className="inner">
					<div className="inner-inner">
						<span className="price">{valueToDisplay && valueToDisplay.toFixed(2)}</span>
						<span className="change">
							+{changeValue.toFixed(2)} ({changePercentage})
						</span>
					</div>
					<div className="date">{hoverDate || currentDate}</div>
				</div>
			</StyledFlexV2>
			<Box height={chartHeight}>
				<SwapLineChart
					data={prices}
					setHoverValue={setHoverValue}
					setHoverDate={setHoverDate}
					isChangePositive={isChangePositive}
					timeWindow={timeWindow}
				/>
			</Box>
		</StyledPriceChart>
	);
};

type BoxProps = {
	height: number;
};

const Box = styled.div<BoxProps>`
	height: ${({ height }) => height + 'px'};
	width: 100%;
	padding: 1rem;
`;

const ButtonMenu2 = styled.div`
	/* width: 100%; */
	display: flex;
	background-color: #47b5ff;
	border: 1px solid ${({ theme }) => theme.colors.primary};
`;

type ButtonProps = {
	active: boolean;
};

const Button = styled.button<ButtonProps>`
	padding: 0.5rem;
	font-weight: 600;
	font-size: 1rem;
	border: 0;
	background-color: ${({ theme, active }) => (active ? theme.colors.primary : 'inherit')};
	color: ${({ theme, active }) => (active ? 'white' : 'inherit')};

	:hover {
		cursor: pointer;
		color: ${({ theme }) => theme.colors.primaryHover};
	}
`;

const StyledPriceChart = styled.div`
	width: 100%;
	height: 100%;
	border-radius: 0.2rem;
	padding-top: 0.5rem;
	background-color: ${({ theme }) => `${theme.colors.gray[10]}`};
`;

const StyledFlex = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 0.5rem 1.5rem;

	.styledFlex-inner {
		display: flex;
		align-items: center;
		gap: 0.5rem;

		.chosen-assets {
			font-size: ${({ theme }) => theme.typeScale.header4};
			font-weight: 600;
		}

		img {
			height: 27px;
			width: 27px;
		}
	}
`;

const StyledFlexV2 = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 1.5rem;
	width: 100%;

	.inner {
		display: flex;
		flex-direction: column;
		padding-top: 0.75rem;
	}

	.date {
		font-size: 0.9rem;
		font-weight: 400;
		color: ${({ theme }) => theme.colors.primary};
	}

	.inner-inner {
		display: flex;
		align-items: end;
		gap: 0.5rem;

		.price {
			font-size: 2.5rem;
			font-weight: 600;
		}

		.change {
			font-size: 1.25rem;
			font-weight: 600;
			padding-bottom: 0.25rem;
		}
	}
`;

export default PriceChart;
