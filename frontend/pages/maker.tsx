import type { NextPage } from 'next';
import { useState } from 'react';
import styled from 'styled-components';

import PriceChartContainer from '../components/Chart/PriceChartContainer';
import Banner from '../components/Banner';
import MakerThing from './makerthing';
import { symbolToCoingeckoId } from '../utils/misc';

const Container = styled.div`
	display: grid;
	grid-template-columns: 5fr 2fr;

	@media (max-width: 1300px) {
		grid-template-columns: 4fr 2fr;
	}

	@media (max-width: 1000px) {
		grid-template-columns: 3fr 2fr;
	}

	@media (max-width: 900px) {
		grid-template-columns: 0fr 1fr;
	}
`;

const Maker: NextPage = () => {
	const [asset, setAsset] = useState('btc');
	const asset1 = { symbol: 'usd', coingeckoId: 'usd' };

	const dimensions = { height: '87%', width: '100%', chartHeight: 'calc(100% - 125px)' };

	return (
		<>
			<Container>
				<Left>
					<Banner showAll={false} bannerChoice={asset} fullWidth={false} setBannerChoice={setAsset} />
					<PriceChartContainer
						height={dimensions.height}
						width={dimensions.width}
						chartHeight={dimensions.chartHeight}
						asset0={asset}
						asset1={asset1}
					></PriceChartContainer>
				</Left>
				<Right>
					<MakerThing asset={asset} setAsset={setAsset} />
				</Right>
			</Container>
		</>
	);
};

const Left = styled.div`
	display: flex;
	flex-direction: column;
	padding: 0.5rem 1rem;
	height: calc(100vh - 58.78px);
	background-color: ${({ theme }) => theme.background.primary};

	overflow-y: scroll;
	color: ${({ theme }) => theme.text.secondary};
`;

const Right = styled.div`
	padding: 0.5rem 1rem;
	height: calc(100vh - 58.78px);
	overflow-y: scroll;

	display: flex;
	/* flex-direction: column; */
	justify-content: center;
	/* align-items: center; */

	background-color: ${({ theme }) => theme.background.primary};
`;

export default Maker;
